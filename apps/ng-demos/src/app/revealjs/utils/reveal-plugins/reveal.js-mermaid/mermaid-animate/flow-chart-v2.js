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

    // Separate normal edges and loop-back edges
    const { normalEdges, loopBackEdges } = separateEdges(edges, vertices);
    
    // Find the true starting node (ChatBot)
    const startNodeId = Object.keys(vertices).find(id => 
        vertices[id].text.includes('ChatBot')
    );

    // Start with ChatBot node
    if (startNodeId) {
        const startNodeSelector = getNodeSelector(vertices[startNodeId].domId);
        const startNodeElement = el.querySelector(startNodeSelector);
        addFragmentToFlowChart(startNodeElement, 0);
        fragmentIndex = 1;
    }

    // Handle subgraphs first if they exist
    if (subgraphs && subgraphs.length > 0) {
        subgraphs.forEach(subgraph => {
            const subgraphElement = el.querySelector(`#${subgraph.id}`);
            if (subgraphElement) {
                addFragmentToFlowChart(subgraphElement, fragmentIndex);
            }
        });
        fragmentIndex++;
    }

    // Process normal edges in sequence
    normalEdges.forEach(edge => {
        // Skip if this edge starts from ChatBot as we've already handled it
        if (edge.start === startNodeId) {
            // Handle only the edge and its label
            if (edge.text) {
                const labelElement = getLabelElementByText(edgeLabels, edge.text);
                addFragmentToFlowChart(labelElement, fragmentIndex);
            }
            const arrowSelector = getArrowSelector(edge.start, edge.end);
            const arrowElement = el.querySelector(arrowSelector);
            addFragmentToFlowChart(arrowElement, fragmentIndex);

            // Add the end node (Tokenizer in this case)
            if (edge.end) {
                const endNodeSelector = getNodeSelector(vertices[edge.end].domId);
                const endNodeElement = el.querySelector(endNodeSelector);
                addFragmentToFlowChart(endNodeElement, fragmentIndex);
            }
            fragmentIndex++;
        } else {
            // Edge label
            if (edge.text) {
                const labelElement = getLabelElementByText(edgeLabels, edge.text);
                addFragmentToFlowChart(labelElement, fragmentIndex);
            }

            // Arrow
            const arrowSelector = getArrowSelector(edge.start, edge.end);
            const arrowElement = el.querySelector(arrowSelector);
            addFragmentToFlowChart(arrowElement, fragmentIndex);

            // End node of this edge
            if (edge.end) {
                const endNodeSelector = getNodeSelector(vertices[edge.end].domId);
                const endNodeElement = el.querySelector(endNodeSelector);
                addFragmentToFlowChart(endNodeElement, fragmentIndex);
            }
            fragmentIndex++;
        }
    });

    // Handle loop-back edges last
    loopBackEdges.forEach(edge => {
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

