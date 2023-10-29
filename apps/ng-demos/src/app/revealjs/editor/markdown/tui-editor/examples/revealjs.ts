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
    },
    autoAnimateText: {
        html: `<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
 <div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
 &lt;section data-auto-animate&gt;
  &lt;h1&gt;Implicit&lt;/h1&gt;
  &lt;/section&gt;
</code></pre></div>
<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section data-auto-animate&gt;
  &lt;h1&gt;Implicit&lt;/h1&gt;
  &lt;h1&gt;Animation&lt;/h1&gt;
&lt;/section&gt;
</code></pre></div>`,
        markdown: ``
    },
    autoAnimateCode: {
        html: `<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
 <div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
 &lt;section data-auto-animate&gt;
 &lt;pre data-id="code-animation"&gt;&lt;code data-trim data-line-numbers&gt;
   let planets = [
     { name: 'mars', diameter: 6779 },
   ]
 &lt;/code&gt;&lt;/pre&gt;
&lt;/section&gt;    
</code></pre></div>
<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section data-auto-animate&gt;
  &lt;pre data-id="code-animation"&gt;&lt;code data-trim data-line-numbers&gt;
    let planets = [
      { name: 'mars', diameter: 6779 },
      { name: 'earth', diameter: 12742 },
      { name: 'jupiter', diameter: 139820 }
    ]
  &lt;/code&gt;&lt;/pre&gt;
&lt;/section&gt;
</code></pre></div>`,
        markdown: ``
    },
    autoAnimateHeight: {
        html: `<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
 <div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section data-auto-animate&gt;
  &lt;div data-id="box" style="height: 50px; background: salmon;"&gt;&lt;/div&gt;
&lt;/section&gt;
</code></pre></div>
<p><br class="ProseMirror-trailingBreak"></p><div contenteditable="false"><hr></div>
<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section data-auto-animate&gt;
  &lt;div data-id="box" style="height: 200px; background: blue;"&gt;&lt;/div&gt;
&lt;/section&gt;
</code></pre></div>`,
        markdown: ``
    },
    math: {
        html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section&gt;
  &lt;h2&gt;The Lorenz Equations&lt;/h2&gt;
  \\[\\begin{aligned}
  \\dot{x} &amp;amp; = \\sigma(y-x) \\\\
  \\dot{y} &amp;amp; = \\rho x - y - xz \\\\
  \\dot{z} &amp;amp; = -\\beta z + xy
  \\end{aligned} \\]
&lt;/section&gt;
</code></pre></div>`,
        markdown: ``
    }
};

