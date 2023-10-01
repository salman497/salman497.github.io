import { marked } from 'marked';
import { baseUrl } from "marked-base-url";
import { gfmHeadingId } from "marked-gfm-heading-id";
import DOMPurify from "dompurify";
import { processSlides, convertSlides } from './slideProcessing';
import { handleNewSyntax, escapeForHTML } from './utils';
import { 
  CODE_LINE_NUMBER_REGEX, 
} from './constants';


let DIAGRAM_COUNTER = 0;

const Plugin = () => {
    let deck;
  
    return {
      id: 'markdown',
  
      init: function(reveal) {
        deck = reveal;
  
        let { renderer, animateLists, ...markedOptions } = deck.getConfig().markdown || {};
  
        if (!renderer) {
          renderer = new marked.Renderer();
  
          renderer.code = (code, language) => {
            // Your codeHandler logic
            if (language === "mermaid") {
              DIAGRAM_COUNTER += 1;
              return `<div data-mermaid-id="mermaid-${DIAGRAM_COUNTER}" data-mermaid="${btoa(code)}"></div>`;
            } else {
              let lineNumbers = "";
              if (CODE_LINE_NUMBER_REGEX.test(language)) {
                lineNumbers = language.match(CODE_LINE_NUMBER_REGEX)[1].trim();
                lineNumbers = `data-line-numbers="${lineNumbers}"`;
                language = language.replace(CODE_LINE_NUMBER_REGEX, "").trim();
              }
              code = escapeForHTML(code);
              return `<pre><code ${lineNumbers} class="${language}">${code}</code></pre>`;
            }
          };
        }
  
        if (animateLists === true) {
          renderer.listitem = text => `<li class="fragment">${text}</li>`;
        }
  
        marked.setOptions({
          renderer,
          ...markedOptions
        });
        processSlides(marked, deck.getRevealElement());
        
        const slides = convertSlides(marked, deck);
        return slides;
      },
  
      // Other functions and properties
      processSlides: processSlides,
      convertSlides: convertSlides,
      marked: marked
    };
  };
  

  

export default Plugin;
