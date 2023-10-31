export function animateMermaid(el) {
    if(!el) {
        return;
    }
    if (el.classList.contains('mermaid-flowchart')) {
        addFragmentsToFlowChart(el.firstElementChild);
    }
}

function addFragmentsToFlowChart(graphElement) {
    addFragmentByClassName(graphElement, '.flowchart-label');
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

  