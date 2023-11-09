/*!
 * reveal.js Mermaid plugin: code copied from reveal.js-mermaid-plugin
 */

import mermaid from "mermaid";
import { animateMermaid } from './mermaid-animate/mermaid-animate';

const Plugin = {
  id: "mermaid",

  init: async function (reveal) {
    let { ...mermaidConfig } = reveal.getConfig().mermaid || {};

    mermaid.initialize({
      // The node size will be calculated incorrectly if set `startOnLoad: start`,
      // so we need to manually render.
      startOnLoad: false,
      ...mermaidConfig,
    });

    const mermaidElements = reveal.getRevealElement().querySelectorAll(".mermaid");

    for (const mermaidElement of Array.from(mermaidElements)) {
     
      // Using textContent not innerHTML, because innerHTML will get escaped code (eg: get --&gt; instead of -->).
      var graphDefinition = mermaidElement.textContent.trim();

      try {
        const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substring(2)}`, graphDefinition);
        mermaidElement.innerHTML = svg;
        if (mermaidElement.classList.contains('mermaid-steps')) { 
          await animateMermaid(mermaidElement, graphDefinition);
        }
         
      } catch (error) {
        let errorStr = "";
        if (error?.str) {
          // From mermaid 9.1.4, error.message does not exists anymore
          errorStr = error.str;
        }
        if (error?.message) {
          errorStr = error.message;
        }
        console.error(errorStr, { error, graphDefinition, el: mermaidElement });
        mermaidElement.innerHTML = errorStr;
      }
    };
  },
};

export default () => Plugin;
