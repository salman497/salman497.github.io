export const revealJs = {
    fragmentText: {
        html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;p class="fragment"&gt;Fade in&lt;/p&gt;
&lt;p class="fragment fade-out"&gt;Fade out&lt;/p&gt;
&lt;p class="fragment highlight-red"&gt;Highlight red&lt;/p&gt;
&lt;p class="fragment fade-in-then-out"&gt;Fade in, then out&lt;/p&gt;
&lt;p class="fragment fade-up"&gt;Slide up while fading in&lt;/p&gt;</code></pre></div>`,
        markdown: ``
    },
    fragmentStackImages: {
        html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
 &lt;div class="r-stack"&gt;
  &lt;img class="fragment visible" src="https://placekitten.com/450/300" width="450" height="300"&gt;
  &lt;img class="fragment" src="https://placekitten.com/300/450" width="300" height="450"&gt;
  &lt;img class="fragment" src="https://placekitten.com/400/400" width="400" height="400"&gt;
&lt;/div&gt;</code></pre></div>`,
        markdown: ``
    },
    fragmentStackImagesIndex: {
        html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;div class="r-stack"&gt;
  &lt;img class="fragment fade-out" data-fragment-index="0" src="https://placekitten.com/450/300" width="450" height="300"&gt;
  &lt;img class="fragment current-visible" data-fragment-index="0" src="https://placekitten.com/300/450" width="300" height="450"&gt;
  &lt;img class="fragment" src="https://placekitten.com/400/400" width="400" height="400"&gt;
&lt;/div&gt;</code></pre></div>`,
        markdown: ``
    }
};

