let currentStep = 0;
let mermaidCode = "";

function openPopup() {
    document.getElementById('inputPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('inputPopup').style.display = 'none';
    mermaidCode = document.getElementById('mermaidInput').value;
    currentStep = 0;
}

function nextStep() {
    currentStep++;
    if (currentStep === 1) {
        // Initialize mermaid and display the initial diagram
        mermaid.initialize({ startOnLoad: false });
        mermaid.render('mermaidDiagram', mermaidCode, (svgCode) => {
            document.getElementById('mermaidContainer').innerHTML = svgCode;
        });
        // Add your animations here for the initial display.
    } else {
        // Add further animations or steps to complete the diagram
        // This will depend on the complexity of your diagram and how you want to present it
    }
}
