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
`