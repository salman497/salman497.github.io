import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'presenty-landing-site.';
    this.innerHTML = `
    <div class="wrapper">${title}
    </div>
      `;
  }
}
customElements.define('app-root', AppElement);
