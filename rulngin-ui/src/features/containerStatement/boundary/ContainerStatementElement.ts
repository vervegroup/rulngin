import {html} from "lit";
import {Operator, PropertyStatement} from "../../statement/entity/Statement.ts";
import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import {property} from "lit/decorators.js";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import containerStatementController from "../control/ContainerStatementController.ts";
import {createUIDataStatement, createUIElement, updateUIDataStatement} from "../../statement/control/StatementFactory.ts";
import {REMOVED_STATEMENT_EVENT_TYPE, UPDATED_STATEMENT_EVENT_TYPE} from "../../statement/entity/CustomEvent.ts";


export class ContainerStatementElement extends AbstractStatementElement<PropertyStatement[]> {
  protected getAvailableOperators(): Operator[] {
    return [
      {id: 'ALL_OF', displayName: 'All Of'},
      {id: 'ANY_OF', displayName: 'Any Of'},
      {id: 'NONE_OF', displayName: 'None Of'}
    ];
  }

  @property({type: Array})
  protected propertyValue?: PropertyStatement[]

  protected getPropertyValue(): PropertyStatement[] {
    return this.propertyValue ?? [];
  }

  protected getStatementType(): string {
    return 'ContainerStatement'
  }

  constructor() {
    super();
    this.hasPropertyKey = false
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(REMOVED_STATEMENT_EVENT_TYPE, this._onRemoveChild)
    this.addEventListener(UPDATED_STATEMENT_EVENT_TYPE, this._onStatementChange)
  }

  private _onRemoveChild(event: Event) {
    console.group(this._onRemoveChild.name)
    console.log({event: event})
    try {
      const customEvent = event as CustomEvent
      if (customEvent.detail.uiId === this.uiId) {
        return;
      }

      event.preventDefault()
      event.stopPropagation()
      this.propertyValue = this.propertyValue?.filter(uis => uis.uiId !== customEvent.detail.uiId)
      this.dispatchStateChange()
    } finally {
      console.groupEnd()
    }
  }

  private _onStatementAdded(event: Event): void {
    event.preventDefault()
    event.stopPropagation()
    console.group(this._onStatementAdded.name)
    console.log(event)
    try {
      if (!(event instanceof CustomEvent)) {
        console.debug(`event is not of type 'CustomEvent', got ${event.constructor.name}`)
        return;
      }

      const customEvent = event as CustomEvent
      const statementType = customEvent.detail?.textData ?? undefined
      if (statementType === undefined) {
        console.debug(`statementType is ${statementType}`)
        return
      }

      const uiDataStatement = createUIDataStatement(statementType, "Unknown", {})
      if (uiDataStatement === undefined) {
        console.debug(`can not created uiDataStatement for statementType: ${statementType}`)
        return;
      }

      const uiStatements = [...this.getPropertyValue(), uiDataStatement]
      console.debug(`new uiStatements: ${uiStatements.length}`, uiStatements)
      this.propertyValue = uiStatements;
      this.dispatchStateChange()
    } finally {
      console.groupEnd()
    }
  }

  private _onStatementChange(event: Event) {
    console.group(this.constructor.name, this._onStatementChange.name)
    try {
      const customEvent = event as CustomEvent
      const {detail} = customEvent
      if (detail.uiId === this.uiId) {
        console.debug(`propagate event of self change`, {detail})
        return
      }
      event.preventDefault()
      event.stopPropagation()

      console.log({detail})
      this.propertyValue = this.getPropertyValue().map((uis) => {
        if (uis.uiId === detail.uiId) {
          return updateUIDataStatement(uis, detail)
        } else {
          return uis
        }
      }) as PropertyStatement[]

      this.dispatchStateChange()

    } finally {
      console.groupEnd()
    }
  }

  protected getPropertyValueInputField() {
    const viewForStatement = (this.getPropertyValue().length > 0) ? this.getViewForChildrenStatements() : undefined;
    console.debug({viewForStatement})
    return html`
      ${viewForStatement}
      <rn-statement-drop-target
        @rn-dropped=${this._onStatementAdded}
      ></rn-statement-drop-target>
    `;
  }

  private getViewForChildrenStatements(): unknown {
    return this.getPropertyValue().filter(x => x !== undefined && x !== null).map((uiDataStatement) => this.getViewForStatement(uiDataStatement))
  }

  private getViewForStatement(propertyStatement: PropertyStatement): unknown {
    return createUIElement(propertyStatement, {editable: this.editable})
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-container': ContainerStatementElement
  }
}

customElements.define('rn-statement-container', ContainerStatementElement)

registerController('ContainerStatement', containerStatementController)

