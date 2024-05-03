import {html} from "lit";

import {property} from "lit/decorators.js";
import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import durationController from "../control/DurationStatementControl.ts";
import {DurationValues} from "../entity/DurationPropertyStatement.ts";
import {Operator} from "../../statement/entity/Statement.ts";


export class DurationPropertyStatementElement extends AbstractStatementElement<DurationValues> {
  protected getAvailableOperators(): Operator[] {
    return [
      {id: 'WITHIN', displayName: 'Within'},
      {id: 'OUTSIDE', displayName: 'Outside'}
    ];
  }

  protected getPropertyValue(): DurationValues {
    return this.propertyValue ?? {minValue: 100, maxValue: 250} as DurationValues;
  }

  @property({type: Object})
  protected propertyValue?: DurationValues


  constructor() {
    super();
    this.hintForUser = html`
      Property value of this statement, for example:<code class=\"is-family-code\">10</code>,<code
        class=\"is-family-code\">0.25</code>, etc.`;
  }

  protected getStatementType(): string {
    return 'DurationPropertyStatement'
  }

  protected getPropertyValueInputField() {
    const {minValue, maxValue} = this.getPropertyValue()

    return html`
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Min Value</a>
              </p>
              <p class="control is-expanded">
                <input type="number"
                       class="input"
                       min="0"
                       max="${Number.MAX_SAFE_INTEGER}"
                       name="property-value-min-${this._uiId}"
                       @change="${this._onPropertyValueChange}"
                       placeholder="200"
                       value="${minValue}"
                       ?readonly=${!this.editable}>
              </p>
              <p class="control">
                <a class="button is-static">Max Value</a>
              </p>
              <p class="control is-expanded">
                <input type="number"
                       class="input"
                       min="0"
                       max="${Number.MAX_SAFE_INTEGER}"
                       name="property-value-max-${this._uiId}"
                       @change="${this._onPropertyValueChange}"
                       placeholder="500"
                       value="${maxValue}"
                       ?readonly=${!this.editable}>
              </p>
              </p>
            </div>
            <p class="help">
              ${this.hintForUser}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  protected _onPropertyValueChange(e: Event): void {
    e.preventDefault()
    e.stopPropagation()
    if (this.editable) {
      const target = e.target as HTMLInputElement
      if (target.name === "property-value-min-" + this._uiId) {
        this.replaceMinValue(parseInt(target.value))
      } else if (target.name === "property-value-max-" + this._uiId) {
        this.replaceMaxValue(parseInt(target.value))
      }
    }
  }

  private replaceMinValue(number: number) {
    this.propertyValue = {...this.getPropertyValue(), minValue: number}
    this.dispatchStateChange()
  }

  private replaceMaxValue(number: number) {
    this.propertyValue = {...this.getPropertyValue(), maxValue: number}
    this.dispatchStateChange()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-duration': DurationPropertyStatementElement
  }
}

customElements.define('rn-statement-duration', DurationPropertyStatementElement)

registerController('DurationPropertyStatement', durationController)
