import {html} from "lit";
import {AbstractStatementElement} from "../../statement/boundary/AbstractStatementElement.ts";
import {property} from "lit/decorators.js";
import {registerController} from "../../statement/control/StatementControllerRegistry.ts";
import booleanController from "../control/BooleanStatementControl.ts";
import { Operator } from "../../statement/entity/Statement.ts";

export class BooleanPropertyStatementElement extends AbstractStatementElement<Boolean> {

  protected getAvailableOperators(): Operator[] {
      return [{id: 'EQUALS', displayName: 'Equals'}]
  }

  protected getPropertyValue(): Boolean {
    return this.propertyValue ?? false;
  }

  @property({type: Boolean})
  protected propertyValue?: Boolean

  protected getStatementType(): string {
    return 'BooleanPropertyStatement'
  }

  protected getPropertyValueInputField() {
    return html`
      <div class="control">
        <label class="radio">
          <input type="radio" name="property-value-${this._uiId}" value="true" @change="${this._onPropertyValueChange}"
                 ?checked=${this.getPropertyValue()}
                 ?disabled=${!this.editable}>
          <code class="has-text-primary has-background-primary-light">True</code>
        </label>

        <label class="radio">
          <input type="radio" name="property-value-${this._uiId}" value="false" @change="${this._onPropertyValueChange}"
                 ?checked=${!this.getPropertyValue()}
                 ?disabled=${!this.editable}>
          <code class="has-text-danger-dark has-background-danger-light">False</code>
        </label>
      </div>
    `;
  }

  protected _onPropertyValueChange(e: Event): void {
    e.preventDefault()
    if (this.editable) {
      const target = e.target as HTMLInputElement
      if (target.name === "property-value-" + this._uiId) {
        console.debug(target.name, target.value)
        this.propertyValue = target.value === 'true'
        this.dispatchStateChange()
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-statement-boolean': BooleanPropertyStatementElement
  }
}

customElements.define('rn-statement-boolean', BooleanPropertyStatementElement)

registerController('BooleanPropertyStatement', booleanController)

