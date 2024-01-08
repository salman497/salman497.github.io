import { LitElement, html, css, CSSResult, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('fa-i')
export class FontAwesomeIcon extends LitElement {
  @property({ type: String }) class = 'fa-solid fa-face-smile';

  override render(): TemplateResult {
    return html`<i class="${this.class}">!</i>`;
  }
}

@customElement('flex-box')
export class FlexBox extends LitElement {
  @property({ type: String }) styles = '';

  static override styles: CSSResult = css`
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  `;

  override render(): TemplateResult {
    return html`<div class="flex" style="${this.styles}"><slot></slot></div>`;
  }
}

@customElement('v-box')
export class VerticalFlexBox extends FlexBox {
  override render(): TemplateResult {
    return html`<flex-box styles="flex-direction: column; ${this.styles}"><slot></slot></flex-box>`;
  }
}

@customElement('h-box')
export class HorizontalFlexBox extends FlexBox {
  override render(): TemplateResult {
    return html`<flex-box styles="flex-direction: row;"><slot></slot></flex-box>`;
  }
}

@customElement('grid-box')
export class GridBox extends LitElement {
  @property({ type: String }) styles = '';

  static override styles: CSSResult = css`
    .grid {
      display: grid;
      align-items: center;
      gap: 10px;
    }
  `;

  override render(): TemplateResult {
    return html`<div class="grid" style="${this.styles}"><slot></slot></div>`;
  }
}

@customElement('columns-2')
export class Columns2 extends GridBox {
  override render(): TemplateResult {
    return html`<grid-box styles="grid-template-columns: repeat(2, 1fr); ${this.styles}"><slot></slot></grid-box>`;
  }
}

@customElement('columns-3')
export class Columns3 extends GridBox {
  override render(): TemplateResult {
    return html`<grid-box styles="grid-template-columns: repeat(3, 1fr); ${this.styles}"><slot></slot></grid-box>`;
  }
}

@customElement('columns-4')
export class Columns4 extends GridBox {
  override render(): TemplateResult {
    return html`<grid-box styles="grid-template-columns: repeat(4, 1fr); ${this.styles}"><slot></slot></grid-box>`;
  }
}

@customElement('columns-5')
export class Columns5 extends GridBox {
  override render(): TemplateResult {
    return html`<grid-box styles="grid-template-columns: repeat(5, 1fr); ${this.styles}"><slot></slot></grid-box>`;
  }
}

@customElement('columns-6')
export class Columns6 extends GridBox {
  override render(): TemplateResult {
    return html`<grid-box styles="grid-template-columns: repeat(6, 1fr); ${this.styles}"><slot></slot></grid-box>`;
  }
}
