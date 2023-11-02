import mermaid from "mermaid";

export async function animateMermaid(el, textGraphDefinition) {
  // if(el) {
  //     return;
  // }
  if (el.classList.contains('mermaid-flowchart')) {
    addFragmentsToFlowChart(el.firstElementChild);
    const d = await mermaid.mermaidAPI.getDiagramFromText(textGraphDefinition);
    //  d.parser.yy.getVertices()
     console.log('----diagram----', d.parser.yy.getVertices());
  }
}

function addFragmentsToFlowChart(graphElement) {

  
  const nodes = getAllNodes(graphElement);
  const arrows = getAllArrows(graphElement);
  const labels = getAllLabels(graphElement);
  for (let i = 0; i < 100; i++) {
    addFragmentToElement(nodes[i], i);
    addFragmentToElement(arrows[i], i);
    addFragmentToElement(labels[i], i);
  }
}


function addFragmentToElement(element, index) {
  if (element) {
    element.setAttribute('data-fragment-index', String(index));
    if (!element.classList.contains('fragment')) {
      element.classList.add('fragment');
      if(index === 0) {
        element.classList.add('visible');
      }
    }
  }
}


function getAllLabels(graphElement) {
  let edgeLabelsParent = graphElement.querySelector('.edgeLabels');

  // Initialize an array to hold the matching first child elements
  let firstChildrenWithTransform = [];

  if (edgeLabelsParent) {
    // Use ':scope > *' to select all direct children
    // Then find the first one with a 'transform' attribute
    let children = edgeLabelsParent.querySelectorAll(':scope > *[transform]');
    for (let child of children) {
      // Add all children with a transform attribute
      if (child.getAttribute('transform')) {
        firstChildrenWithTransform.push(child);
      }
    }
  }

  return firstChildrenWithTransform;
}


function getAllArrows(graphElement) {
  const arrows = graphElement.querySelectorAll('.flowchart-link');
  return arrows;
}

function getAllNodes(graphElement) {
  const arrows = graphElement.querySelectorAll('.flowchart-label');
  return arrows;
}


function addFragmentByClassName(graphElement, className) {
  const labels = graphElement.querySelectorAll(className);
  labels.forEach((element, index) => {
    element.setAttribute('data-fragment-index', String(index));
    if (!element.classList.contains('fragment')) {
      element.classList.add('fragment');
    }
  });
}
