
import { addFragmentToElement } from './utils';

export function animateMindMap(diagram, el) {
    const mindMap = diagram.parser.yy.getMindmap();
   // console.log('---------- test-----------', el, mindMap);
    fragmentedEdges = [];
    if(mindMap && mindMap.children && mindMap.children.length > 0) {
        const allNodeElements = el.querySelectorAll('.mindmap-node');
        mindMap.children.forEach((node, index) => {
            traverseMindMap(node, 0, 0, index, allNodeElements, el)
        });
    }
}

function traverseMindMap(node, depth, index, parentIndex, allNodeElements, el) {
    if (!node) {
      return;
    }
  
    const fragmentIndex = node.id-1;
    const nodeElement = allNodeElements[node.id];
    const edgeElement = findEdge(el, parentIndex, depth, index);
    addFragmentToElement(nodeElement, fragmentIndex);
    addFragmentToElement(edgeElement, fragmentIndex);
 
    
    // Recurse on children, if any
    if (node.children && node.children.length > 0) {
      node.children.forEach((child, idx) => {
        // The depth increments with each level of children, index is the position of the child
        traverseMindMap(child, depth + 1, idx, parentIndex, allNodeElements, el);
      });
    }
  }

  let fragmentedEdges= [];
  function findEdge(el, parentIndex, depth, index) {
     
     const foundEdges = el.querySelectorAll(`.section-edge-${parentIndex}.edge-depth-${depth}`);
     const edgeIndex = tryGettingNodeEdgeIndex(parentIndex, depth, index);
     if (foundEdges.length > edgeIndex) {
        return foundEdges[edgeIndex];
     }
     return undefined;
  }

  function tryGettingNodeEdgeIndex(parentIndex, depth, index) {
    const name = `edge_${parentIndex}_depth_${depth}_index${index}`;
    if(fragmentedEdges.includes(name)) {
      return tryGettingNodeEdgeIndex(parentIndex, depth, index+1)
    }
    // found index push unique name, so that next time same is not used.
    fragmentedEdges.push(name);
    // use it as it is unique never used before;
    return index;
  }