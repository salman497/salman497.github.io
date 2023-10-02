import {
  DEFAULT_SLIDE_SEPARATOR,
  DEFAULT_NOTES_SEPARATOR,
  DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR,
  DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR,
  SCRIPT_END_PLACEHOLDER,
} from "./constants";
import DOMPurify from "dompurify";


export function processSlides(marked, scope) {
  scope.querySelectorAll(
    "section[data-markdown]:not([data-markdown-parsed]), section[data-markdown-raw-content]:not([data-markdown-parsed])"
  ).forEach(function (section, _i) {
    const rawContent = section.getAttribute("data-markdown-raw-content");
    if (rawContent) {
      const res = slidify(marked, rawContent, {
        separator: section.getAttribute("data-separator"),
        verticalSeparator: section.getAttribute("data-separator-vertical"),
        notesSeparator: section.getAttribute("data-separator-notes"),
        attributes: getForwardedAttributes(section),
      });
      section.outerHTML = res;
    }
  });
}

export function convertSlides(marked, deck) {
  const sections = deck.getRevealElement().querySelectorAll(
    "[data-markdown]:not([data-markdown-parsed])"
  );

  let sectionNumber = 0;
  [].slice.call(sections).forEach((section) => {
    section.setAttribute("data-markdown-parsed", true);

    const notes = section.querySelector("aside.notes");
    const markdown = getMarkdownFromSlide(section);


    section.innerHTML = DOMPurify.sanitize(marked(markdown));
    const firstChild = section.firstElementChild;
    if (firstChild && firstChild.id !== "") {
      section.id = firstChild.id;
      firstChild.id = "";
    } else {
      section.id = `${sectionNumber}`;
    }

    addAttributes(
      section,
      section,
      null,
      section.getAttribute("data-element-attributes") || section.parentNode.getAttribute("data-element-attributes") || DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR,
      section.getAttribute("data-attributes") || section.parentNode.getAttribute("data-attributes") || DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR
    );

    if (notes) {
      section.appendChild(notes);
    }
    sectionNumber += 1;
  });
}


function getForwardedAttributes(section) {
  const attributes = section.attributes;
  const result = [];

  for (let i = 0, len = attributes.length; i < len; i++) {
    const name = attributes[i].name,
      value = attributes[i].value;

    if (/data\-(markdown|separator|vertical|notes)/gi.test(name)) continue;

    if (value) {
      result.push(name + '="' + value + '"');
    } else {
      result.push(name);
    }
  }

  return result.join(" ");
}

function slidify(marked, markdown, options) {
  // console.log("slidify");
  options = getSlidifyOptions(options);

  const separatorRegex = new RegExp(
      options.separator +
      (options.verticalSeparator ? "|" + options.verticalSeparator : ""),
      "mg",
    ),
    horizontalSeparatorRegex = new RegExp(options.separator),
    verticalSeparatorRegex = new RegExp(
      options.verticalSeparator ? "|" + options.verticalSeparator : "",
    );

  let matches,
    lastIndex = 0,
    isHorizontal,
    wasHorizontal = true,
    content;
  const sectionStack = [];

  while ((matches = separatorRegex.exec(markdown)) !== null) {
    isHorizontal = horizontalSeparatorRegex.test(matches[0]);

    if (!isHorizontal && wasHorizontal) {
      sectionStack.push([]);
    }

    content = markdown.substring(lastIndex, matches.index);

    if (content.trim().length > 0) {
      if (isHorizontal && wasHorizontal) {
        sectionStack.push(content);
      } else {
        sectionStack[sectionStack.length - 1].push(content);
      }
    }

    if (
      (horizontalSeparatorRegex.test(matches[0]) ||
        verticalSeparatorRegex.test(matches[0])) &&
      matches[0].match(/^#{1,3} /) !== null
    ) {
      lastIndex = separatorRegex.lastIndex - matches[0].length;
    } else {
      lastIndex = separatorRegex.lastIndex;
    }
    wasHorizontal = isHorizontal;
  }

  (wasHorizontal ? sectionStack : sectionStack[sectionStack.length - 1]).push(
    markdown.substring(lastIndex),
  );

  const sections = [];

  for (let i = 0, len = sectionStack.length; i < len; i++) {
    if (sectionStack[i] instanceof Array) {
      const sectionContent = [];
      sectionStack[i].forEach(function (child) {
        sectionContent.push(
          "<section data-markdown>" +
          createMarkdownSlide(marked, child, options) +
          "</section>"
        );
      });
      sections.push(
        "<section " + options.attributes + ">" +
        sectionContent.join("") +
        "</section>"
      );
    } else {
      sections.push(
        "<section " + options.attributes + " data-markdown>" +
        createMarkdownSlide(marked, sectionStack[i], options) +
        "</section>"
      );
    }
  }

  return sections.join("");
}

function createMarkdownSlide(marked, content, options) {
  // console.log("createMarkdownSlide");
  options = getSlidifyOptions(options);

  const notesMatch = content.split(new RegExp(options.notesSeparator, "mgi"));

  if (notesMatch.length === 2) {
    content = notesMatch[0] + '<aside class="notes">' +
      SANITIZE(marked(notesMatch[1].trim())) + "</aside>";
  }

  content = content.replace(/<\/script>/g, "SCRIPT_END_PLACEHOLDER");

  return '<script type="text/template">' + content + "</script>";
}

function getSlidifyOptions(options) {
  // console.log("getSlidifyOptions");
  options = options || {};
  options.separator = options.separator || DEFAULT_SLIDE_SEPARATOR;
  options.notesSeparator = options.notesSeparator || DEFAULT_NOTES_SEPARATOR;
  options.attributes = options.attributes || "";

  return options;
}
const SANITIZE = (string) =>
  DOMPurify.sanitize(
    string, {
      ADD_TAGS: [
        "#comment", // comments are vital for configuring revealjs
        "foreignObject", // unfortunately some mermaid diagrams use it, despite being a potential security risk: https://github.com/cure53/DOMPurify/issues/469
      ],
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: (tagName) => [
          "fa-i",
          "flex-box",
          "v-box",
          "h-box",
          "grid-box",
          "columns-2",
          "columns-3",
          "columns-4",
          "columns-5",
          "columns-6",
        ].includes(tagName),
        attributeNameCheck: (name) => ["class", "styles", "style"].includes(name),
      },
    },
  );

function getMarkdownFromSlide(section) {
  // console.log("getMarkdownFromSlide");
  // look for a <script> or <textarea data-template> wrapper
  const template = section.querySelector("[data-template]") ||
    section.querySelector("script");

  // strip leading whitespace so it isn't evaluated as code
  let text = (template || section).textContent;

  // restore script end tags
  text = text.replace(new RegExp(SCRIPT_END_PLACEHOLDER, "g"), "</script>");

  const leadingWs = text.match(/^\n?(\s*)/)[1].length,
    leadingTabs = text.match(/^\n?(\t*)/)[1].length;

  if (leadingTabs > 0) {
    text = text.replace(
      new RegExp("\\n?\\t{" + leadingTabs + "}", "g"),
      "\n",
    );
  } else if (leadingWs > 1) {
    text = text.replace(new RegExp("\\n? {" + leadingWs + "}", "g"), "\n");
  }

  return text;
}

  /**
   * Add attributes to the parent element of a text node,
   * or the element of an attribute node.
   */
  function addAttributes(
    section,
    element,
    previousElement,
    separatorElementAttributes,
    separatorSectionAttributes,
  ) {
    // console.log("addAttributes");
    if (
      element != null && element.childNodes != undefined &&
      element.childNodes.length > 0
    ) {
      let previousParentElement = element;
      for (let i = 0; i < element.childNodes.length; i++) {
        const childElement = element.childNodes[i];
        if (i > 0) {
          let j = i - 1;
          while (j >= 0) {
            const aPreviousChildElement = element.childNodes[j];
            if (
              typeof aPreviousChildElement.setAttribute == "function" &&
              aPreviousChildElement.tagName != "BR"
            ) {
              previousParentElement = aPreviousChildElement;
              break;
            }
            j = j - 1;
          }
        }
        let parentSection = section;
        if (childElement.nodeName == "section") {
          parentSection = childElement;
          previousParentElement = childElement;
        }
        if (
          typeof childElement.setAttribute == "function" ||
          childElement.nodeType == Node.COMMENT_NODE
        ) {
          addAttributes(
            parentSection,
            childElement,
            previousParentElement,
            separatorElementAttributes,
            separatorSectionAttributes,
          );
        }
      }
    }

    if (element.nodeType == Node.COMMENT_NODE) {
      if (
        addAttributeInElement(
          element,
          previousElement,
          separatorElementAttributes,
        ) == false
      ) {
        addAttributeInElement(element, section, separatorSectionAttributes);
      }
    }
  }



