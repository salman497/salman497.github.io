export const StartingTemplate = `## Pros and Cons of AI
  
AI, or Artificial Intelligence, has been a transformative force in many sectors, driving innovation and efficiency. Its rapid growth and wide-reaching impacts are subjects of debate and discussion. For a deeper dive into AI and its implications, check out this [link](https://hakim.se).

---

## Slide 2

Content for Slide 2 goes here. ` + 
"\n```mermaid \n" +
`graph TD
  A[Enter Chart Definition] --> B(Preview)
  B --> C{decide}
  C --> D[Keep]
  C --> E[Edit Definition]
  E --> B
  D --> F[Save Image and Code]
  F --> B` +
"\n```\n`" +
`---

## Slide 3
// ` +
// "\n```chartjs\n" +
// `{
//   "type": "line",
//   "data": {
//    "labels": ["January","February","March","April","May","June","July"],
//    "datasets":[
//     {
//      "data":[65,59,80,81,56,55,40],
//      "label":"My firsts dataset","backgroundColor":"rgba(20,220,220,.8)"
//     },
//     {
//      "data":[28,48,40,19,86,27,90],
//      "label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
//     }
//    ]
//   }
// }` +
"\n```\n";