import mermaid from "mermaid";
import { animateFlowChartV2 } from './flow-chart-v2';

export async function animateMermaid(el, textGraphDefinition) {
  if(!el || !textGraphDefinition) {
    return;
  }
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(textGraphDefinition);
  if(diagram.type === 'flowchart-v2')  {
    animateFlowChartV2(diagram, el);
  }
}

