export const StartingTemplate = `
## Hi
Lets explore RevealJs capability.
Note:
This will only display in the notes window.
---
## Mermaid

\`\`\`mermaid
graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B
\`\`\`

---
## Demo 1
Slide 3

---
<!-- .slide: data-background="#000000" -->
## Slide attributes

---
## Element attributes
- Item 1 <!-- .element: class="fragment" data-fragment-index="2" -->
- Item 2 <!-- .element: class="fragment" data-fragment-index="1" -->

---
## Code 
\`\`\`php [1|3-5]
public function foo()
{
    $foo = array(
        'bar' => 'bar'
    )
}
\`\`\`

---
## Image 
![Sample image](https://s3.amazonaws.com/static.slid.es/logo/v2/slides-symbol-512x512.png)

---
## The Lorenz Equations
					[begin{aligned}
					dot{x} = sigma(y-x) 
					dot{y}  = rho x - y - xz 
					dot{z}  = -beta z + xy
					end{aligned}]

---
## Charts: ChartJS

via [chart.js](https://www.chartjs.org/)

---
### Polar Area Chart

<grid-box styles="grid-template: 'left code' / 50% 50%;">

\`\`\`chartjs
{
  "type": "polarArea",
  "data": {
    "labels": [
      "Red",
      "Green",
      "Yellow",
      "Grey",
      "Blue"
    ],
    "datasets": [
      {
        "label": "My First Dataset",
        "data": [
          11,
          16,
          7,
          3,
          14
        ],
        "backgroundColor": [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)"
        ]
      }
    ]
  }
}
\`\`\`

<!-- .element: style="grid-area: left; height: 300px;" -->

\`\`\`\`json
\`\`\`chartjs
{
  "type": "polarArea",
  "data": {
    "labels": [
      "Red",
      ...
    ],
    "datasets": [
      {
        "label": "My First Dataset",
        "data": [
          11,
          ...
        ],
        "backgroundColor": [
          "rgb(255, 99, 132)",
          ...
        ]
      }
    ]
  }
}
\`\`\`
\`\`\`\`

<!-- .element: style="grid-area: code;" -->

</grid-box>

`;

// <section data-auto-animate>
//         <div data-id="box" style="height: 50px; background: salmon;"></div>
//       </section>
//       <section data-auto-animate>
//         <div data-id="box" style="height: 200px; background: blue;"></div>
//       </section>

// /---
// \`\`\`html
// // <section data-auto-animate>
// //         <div data-id="box" style="height: 50px; background: salmon;"></div>
// //       </section>
// //       <section data-auto-animate>
// //         <div data-id="box" style="height: 200px; background: blue;"></div>
// //       </section>
// \`\`\`


