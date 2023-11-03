import { addFragmentToElement } from './utils';

export function animateSequence(diagram, el) {
    
    const allActivationMessages = getActivationMessages(diagram.parser.yy.getMessages());
    const allArrowTextElements = el.querySelectorAll('.messageText');
    const allArrowElements = el.querySelectorAll('[class^="messageLine"]');
    const allActivationElements = el.querySelectorAll('[class^="activation"]');
   
    addFragmentToLabelAndActivationElements(allArrowTextElements, allActivationMessages, allActivationElements);
    // hide arrows
    addFragmentToArrows(allArrowElements);
}

function addFragmentToLabelAndActivationElements(allArrowTextElements, allActivationMessages, allActivationElements) {
    let activationIndex = 0;
    // hide text
    allArrowTextElements.forEach((element, index) => {
        addFragmentToElement(element, index);
        if(labelContainActivation(element.textContent, allActivationMessages)){
            const activationElement = allActivationElements[activationIndex];
            if(activationElement) {
                addFragmentToElement(activationElement, index);
                activationIndex += 1;
            }
        }
    });
}

function addFragmentToArrows(allArrowElements) {
    allArrowElements.forEach((element, index) => {
        addFragmentToElement(element, index);
    });
}

function labelContainActivation(text, allActivationMessages) {
    if(!allActivationMessages || 
        allActivationMessages.length === 0) {
        return false;
    }

    const activateMessage = allActivationMessages.find(item => item.message === text);
    if(activateMessage) {
        // found 
       return true;
    }
    return false; 
}

function getActivationMessages(messages) {
    if(!messages){
        return [];
    }
   return messages.filter(item => item.activate); 
}