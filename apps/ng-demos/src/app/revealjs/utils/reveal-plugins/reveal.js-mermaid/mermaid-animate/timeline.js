import { addFragmentToElement } from './utils';

export function animateTimeline(diagram, el) {
    const parser = diagram.parser.yy;
    const tasks = parser.getTasks();
    let fragmentIndex = 0;

    // Animate the main timeline line
    const mainTimelineLine = el.querySelector('.lineWrapper line[marker-end="url(#arrowhead)"][stroke-width="4"]');
    if (mainTimelineLine) {
        addFragmentToElement(mainTimelineLine, fragmentIndex++);
    }

    // Get all task wrappers, event wrappers and connecting lines
    const taskWrappers = el.querySelectorAll('.taskWrapper');
    const eventWrappers = el.querySelectorAll('.eventWrapper');
    const connectingLines = el.querySelectorAll('.lineWrapper line[stroke-dasharray="5,5"]');

    // Animate each column (task, line, and event) sequentially
    for (let i = 0; i < taskWrappers.length; i++) {
        // Animate task (year box)
        const taskNode = taskWrappers[i].querySelector('.timeline-node');
        if (taskNode) {
            addFragmentToElement(taskNode, fragmentIndex);
        }

        // Animate connecting line
        if (connectingLines[i]) {
            addFragmentToElement(connectingLines[i], fragmentIndex);
        }

        // Animate event
        const eventNode = eventWrappers[i]?.querySelector('.timeline-node');
        if (eventNode) {
            addFragmentToElement(eventNode, fragmentIndex);
        }

        fragmentIndex++;
    }
}