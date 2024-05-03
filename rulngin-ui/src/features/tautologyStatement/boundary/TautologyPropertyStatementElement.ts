import {html} from "lit";
import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import {property} from "lit/decorators.js";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import tautologyStatementController from "../control/TautologyStatementControl.ts";
import {Operator} from "../../statement/entity/Statement.ts";

export class TautologyPropertyStatementElement extends AbstractStatementElement<'Tautology'> {
  protected getAvailableOperators(): Operator[] {
    return [];
  }

  constructor() {
    super();
    this.hasPropertyKey = false;
  }

  protected getPropertyValue(): 'Tautology' {
    return this.propertyValue ?? 'Tautology';
  }

  @property({type: String})
  protected propertyValue?: 'Tautology'

  protected getStatementType(): string {
    return 'TautologyStatement'
  }

  protected getPropertyValueInputField() {
    return html``;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-tautology': TautologyPropertyStatementElement
  }
}

customElements.define('rn-statement-tautology', TautologyPropertyStatementElement)

registerController('TautologyStatement', tautologyStatementController)

