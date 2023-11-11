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
  mindmap: {
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
      root)mindmap(
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
  },
  classDiagram: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    </code></pre></div>`,
    markdown: ``
  },
  stateDiagram: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
    </code></pre></div>`,
    markdown: ``
  },
  entityRelationshipDiagram: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
erDiagram
    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"
    </code></pre></div>`,
    markdown: ``
  },
  userJourney: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 3: Me
    </code></pre></div>`,
    markdown: ``
  },
  gantt: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
    </code></pre></div>`,
    markdown: ``
  },
  pieChart: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
  pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
    </code></pre></div>`,
    markdown: ``
  },
  quadrantChart: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
  quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
    </code></pre></div>`,
    markdown: ``
  },
  gitgraphGitDiagram: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit</code></pre></div>`,
    markdown: ``
  },
  timeline: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : Youtube
    2006 : Twitter
    </code></pre></div>`,
    markdown: ``
  },
  sankey: {
    html: `<div data-language="mermaid" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid">
sankey-beta
    Bio-conversion,Losses,26.862
    Bio-conversion,Solid,280.322
    Bio-conversion,Gas,81.144
    </code></pre></div>`,
    markdown: ``
  },
  flowchartSteps: {
    markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid-steps</span></span></div><div class="toastui-editor-md-code-block-line-background"><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">flowchart TD</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    A[Christmas] --&gt;|Get money| B(Go shopping)</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    B --&gt; C{Let me think}</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|One| D[Laptop]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|Two| E[iPhone]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">    C --&gt;|Three| F[fa:fa-car Car]</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span></span></div>`,
    html: `<div data-language="mermaid-steps" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid-steps">
flowchart LR
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
</code></pre></div>`,
  },
  sequenceDiagramSteps: {
    markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid-steps</span></span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">sequenceDiagram</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">Alice-&gt;&gt;+John: Hello John, how are you?</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">Alice-&gt;&gt;+John: John, can you hear me?</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">John--&gt;&gt;-Alice: Hi Alice, I can hear you!</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block">John--&gt;&gt;-Alice: I feel great!</span></div><div class="toastui-editor-md-code-block-line-background"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span></span></div>`,
    html: `<div data-language="mermaid-steps" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid-steps">
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
</code></pre></div>`,
  },
  mindmapSteps: {
    markdown: `<div><br class="ProseMirror-trailingBreak"></div><div class="toastui-editor-md-code-block-line-background start"><span class="toastui-editor-md-code-block"><span class="toastui-editor-md-delimiter">\`\`\`</span><span class="toastui-editor-md-meta">mermaid-steps</span></span></div>
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
    html: `<div data-language="mermaid-steps" class="toastui-editor-ww-code-block"><pre><code data-language="mermaid-steps">
mindmap
    root)mindmap(
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
},
};
