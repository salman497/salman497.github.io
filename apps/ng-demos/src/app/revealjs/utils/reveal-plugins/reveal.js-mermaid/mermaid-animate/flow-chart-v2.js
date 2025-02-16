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

    // Find all nodes that are part of loops
    const loopNodes = findLoopNodes(edges);

    // Find the true starting node (ChatBot in this case)
    const startNodeId = findStartNode(edges, vertices, loopNodes);
    
    // Start with the initial node (ChatBot)
    if (startNodeId) {
        const startNodeSelector = getNodeSelector(vertices[startNodeId].domId);
        const startNodeElement = el.querySelector(startNodeSelector);
        addFragmentToFlowChart(startNodeElement, fragmentIndex);
        fragmentIndex++;
    }

    // Process edges in sequence, excluding the loop-back edge
    const processedEdges = edges.filter(edge => !isLoopBackEdge(edge, startNodeId));
    processedEdges.forEach((edge, index) => {
        // Handle subgraph when first entering it
        if (subgraphs && subgraphs.length > 0) {
            subgraphs.forEach(subgraph => {
                if (subgraph.nodes.includes(edge.end) && 
                    isFirstNodeInSubgraph(edge.end, subgraph, processedEdges)) {
                    const subgraphElement = el.querySelector(`#${subgraph.id}`);
                    if (subgraphElement) {
                        addFragmentToFlowChart(subgraphElement, fragmentIndex);
                    }
                }
            });
        }

        // Edge label
        if (edge.text) {
            const labelElement = getLabelElementByText(edgeLabels, edge.text);
            if (labelElement) {
                addFragmentToFlowChart(labelElement, fragmentIndex);
            }
        }

        // Arrow
        const arrowSelector = getArrowSelector(edge.start, edge.end);
        const arrowElement = el.querySelector(arrowSelector);
        if (arrowElement) {
            addFragmentToFlowChart(arrowElement, fragmentIndex);
        }

        // End node of this edge
        if (edge.end) {
            const endNodeSelector = getNodeSelector(vertices[edge.end].domId);
            const endNodeElement = el.querySelector(endNodeSelector);
            if (endNodeElement) {
                addFragmentToFlowChart(endNodeElement, fragmentIndex);
            }
        }

        fragmentIndex++;
    });

    // Handle the loop-back edge last
    const loopBackEdge = edges.find(edge => isLoopBackEdge(edge, startNodeId));
    if (loopBackEdge) {
        // Loop back label
        if (loopBackEdge.text) {
            const labelElement = getLabelElementByText(edgeLabels, loopBackEdge.text);
            if (labelElement) {
                addFragmentToFlowChart(labelElement, fragmentIndex);
            }
        }

        // Loop back arrow
        const arrowSelector = getArrowSelector(loopBackEdge.start, loopBackEdge.end);
        const arrowElement = el.querySelector(arrowSelector);
        if (arrowElement) {
            addFragmentToFlowChart(arrowElement, fragmentIndex);
        }
    }
}

function findStartNode(edges, vertices, loopNodes) {
    // Find nodes that have no incoming edges (excluding loop-back edges)
    const nodesWithIncomingEdges = new Set(edges.map(edge => edge.end));
    const potentialStartNodes = Object.keys(vertices).filter(nodeId => 
        !nodesWithIncomingEdges.has(nodeId) || loopNodes.has(nodeId)
    );
    
    // In your case, return the node with "ChatBot" in its name
    return potentialStartNodes.find(nodeId => 
        vertices[nodeId].text.includes('ChatBot')
    );
}

function findLoopNodes(edges) {
    const loopNodes = new Set();
    edges.forEach(edge => {
        // If there's an edge where the end node has an edge back to the start node
        const hasLoopBack = edges.some(e => 
            e.start === edge.end && e.end === edge.start
        );
        if (hasLoopBack) {
            loopNodes.add(edge.start);
            loopNodes.add(edge.end);
        }
    });
    return loopNodes;
}

function isLoopBackEdge(edge, startNodeId) {
    return edge.end === startNodeId;
}

function isFirstNodeInSubgraph(nodeId, subgraph, edges) {
    // Check if this is the first node in the subgraph that gets connected to
    const subgraphNodes = subgraph.nodes;
    const edgeIndex = edges.findIndex(edge => 
        subgraphNodes.includes(edge.end) || subgraphNodes.includes(edge.start)
    );
    const currentEdge = edges.find(edge => edge.end === nodeId);
    return edges.indexOf(currentEdge) === edgeIndex;
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

function addFragmentToFlowChart(element, fragmentIndex) {
    if (element && fragmentIndex !== undefined) {
        element.classList.add('fragment');
        element.setAttribute('data-fragment-index', fragmentIndex);
    }
}
