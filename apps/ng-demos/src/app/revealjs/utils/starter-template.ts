export const StartingTemplate = `
<!-- .slide: data-auto-animate -->

# Markdown

***

<!-- .slide: data-auto-animate -->

# Markdown

# Magic

***

<!-- .slide: data-auto-animate -->

# Markdown

# Magic

#### Easy way to create powerful Presentations! 🪄

***

<!-- .slide: data-auto-animate -->

# Markdown

# Magic

#### Easy way to create powerful Presentations! 🪄

###### Powered by RevealJs, Mermaid, ChartJS, TUI Editor and many more.

***

<!-- .slide: data-auto-animate -->

### Mind Map

###### Create mind map in easy mermaid syntax.

***

<!-- .slide: data-auto-animate -->

<!-- .slide: data-autoslide="400" -->

### Mind Map

###### *Below example show how to create animated mind map!*

\`\`\`mermaid-steps

mindmap
    root)Feature Highlight(
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

<!-- .slide: data-auto-animate -->

### Flow Chart

###### *Create animated flowcharts using simple syntax of mermaid!*

***

<!-- .slide: data-auto-animate -->

<!-- .slide: data-autoslide="400" -->

### Flow Chart

###### *Below example show how to create animated flow chart diagram!*

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

<!-- .slide: data-auto-animate -->

### Sequence Diagram

###### *Create animated sequence diagram using simple syntax of mermaid!*

***

<!-- .slide: data-auto-animate -->

<!-- .slide: data-autoslide="400" -->

### Sequence Diagram

###### *Below example show how to create animated sequence diagram!*

\`\`\`mermaid-steps

sequenceDiagram
    Me->>+Markdown Magic: create presentation
    Me-->>Markdown Magic: Add Samples
    Me-->>Markdown Magic: Update Content
    Markdown Magic->>-Me: Presentation Url
    Me-->>Audience: Present
    Audience-->>Me: Awesome Presentation!
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

## Want more diagrams ?

***

<!-- .slide: data-auto-animate -->

## Want more diagrams ?

##### In Editor, Use ➕Plus icon to explore Menu with plenty of options.

***

### Background Color

<!-- .slide: data-background-color="rgb(70, 70, 255)" -->

***

### Background Image

<!-- .slide: data-background-image="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3" -->

***

<!-- .slide: data-background-video="https://www.w3schools.com/html/mov_bbb.mp4" -->

### Background Video

***

Stacked Images

\`\`\`html

 <div class="r-stack">
  <img class="fragment visible" src="https://placekitten.com/450/300" width="450" height="300">
  <img class="fragment" src="https://placekitten.com/300/450" width="300" height="450">
  <img class="fragment" src="https://placekitten.com/400/400" width="400" height="400">
</div>
\`\`\`

***

<!-- .slide: data-transition="zoom" -->

## Custom Slide Transition

##### This slide will show Zoom transition overriding Global transition, several other options available

***

<!-- .slide: data-auto-animate -->

## Still want more ?

***

<!-- .slide: data-auto-animate -->

## Still want more ?

##### In Editor, Use ➕Plus icon to explore Menu with plenty of options.

***

<!-- .slide: data-transition="zoom" -->

## Thank you!

`;
