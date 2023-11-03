import mermaid from "mermaid";

export async function animateMermaid(el, textGraphDefinition) {
  // if(el) {
  //     return;
  // }
  if (el.classList.contains('mermaid-flowchart')) {
  //  addFragmentsToFlowChart(el.firstElementChild);
    const d = await mermaid.mermaidAPI.getDiagramFromText(textGraphDefinition);
    //  d.parser.yy.getVertices()
     const vertices = d.parser.yy.getVertices();
     const edges = d.parser.yy.getEdges();
     console.log('----getVertices----', vertices);
     console.log('----getEdges----',edges);
     createFragments(el, edges, vertices);
     
  }
}

function createFragments(el, edges, vertices) {
    const edgeLabels = el.querySelectorAll('span.edgeLabel');
    let fragmentIndex = 0;
    edges.forEach(item => {
        if(item.start) {
             // Start Node
            const startNodeSelector = getNodeSelector(vertices[item.start].domId);
            const startNodeElement = el.querySelector(startNodeSelector);
            addFragmentToElement(startNodeElement, fragmentIndex);
            fragmentIndex +=1;
        }
        if(item.end) {
           // Label
            const labelElement = getLabelElementByText(edgeLabels, item.text);
           addFragmentToElement(labelElement, fragmentIndex);
           // Arrow
           const arrowSelector = getArrowSelector(item.start, item.end);
           const arrowElement = el.querySelector(arrowSelector);
           addFragmentToElement(arrowElement, fragmentIndex);
           // End Node
           const endNodeSelector = getNodeSelector(vertices[item.end].domId);
           const endNodeElement = el.querySelector(endNodeSelector);
           addFragmentToElement(endNodeElement, fragmentIndex);
           fragmentIndex +=1;
        }
    });
}

function getLabelElementByText(edgeLabels, text) {
    if(!text) {
        return undefined;
    }
    return Array.from(edgeLabels).find(el => el.textContent.trim() === text);
}


function getNodeSelector(domId) {
    const parts = domId.split('-');
    parts.pop(); // Removes the last element from the array
    return `[id^="${parts.join('-')}"]`;
}

function getArrowSelector(start, end) {
    return `[id^="L-${start}-${end}"]`;
}

function addFragmentToElement(element, index) {
  if (element && !element.hasAttribute('data-fragment-index')) {
    element.setAttribute('data-fragment-index', String(index));
    if (!element.classList.contains('fragment')) {
      element.classList.add('fragment');
      if(index === 0) {
        element.classList.add('visible');
      }
    }
  }
}

