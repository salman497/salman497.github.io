import { addFragmentToElement } from './utils';

export function animateFlowChartV2(diagram, el) {
    const vertices = diagram.parser.yy.getVertices();
    const edges = diagram.parser.yy.getEdges();
    console.log('----getVertices----', vertices);
    console.log('----getEdges----',edges);
    animateAllWithFragments(el, edges, vertices);
}

function animateAllWithFragments(el, edges, vertices) {
    const edgeLabels = el.querySelectorAll('span.edgeLabel');
    let fragmentIndex = 0;
    edges.forEach(item => {
        if(item.start) {
             // Start Node
            const startNodeSelector = getNodeSelector(vertices[item.start].domId);
            const startNodeElement = el.querySelector(startNodeSelector);
            if(fragmentIndex === 0) {}
            addFragmentToFlowChart(startNodeElement, fragmentIndex);
            fragmentIndex +=1;
        }
        if(item.end) {
           // Label
            const labelElement = getLabelElementByText(edgeLabels, item.text);
            addFragmentToFlowChart(labelElement, fragmentIndex);
           // Arrow
           const arrowSelector = getArrowSelector(item.start, item.end);
           const arrowElement = el.querySelector(arrowSelector);
           addFragmentToFlowChart(arrowElement, fragmentIndex);
           // End Node
           const endNodeSelector = getNodeSelector(vertices[item.end].domId);
           const endNodeElement = el.querySelector(endNodeSelector);
           addFragmentToFlowChart(endNodeElement, fragmentIndex);
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


function addFragmentToFlowChart(labelElement, fragmentIndex) {
    // 0 = start of diagram
    if(fragmentIndex !== 0) {
        addFragmentToElement(labelElement, fragmentIndex, false);
    }
   
}



