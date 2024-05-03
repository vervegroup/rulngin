import {property} from "lit/decorators.js";
import {createEvent} from "../control/StatementEventFactory.ts";
import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {ADDED_STATEMENT_EVENT_TYPE, REMOVED_STATEMENT_EVENT_TYPE, UPDATED_STATEMENT_EVENT_TYPE} from "../entity/CustomEvent.ts";
import {html} from "lit";
import {Operator} from "../entity/Statement.ts";

export abstract class AbstractStatementElement<ValueType> extends BoundaryStaticElement {

  @property({type: String, attribute: 'ui-id'})
  protected _uiId: string = self.crypto.randomUUID().toString().toLowerCase()

  @property({type: Boolean, attribute: 'is-editable'})
  protected hasPropertyKey: Boolean

  @property({type: Boolean, attribute: 'is-editable'})
  protected editable: Boolean

  @property({type: String, attribute: 'propertyName'})
  propertyName: string

  @property({type: String})
  statementType: string

  @property({type: String})
  operatorType: string

  @property({type: Object})
  protected hintForUser: any

  constructor() {
    super();
    this.hasPropertyKey = true;
    this.editable = true;
    this.propertyName = "Unknown"
    this.statementType = 'StringPropertyStatement'
    this.operatorType = ''
    this.hintForUser = html`
      Property name of this statement, for example:
      <code class="is-family-code">order_date</code>,
      <code class="is-family-code">application_id</code>,
      etc.
    `
  }

  protected get uiId(): string {
    return this._uiId
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent(
          ADDED_STATEMENT_EVENT_TYPE,
          {
            bubbles: true,
            detail: {
              statementType: this.getStatementType(),
              propertyName: this.propertyName,
              propertyValue: this.getPropertyValue(),
              uiId: this.uiId
            }
          }
        )
      )
    }, 1)
  }

  protected abstract getPropertyValue(): ValueType

  protected abstract getStatementType(): string

  protected abstract getAvailableOperators(): Operator[]

  protected dispatchStateChange() {
    this.dispatchEvent(createEvent(
      UPDATED_STATEMENT_EVENT_TYPE,
      this.getStatementType(),
      this.propertyName,
      this.getPropertyValue(),
      this._uiId,
      this.operatorType
    ))
  }

  protected delete(): void {
    if (this.editable) {
      this.dispatchEvent(new CustomEvent(REMOVED_STATEMENT_EVENT_TYPE, {bubbles: true, detail: {uiId: this.uiId}}))
    }
  }

  protected get view(): unknown {

    const deleteButton = this.editable ? html`
      <button class="delete is-danger" @click="${this.delete}" title="delete"></button>` : html``

    return html`
      <article class="message is-dark">
        <div class="message-header" title="${this.uiId}">
          <p>${this.statementTypeDisplayName}</p>
          ${deleteButton}
        </div>

        <div class="message-body">
          <div class="block">

            <!-- Property Name -->
            ${this.getPropertyNameInputField()}

            <!-- Property Operator -->
            ${this.getPropertyOperatorInputField()}

            <!-- Property Value -->
            ${this.getPropertyValueInputField()}
          </div>
        </div>

      </article>
    `
  }

  private getPropertyNameInputField() {
    if (!this.hasPropertyKey) {
      return undefined;
    }
    return html`
      <!-- Property Name -->
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Property Name</a>
              </p>
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  name="property-name"
                  placeholder="Property Name"
                  value="${this.propertyName}"
                  @change="${this._onPropertyNameChange}"
                  ?readonly=${!this.editable}
                >
              </p>
            </div>
            <p class="help">
              Property name of this statement, for example:
              <code class="is-family-code">order_date</code>,
              <code class="is-family-code">application_id</code>,
              etc.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  protected abstract getPropertyValueInputField(): unknown

  protected _onPropertyNameChange(e: Event): void {
    e.preventDefault()
    if (this.editable) {
      const target = e.target as HTMLInputElement
      this.propertyName = target.value
      this.dispatchStateChange()
    }
  }

  protected get statementTypeDisplayName() {
    return this.getStatementType().split(/(?=[A-Z])/).join(' ')
  }

  private getPropertyOperatorInputField() {
    const operators = this.getAvailableOperators()
    if (operators.length === 0) {
      return undefined
    }
    return html`
      <!-- Property Operator -->
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">Property Operator</a>
              </p>
              <div class="select control">
                <select
                  name="property-operator"
                  @change=${this._onPropertyOperatorChange}>
                  ${operators.map(c => html`
                    <option
                      ?selected=${(this.operatorType === c.id)}
                      value="${c.id}">${c.displayName}
                    </option>
                  `)}
                </select>
              </div>
            </div>
            <p class="help">
              Property name of this statement, for example:
              <code class="is-family-code">order_date</code>,
              <code class="is-family-code">application_id</code>,
              etc.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private _onPropertyOperatorChange(event: InputEvent) {
    event.preventDefault()
    event.stopPropagation()

    const {name, value} = event.target as HTMLInputElement
    if (name === 'property-operator') {
      this.operatorType = value
      this.dispatchStateChange()
    }
  }
}
