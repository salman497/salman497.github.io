import mermaid from "mermaid";
import { animateFlowChartV2 } from './flow-chart-v2';
import { animateSequence } from './sequence';
import { animateMindMap } from './mindmap';

export async function animateMermaid(el, textGraphDefinition) {
  if(!el || !textGraphDefinition) {
    return;
  }
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(textGraphDefinition);
  console.log('----diagram.type---', diagram.type);
  if(diagram.type === 'flowchart-v2')  {
    animateFlowChartV2(diagram, el);
  }
  if(diagram.type === 'sequence')  {
    animateSequence(diagram, el);
  }

  if(diagram.type === 'mindmap') {
    animateMindMap(diagram, el);
  }
}

