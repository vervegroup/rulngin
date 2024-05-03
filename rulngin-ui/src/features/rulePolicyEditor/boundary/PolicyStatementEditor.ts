import {property} from "lit/decorators.js";
import {html} from "lit";
import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {REMOVED_STATEMENT_EVENT_TYPE, UPDATED_STATEMENT_EVENT_TYPE} from "../../statement/entity/CustomEvent.ts";
import removeRulePolicyStatementById from "../control/PolicyRuleCleaner.ts";
import {createUIDataStatement, createUIElement, updateUIDataStatement} from "../../statement/control/StatementFactory.ts";
import {PropertyStatement} from "../../statement/entity/Statement.ts";
import {createPolicyStatementChangedEvent} from "../control/CustomEventFactory.ts";


export class PolicyStatementEditor extends BoundaryStaticElement {

  @property({type: Object})
  propertyStatement?: PropertyStatement;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(REMOVED_STATEMENT_EVENT_TYPE, this._onRemoveChild)
    this.addEventListener(UPDATED_STATEMENT_EVENT_TYPE, this._onStatementChange)
  }

  private _onRemoveChild(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    const customEvent = event as CustomEvent
    this.propertyStatement = removeRulePolicyStatementById(this.propertyStatement, customEvent.detail.uiId)
  }

  _onTopStatementAdded(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
    if (this.propertyStatement !== undefined) {
      return;
    }

    if (!(event instanceof CustomEvent)) {
      return;
    }

    const customEvent = event as CustomEvent
    const statementType = customEvent.detail.textData ?? undefined
    if (statementType === undefined) {
      return
    }

    const uiDataStatement = createUIDataStatement(statementType, "Unknown", {})
    if (uiDataStatement === undefined) {
      return;
    }

    this.propertyStatement = uiDataStatement

    this.requestUpdate()
  }

  protected get view(): unknown {
    if (this.propertyStatement === undefined) {
      return html`
        <rn-statement-drop-target
          @rn-dropped=${this._onTopStatementAdded}
        ></rn-statement-drop-target>`
    }

    const viewForStatement = this.getViewForStatement(this.propertyStatement);
    return html`${viewForStatement}`;
  }

  private getViewForStatement(rootElement: PropertyStatement): unknown {
    return createUIElement(rootElement, {})
  }

  private _onStatementChange(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.propertyStatement === undefined) {
      return;
    }
    const customEvent = event as CustomEvent
    this.propertyStatement = updateUIDataStatement(this.propertyStatement, customEvent.detail)
  }

  protected afterUpdate(changedProperties: Map<string, unknown>) {
    super.afterUpdate(changedProperties);
    this.dispatchStateChange()
  }

  protected dispatchStateChange() {
    this.dispatchEvent(createPolicyStatementChangedEvent(this.propertyStatement))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-statement-editor': PolicyStatementEditor
  }
}

customElements.define('rn-policy-statement-editor', PolicyStatementEditor)