import './nav-menu.element.css';

export class NavMenuElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 text-center">
            <h4 class="mb-4">Index of Pages</h4>
            <div class="d-flex justify-content-around flex-wrap">
                <div class="dark-tile">
                    <a href="./mermaid/view.html" target="_blank">
                        <i class="fas fa-code fa-icon"></i>HTML Mermaid Viewers
                    </a>
                </div>
                <div class="dark-tile">
                    <a href="./diagrams/school/education.html" target="_blank">
                        <i class="fas fa-university fa-icon"></i>AU Education System
                    </a>
                </div>
                <div class="dark-tile">
                    <a href="./diagrams/threeJS/diagram.html" target="_blank">
                        <i class="fas fa-cube fa-icon"></i>Three JS testing 
                    </a>
                </div>
                <!-- Add more tiles as needed -->
            </div>
        </div>
    </div>
</div>
      `;
  }
}
customElements.define('nav-menu', NavMenuElement);
