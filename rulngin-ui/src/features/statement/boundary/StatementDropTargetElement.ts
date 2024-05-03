import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {html} from "lit";
import {RN_DROPPED_EVENT_TYPE} from "../entity/CustomEvent.ts";

export class StatementDropTargetElement extends BoundaryStaticElement {

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dragover', this._onDragover)
    this.addEventListener('drop', this._onDrop)
  }

  _onDragover(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
  }

  _onDrop(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
    console.group(this.constructor.name, this._onDrop.name)
    console.debug({event})
    try {
      const textData = event.dataTransfer?.getData('text')
      if (textData === undefined) {
        console.debug("text Data is undefined")
        return
      }

      const detail = {
        textData
      }

      this.dispatchEvent(new CustomEvent(RN_DROPPED_EVENT_TYPE, {detail, bubbles: true}))
    } finally {
      console.groupEnd()
    }
  }

  protected get view(): unknown {
    return html`
      <div
        class="notification is-primary is-light has-text-centered p-6 dragging-target"
        @drop=${this._onDrop}
        @dropover=${this._onDragover}
      >
        Drop a Statement Here
      </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-drop-target': StatementDropTargetElement
  }
}

customElements.define('rn-statement-drop-target', StatementDropTargetElement)
