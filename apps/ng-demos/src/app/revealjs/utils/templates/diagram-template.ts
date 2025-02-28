export const StartingDiagramTemplate = `
<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

***

<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

### Diagram Presenty

***

<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

### Diagram Presenty

#### Transform your diagrams into stunning presentations!

***

<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

### Diagram Presenty

#### Transform your diagrams into stunning presentations!

###### 🚀 Powered by RevealJs, Mermaid, ChartJS, TUI Editor, and AI.

***

<!-- .slide: data-auto-animate -->

## Lets explore some diagrams!

***

<!-- .slide: data-state="stopAutoSlide" -->

<!-- .slide: data-auto-animate -->

## Lets explore some diagrams!

##### Tap Next (>) or use the Forward arrow key to continue.

***

##### Flow Chart

\`\`\`mermaid

flowchart LR
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`

***

### Flow Chart - Animated

\`\`\`mermaid-steps

flowchart LR
A(Presentation)
B{How to make ?}
C[ Editor]
D[[fa:fa-plus Add samples]]
E[[Update]]
F(fa:fa-chalkboard-teacher My Presentation)
G1(fa:fa-thumbs-up)
G2(fa:fa-heart)
G3(fa:fa-trophy)
A --> B
B -.Open.-> C
C -..-> D
D -..-> E
E -..-> D
E -.Present it.-> F
G1 -.nice job.-> F
G2 -.loved it.-> F
G3 -.winner.-> F
\`\`\`

***

### Sequence Diagram

\`\`\`mermaid

sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

***

### Sequence Diagram - Animated

\`\`\`mermaid-steps

sequenceDiagram
    participant U as Me
    participant GPT as Diagram Presenty GPT
    participant Auth as Google Login
    participant Presenty as Diagram Presenty Website 
    

    U->>+GPT: Chat to create/edit diagram
    GPT-->>-Presenty: Edit/view diagram
    U->>Presenty: Manually Create/Edit diagram 
    U->>Presenty: Save diagram publicly
    U->>+Auth: Log in with Google to Save Diagram privately
    Auth-->>-Presenty: Save & Reload your diagrams
    U->>Presenty: Present diagram
\`\`\`

***

### Mind Map

\`\`\`mermaid

mindmap
  root((mindmap))
    Origins
      Long history
      Popularisation
    Research
      On effectivness<br/>and features
      On Automatic creation
    Tools
      Pen and paper
      Mermaid
\`\`\`

***

### Mind Map - Ainmated

\`\`\`mermaid-steps

mindmap
    root)Our Feature Highlight(
        Slide
            Horizontal
            Veritical
        Diagrams                
                Flowchart
                Sequence
                Mind Map
                Bar
                Line
        Animations
            Steps
            Auto Animate
        Backgrounds
            Image
            Video
            Iframe
        Transitions
            Zoom
            Slide
        Others
            Theme
            Draw
            Add
              100+ Samples
            Many More...
\`\`\`

***

### Git Branching

\`\`\`mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
\`\`\`

***

### Timeline Diagram

\`\`\`mermaid

timeline
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : Youtube
    2006 : Twitter
    
\`\`\`

***

### Sankey Diagram

\`\`\`mermaid

sankey-beta
    Bio-conversion,Losses,26.862
    Bio-conversion,Solid,280.322
    Bio-conversion,Gas,81.144
    
\`\`\`

***

### State Diagram

\`\`\`mermaid

stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
    
\`\`\`

***

### Quandrant Diagram

\`\`\`mermaid

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
    
\`\`\`

***

### Class Diagram

\`\`\`mermaid

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
    
\`\`\`

***

### Bubble Chart

\`\`\`chartjs
{
    "type": "bar",
    "data": {
        "labels": ["Features", "Flexibility", "Design", "AI Integration"],
        "datasets": [{
        "label": "User Satisfaction %",
        "data": [75, 85, 90, 92],
        "backgroundColor": ["#FF6F61", "#6BFED5", "#6B8EFE", "#FFD06B"]
        }]}
}
\`\`\`

***

### Line Chart

\`\`\`chartjs
{
            "type": "line",
            "data": {
                "labels": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
                "datasets": [{
                    "label": "Dataset",
                    "data": [10, -20, 50, -40, 60, 30],
                    "borderColor": "#FF0000",
                    "backgroundColor": "rgba(255, 0, 0, 0.5)",
                    "pointStyle": "circle",
                    "pointRadius": 10,
                    "pointHoverRadius": 15
                }]
            }
        }
\`\`\`

***

<!-- .slide: data-auto-animate -->

## Draw on top of your Diagram

***

<!-- .slide: data-auto-animate -->

## Draw on top of your Diagram

![image](/img/draw.jpg)

***

<!-- .slide: data-auto-animate -->

## Many more options

***

<!-- .slide: data-auto-animate -->

## Many more options

##### Change themes Or Simply click ➕ icon in the editor to insert various samples..

![image](/img/add-sample.jpg)

***

<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

### Diagram Presenty

***

<!-- .slide: data-auto-animate -->

<img src="https://presenty.evonix.tech/img/presenty_128x128.png">

### Diagram Presenty

##### *It's time to captivate your audience!*
`;
