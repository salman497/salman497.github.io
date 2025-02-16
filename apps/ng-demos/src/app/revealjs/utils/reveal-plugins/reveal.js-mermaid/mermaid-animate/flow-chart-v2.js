export function animateFlowChartV2(diagram, el) {
    const vertices = diagram.parser.yy.getVertices();
    const edges = diagram.parser.yy.getEdges();
    const subgraphs = diagram.parser.yy.getSubGraphs();
    console.log('----getVertices----', vertices);
    console.log('----getEdges----', edges);
    console.log('----getSubGraphs----', subgraphs);
    animateAllWithFragments(el, edges, vertices, subgraphs);
}

function animateAllWithFragments(el, edges, vertices, subgraphs) {
    const edgeLabels = el.querySelectorAll('span.edgeLabel');
    let fragmentIndex = 0;

    // Separate edges into categories
    const { mainPathEdges, feedbackEdges } = categorizeEdges(edges, vertices);
    
    // Find the starting node
    const startNodeId = Object.keys(vertices || {}).length > 0 
        ? Object.keys(vertices)[0] 
        : null;

    // Start with first node
    if (startNodeId) {
        const startNodeSelector = getNodeSelector(vertices[startNodeId].domId);
        const startNodeElement = el.querySelector(startNodeSelector);
        addFragmentToFlowChart(startNodeElement, fragmentIndex);
        fragmentIndex++;
    }

    // Handle subgraphs
    if (subgraphs && subgraphs.length > 0) {
        subgraphs.forEach(subgraph => {
            const subgraphElement = el.querySelector(`#${subgraph.id}`);
            if (subgraphElement) {
                addFragmentToFlowChart(subgraphElement, fragmentIndex);
            }
        });
        fragmentIndex++;
    }

    // Process main path edges
    mainPathEdges.forEach(edge => {
        // Edge label
        if (edge.text) {
            const labelElement = getLabelElementByText(edgeLabels, edge.text);
            addFragmentToFlowChart(labelElement, fragmentIndex);
        }
        // Arrow
        const arrowSelector = getArrowSelector(edge.start, edge.end);
        const arrowElement = el.querySelector(arrowSelector);
        addFragmentToFlowChart(arrowElement, fragmentIndex);
        // End node
        if (edge.end) {
            const endNodeSelector = getNodeSelector(vertices[edge.end].domId);
            const endNodeElement = el.querySelector(endNodeSelector);
            addFragmentToFlowChart(endNodeElement, fragmentIndex);
        }
        fragmentIndex++;
    });

    // Process feedback edges last
    feedbackEdges.forEach(edge => {
        // First show the source node if it hasn't been shown yet
        const sourceNodeSelector = getNodeSelector(vertices[edge.start].domId);
        const sourceNodeElement = el.querySelector(sourceNodeSelector);
        if (!sourceNodeElement.classList.contains('fragment')) {
            addFragmentToFlowChart(sourceNodeElement, fragmentIndex);
        }

        // Then show the edge label and arrow
        if (edge.text) {
            const labelElement = getLabelElementByText(edgeLabels, edge.text);
            addFragmentToFlowChart(labelElement, fragmentIndex);
        }
        const arrowSelector = getArrowSelector(edge.start, edge.end);
        const arrowElement = el.querySelector(arrowSelector);
        addFragmentToFlowChart(arrowElement, fragmentIndex);
        fragmentIndex++;
    });
}

function categorizeEdges(edges, vertices) {
    const mainPathEdges = [];
    const feedbackEdges = [];
    
    // Create a map of nodes that are part of feedback paths
    const feedbackNodes = new Set();
    edges.forEach(edge => {
        if (edge.start.startsWith('G')) {
            feedbackNodes.add(edge.start);
            feedbackEdges.push(edge);
        } else {
            mainPathEdges.push(edge);
        }
    });

    return { mainPathEdges, feedbackEdges };
}
function addFragmentToFlowChart(element, fragmentIndex) {
    if (element && fragmentIndex !== undefined && !element.hasAttribute('data-fragment-index')) {
        element.classList.add('fragment');
        element.setAttribute('data-fragment-index', fragmentIndex);
        element.style.opacity = ''; // Remove the opacity we set in hideAllElements
    }
}


function separateEdges(edges, vertices) {
    const normalEdges = [];
    const loopBackEdges = [];
    
    edges.forEach(edge => {
        if (vertices[edge.end]?.text.includes('ChatBot')) {
            loopBackEdges.push(edge);
        } else {
            normalEdges.push(edge);
        }
    });
    
    return { normalEdges, loopBackEdges };
}



function getLabelElementByText(edgeLabels, text) {
    if(!text) {
        return undefined;
    }
    return Array.from(edgeLabels).find(el => el.textContent.trim() === text);
}

function getNodeSelector(domId) {
    const parts = domId.split('-');
    parts.pop();
    return `[id^="${parts.join('-')}"]`;
}

function getArrowSelector(start, end) {
    return `[id^="L-${start}-${end}"]`;
}

