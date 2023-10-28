export const mermaid = {
  flowchart: {
    markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid</span></span></div><div class="toastui-editor-md-code-block-line-background"><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">flowchart TD</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    A[Christmas] --&gt;|Get money| B(Go shopping)</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    B --&gt; C{Let me think}</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|One| D[Laptop]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|Two| E[iPhone]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|Three| F[fa:fa-car Car]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span></span></div>`,
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
</code></pre></div>`,
  },

  sequenceDiagram: {
    markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid</span></span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">sequenceDiagram</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">Alice-&gt;&gt;+John: Hello John, how are you?</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">Alice-&gt;&gt;+John: John, can you hear me?</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">John--&gt;&gt;-Alice: Hi Alice, I can hear you!</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">John--&gt;&gt;-Alice: I feel great!</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span></span></div>`,
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
</code></pre></div>`,
  },
  mindmaps: {
      markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid</span></span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">mindmap</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;root((mindmap))</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;Origins</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Long history</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::icon(fa fa-book)</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popularisation</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;British popular psychology author Tony Buzan</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;Research</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On effectivness and features</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On Automatic creation</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;Tools</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pen and paper</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mermaid</span></div>
      <div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">\`\`\`</span></span></div>
      `,
      html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
mindmap
      root((mindmap))
        Origins
          Long history
          ::icon(fa fa-book)
          Popularisation
            British popular psychology author Tony Buzan
        Research
          On effectivness and features
          On Automatic creation
        Tools
          Pen and paper
          Mermaid
</code></pre></div>`
  }
};
