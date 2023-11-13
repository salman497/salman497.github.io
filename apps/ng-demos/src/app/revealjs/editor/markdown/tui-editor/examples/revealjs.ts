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
        html: `<div data-html-comment="true">&lt;!-- .slide: data-auto-animate --&gt;</div><h1>Markdown</h1><div contenteditable="false"><hr></div><div data-html-comment="true">&lt;!-- .slide: data-auto-animate --&gt;</div><h1>Markdown</h1><h1>Magic</h1><div contenteditable="false"><hr></div><div data-html-comment="true">&lt;!-- .slide: data-auto-animate --&gt;</div><h1>Markdown</h1><h1>Magic</h1><h4>Easy way to create powerful Presentations! 🪄</h4>`,
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
    },
    codeBlock: {
      html: `<div contenteditable="true" translate="no" class="ProseMirror toastui-editor-contents"><div data-language="code" class="toastui-editor-ww-code-block"><pre><code data-language="code">(def lazy-fib
        (concat
         [0 1]
         ((fn rfib [a b]
              (lazy-cons (+ a b) (rfib b (+ a b)))) 0 1)))</code></pre></div></div>`,
      markdown: ``
  },
  iframes: {
    html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
    &lt;iframe width="800px" height="500px" data-src="https://mermaid.js.org/intro/" &gt;&lt;/iframe&gt;
    </code></pre></div>`,
    markdown: ``
}, 
media: {
  html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;video height="500px" controls data-autoplay src="https://www.w3schools.com/html/mov_bbb.mp4" &gt;&lt;/video&gt;
</code></pre></div>`,
markdown: ``
},
colorBackground: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-background-color="rgb(70, 70, 255)" --&gt;</div>`,
  markdown: ``
},
imageBackground: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-background-image="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3" --&gt;</div>`,
  markdown: ``
},
videoBackground: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-background-video="https://www.w3schools.com/html/mov_bbb.mp4" --&gt;</div>`,
  markdown: ``
},
iframeBackgrounds: {
  html: `<div data-language="html" class="toastui-editor-ww-code-block"><pre><code data-language="html">
&lt;section data-background-iframe="https://mermaid.js.org/intro/"
            data-background-interactive&gt;
    &lt;h2&gt;Iframe Background&lt;/h2&gt;
&lt;/section&gt;
</code></pre></div>`,
  markdown: ``
},
transitionZoom: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-transition="zoom" --&gt;</div>
  <h4>This slide will show Zoom transition overriding Global transitions</h4>`,
  markdown: ``
},
transitionNone: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-transition="none" --&gt;</div>
  <h4>This slide will show no transition overriding Global transitions</h4>`,
  markdown: ``
},
transitionSlide: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-transition="slide" --&gt;</div>
  <h4>This slide will show slide transition overriding Global transitions</h4>`,
  markdown: ``
},
transitionFade: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-transition="fade" --&gt;</div>
  <h4>This slide will show Fade transition overriding Global transitions</h4>`,
  markdown: ``
},
autoSlideSpeed: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-autoslide="1000" --&gt;</div>`,
  markdown: ``
},
customEventOpenMenu: {
  html: `<div data-html-comment="true">&lt;!-- .slide: data-state="openMenu" --&gt;</div>`,
  markdown: ``
},

};

