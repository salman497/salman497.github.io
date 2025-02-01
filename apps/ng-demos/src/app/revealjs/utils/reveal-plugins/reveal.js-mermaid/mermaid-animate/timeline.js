import { addFragmentToElement } from './utils';

export function animateTimeline(diagram, el) {
    const parser = diagram.parser.yy;
    const tasks = parser.getTasks();
    let fragmentIndex = 0;

    // Animate the main timeline line first
    const mainTimelineLine = el.querySelector('.lineWrapper line[marker-end="url(#arrowhead)"][stroke-width="4"]');
    if (mainTimelineLine) {
        addFragmentToElement(mainTimelineLine, fragmentIndex++);
    }

    // Create a map to group events by their x-coordinate (year column)
    const eventsByColumn = new Map();
    el.querySelectorAll('.eventWrapper').forEach(eventWrapper => {
        const transform = eventWrapper.getAttribute('transform');
        const match = transform.match(/translate\((\d+)/);
        if (match) {
            const xCoord = match[1];
            if (!eventsByColumn.has(xCoord)) {
                eventsByColumn.set(xCoord, []);
            }
            eventsByColumn.get(xCoord).push(eventWrapper);
        }
    });

    // Get all task wrappers and connecting lines
    const taskWrappers = el.querySelectorAll('.taskWrapper');
    const connectingLines = el.querySelectorAll('.lineWrapper line[stroke-dasharray="5,5"]');

    // Animate each year and its associated events individually
    for (let i = 0; i < taskWrappers.length; i++) {
        // First, animate the year box
        const taskNode = taskWrappers[i].querySelector('.timeline-node');
        if (taskNode) {
            addFragmentToElement(taskNode, fragmentIndex++);
        }

        // Then, animate the connecting line
        if (connectingLines[i]) {
            addFragmentToElement(connectingLines[i], fragmentIndex++); 
        }

        // Get the x-coordinate for this column
        const transform = taskWrappers[i].getAttribute('transform');
        const match = transform.match(/translate\((\d+)/);
        if (match) {
            const xCoord = match[1];
            // Get all events in this column
            const events = eventsByColumn.get(xCoord) || [];
            
            // Animate each event in this column with its own fragment index
            events.forEach(eventWrapper => {
                const eventNode = eventWrapper.querySelector('.timeline-node');
                if (eventNode) {
                    addFragmentToElement(eventNode, fragmentIndex++);
                }
            });
        }
    }
}