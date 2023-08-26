import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

let currentStep = 0;
let mermaidCode = "";


document.addEventListener('DOMContentLoaded', (event) => {
    window.openPopup = function() {
        openPopup();
    };

    window.closePopup = function() {
        closePopup();
    };

    // If you also want to define the nextStep function:
    window.nextStep = function() {
        nextStep();
    };
});


function openPopup() {
    document.getElementById('inputPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('inputPopup').style.display = 'none';
    mermaidCode = document.getElementById('mermaidInput').value;
    currentStep = 0;
    document.getElementById('mermaidContainer').innerHTML = ""; // Clear previous diagram
}

function nextStep() {
    currentStep++;

    if (currentStep === 1) {
        // Initialize mermaid and display the initial diagram
        mermaid.initialize({ startOnLoad: true });
        mermaid.render('mermaidDiagram', `graph TD\nHello --> World`).then(({ svgCode }) => {
            document.getElementById('mermaidContainer').innerHTML = svgCode;
        });
        // Add your animations here for the initial display
        let svgElements = document.querySelectorAll('#mermaidContainer svg *');
        svgElements.forEach((el, index) => {
            el.style.transition = "opacity 0.5s";
            el.style.opacity = 0;
        });
    } else {
        // Gradually reveal the diagram elements
        let svgElements = document.querySelectorAll('#mermaidContainer svg *');
        if (currentStep - 2 < svgElements.length) {
            svgElements[currentStep - 2].style.opacity = 1;
        }
    }
}
