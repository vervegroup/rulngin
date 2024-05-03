import {html} from "lit";
import {property} from "lit/decorators.js";
import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import decimalNumberStatementController from "../control/DecimalNumberStatementController.ts";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import integerNumberStatementController from "../control/IntegerNumberStatementController.ts";
import probabilisticNumberStatementController from "../control/ProbabilisticNumberStatementController.ts";
import statusCodeNumberStatementController from "../control/StatusCodeNumberStatementController.ts";
import {Operator} from "../../statement/entity/Statement.ts";

export class NumberPropertyStatementElement extends AbstractStatementElement<number> {
  protected getAvailableOperators(): Operator[] {
    return this.operatorsAvailable ?? [
      {id: 'SMALLER_THAN', displayName: 'Smaller Than'},
      {id: 'SMALLER_EQUAL_THAN', displayName: 'Smaller or Equal Than'},
      {id: 'EQUALS', displayName: 'Equals'},
      {id: 'LARGER_EQUAL_THAN', displayName: 'Larger or Equal Than'},
      {id: 'LARGER_THAN', displayName: 'Larger Than'},
      {id: 'NOT_EQUALS', displayName: 'Not Equals'}
    ]
  }

  protected getPropertyValue(): number {
    return this.propertyValue ?? 0.0;
  }

  @property({type: Number})
  protected propertyValue?: number

  @property({type: Boolean})
  protected isInteger: Boolean

  @property({type: Array})
  protected valueRange: number[]

  @property({type: Array})
  public operatorsAvailable: Operator[]


  constructor() {
    super();
    this.isInteger = false;
    this.valueRange = [];
    this.operatorsAvailable = []
    this.hintForUser = html`
      Property value of this statement, for example:<code class=\"is-family-code\">10</code>,<code
        class=\"is-family-code\">0.25</code>, etc.`;
  }

  protected getStatementType(): string {
    return this.statementType
  }

  protected getPropertyValueInputField() {
    let valueRange;
    if (this.valueRange && this.valueRange.length > 1) {
      valueRange = this.valueRange
    } else {
      valueRange = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
    }
    return html`
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Property Value</a>
              </p>
              <p class="control is-expanded">
                <input type="number"
                       class="input"
                       min="${valueRange[0]}"
                       max="${valueRange[1]}"
                       name="property-value-${this._uiId}"
                       @change="${this._onPropertyValueChange}"
                       placeholder="${(valueRange[1] - valueRange[0]) / 2}"
                       value="${this.getPropertyValue()}"
                       ?readonly=${!this.editable}>
              </p>
            </div>
            <p class="help">
              ${this.hintForUser}
              Value Range: <code class="is-family-code">${valueRange[0]}</code> to <code class="is-family-code">${valueRange[1]}</code>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  protected _onPropertyValueChange(e: Event): void {
    e.preventDefault()
    if (this.editable) {
      const target = e.target as HTMLInputElement
      if (target.name === "property-value-" + this._uiId) {
        this.propertyValue = this.isInteger ? parseInt(target.value) : parseFloat(target.value)
        this.dispatchStateChange()
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-number': NumberPropertyStatementElement
  }
}

customElements.define('rn-statement-number', NumberPropertyStatementElement)

registerController('DecimalPropertyStatement', decimalNumberStatementController)
registerController('ProbabilisticPropertyStatement', probabilisticNumberStatementController)
registerController('IntegerPropertyStatement', integerNumberStatementController)
registerController('StatusCodePropertyStatement', statusCodeNumberStatementController)

