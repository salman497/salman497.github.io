import { 
    CODE_LINE_NUMBER_REGEX, 
  } from './constants';
  import { escapeForHTML } from './utils';
  import DOMPurify from "dompurify";

  let DIAGRAM_COUNTER = 0;
  export const codeHandler = (code, language) => {
    // console.log("codeHandler", code, language);
    if (language === "mermaid") {
      // INFO: height and width are set to work around bug https://github.com/chartjs/Chart.js/issues/5805
      DIAGRAM_COUNTER += 1;
      return `<div data-mermaid-id="mermaid-${DIAGRAM_COUNTER}" data-mermaid="${
        btoa(code)
      }"></div>`;
    } else if (language === "chartjs") {
      // INFO: maybe set height and width are to work around bug https://github.com/chartjs/Chart.js/issues/5805
      return `<div><div style="display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;"><canvas data-chartjs=${
        btoa(code)
      }></canvas></div></div>`;
    } else if (
      language === "apexchart"
    ) {
      // INFO: height and width are set to work around bug https://github.com/chartjs/Chart.js/issues/5805
      return `<div data-apexchart=${btoa(code)}></div>`;
    } else {
      return DOMPurify.sanitize(defaultCodeHandler(code, language));
    }
  };

  const defaultCodeHandler = (code, language) => {
    // console.log("defaultCodeHandler");
    // Off by default
    let lineNumbers = "";

    // Users can opt in to show line numbers and highlight
    // specific lines.
    // ```javascript []        show line numbers
    // ```javascript [1,4-8]   highlights lines 1 and 4-8
    if (CODE_LINE_NUMBER_REGEX.test(language)) {
      lineNumbers = language.match(CODE_LINE_NUMBER_REGEX)[1].trim();
      lineNumbers = `data-line-numbers="${lineNumbers}"`;
      language = language.replace(CODE_LINE_NUMBER_REGEX, "").trim();
    }

    // Escape before this gets injected into the DOM to
    // avoid having the HTML parser alter our code before
    // highlight.js is able to read it
    code = escapeForHTML(code);

    return `<pre><code ${lineNumbers} class="${language}">${code}</code></pre>`;
  };