import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {html} from "lit";
import {property} from "lit/decorators.js";
import {types} from "sass";
import String = types.String;


class StatementSelectorElement extends BoundaryStaticElement {

  @property({type: String, attribute: 'statement-type'})
  _statementType: string

  constructor() {
    super();
    this._statementType = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.draggable = true
    this.addEventListener('dragstart', this._onDragStart)
    this.addEventListener('dragend', this._onDragEnd)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dragstart', this._onDragStart)
    this.removeEventListener('dragend', this._onDragEnd)
  }

  protected get view(): unknown {
    return html`
      <div class="block draggable">
        ${this.statementTypeDisplayName}
      </div>
    `;
  }

  _onDragStart(event: DragEvent): void {
    this.querySelector('div.draggable')?.classList.add('dragging')
    event.dataTransfer?.clearData()
    event.dataTransfer?.setData('text/plain', this._statementType)
  }

  _onDragEnd(_event: DragEvent): void {
    this.querySelector('.draggable')?.classList.remove('dragging')
  }

  protected get statementTypeDisplayName() {
    return this._statementType.split(/(?=[A-Z])/).join(' ')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-selector': StatementSelectorElement
  }
}

customElements.define('rn-statement-selector', StatementSelectorElement)