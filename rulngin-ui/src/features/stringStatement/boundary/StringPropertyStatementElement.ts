import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import {property} from "lit/decorators.js";
import {html} from "lit";
import stringStatementController from "../control/StringStatementControl.ts";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import logEventStringStatementController from "../control/LogEventStringStatementControl.ts";
import {Operator} from "../../statement/entity/Statement.ts";


export class StringPropertyStatementElement extends AbstractStatementElement<string> {
  protected getAvailableOperators(): Operator[] {
    return [
      {id: 'EQUALS', displayName: 'Equals'},
      {id: 'EQUALS_IGNORE_CASE', displayName: 'Equals Ignore Case'},
      {id: 'START_WITH', displayName: 'Start With'},
      {id: 'START_WITH_IGNORE_CASE', displayName: 'Start With Ignore Case'},
      {id: 'END_WITH', displayName: 'End With'},
      {id: 'END_WITH_IGNORE_CASE', displayName: 'End With Ignore Case'},
      {id: 'CONTAINS', displayName: 'Contains'},
      {id: 'CONTAINS_IGNORE_CASE', displayName: 'Contains Ignore Case'},
    ];
  }

  protected getPropertyValue(): string {
    return this.propertyValue ?? "";
  }

  @property({type: String})
  protected propertyValue?: string


  constructor() {
    super();
    this.hintForUser = html`
      Property value of this statement, for example:<code class=\"is-family-code\">10</code>,<code
        class=\"is-family-code\">0.25</code>, etc.`;
  }

  protected getStatementType(): string {
    return this.statementType
  }

  protected getPropertyValueInputField() {
    return html`
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Property Value</a>
              </p>
              <p class="control is-expanded">
                <input type="text"
                       class="input"
                       name="property-value-${this._uiId}"
                       @change="${this._onPropertyValueChange}"
                       placeholder="string text value"
                       value="${this.getPropertyValue()}"
                       ?readonly=${!this.editable}>
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
    if (this.editable) {
      const target = e.target as HTMLInputElement
      if (target.name === "property-value-" + this._uiId) {
        this.propertyValue = target.value
        this.dispatchStateChange()
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-string': StringPropertyStatementElement
  }
}

customElements.define('rn-statement-string', StringPropertyStatementElement)

registerController('StringPropertyStatement', stringStatementController)
registerController('LogEventStringPropertyStatement', logEventStringStatementController)

