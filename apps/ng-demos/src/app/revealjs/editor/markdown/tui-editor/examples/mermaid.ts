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
    markdown: ``,
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
</code></pre></div>`,
  },
  mindmaps: {
      markdown: `<div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid</span></span></div><div class="toastui-editor-md-code-block-line-background"><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">mindmap</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">      root((mindmap))</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">        Origins</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          Long history</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          ::icon(fa fa-book)</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          Popularisation</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">            British popular psychology author Tony Buzan</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">        Research</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          On effectivness and features</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          On Automatic creation</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">        Tools</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          Pen and paper</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">          Mermaid</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span></span></div>`,
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
