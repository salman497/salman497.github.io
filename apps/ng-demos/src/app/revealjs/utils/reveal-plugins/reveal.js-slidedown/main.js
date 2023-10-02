/*****************************************************************
 ** Original Author: Jan Christoph Ebersbach, jceb@e-jc.de
 **
 ** A plugin for reveal.js allowing to integrate mermaid.js https://github.com/slidesdown/slidesdown 
 ** Updated for my needs
 **
 ******************************************************************/

import { marked } from 'marked';
import { processSlides, convertSlides } from './slideProcessing';
import { codeHandler } from './codeHandler';
import { gfmHeadingId } from "marked-gfm-heading-id";

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
            return codeHandler(code, language);
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
        marked.use(gfmHeadingId());
      //  marked.use(markedConfig);
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
