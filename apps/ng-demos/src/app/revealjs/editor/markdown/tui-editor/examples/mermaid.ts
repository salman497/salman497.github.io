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
};
