import {html} from "lit";
import {getRegisteredStatementTypes} from "../../statement/control/StatementControllerRegistry.ts";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import {property, state} from "lit/decorators.js";
import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {createPolicySavedEvent, createResetEditorEvent, createRulePolicyChangedEvent} from "../control/CustomEventFactory.ts";

type SupportedTabs = 'metadata' | 'statement';

export class PolicyEditor extends BoundaryStaticElement {

  @state()
  _activeTab: SupportedTabs = 'metadata';

  @property()
  rulePolicy?: RulePolicy

  protected get view(): unknown {
    let tabView = this._getTabMenuView();
    let tabContent = this._getTabContent();

    return html`
      <div class="tabs">${tabView}</div>
      <div>${tabContent}</div>
    `
  }

  private _getTabContent() {
    let tabContent
    if (this._activeTab === 'statement') {
      tabContent = this._policyStatementView();
    } else {
      tabContent = this._metadataView();
    }

    return tabContent;
  }

  private _getTabMenuView() {
    const saveButton = html`
      <li>
        <a class="button is-primary is-rounded is-small" @click=${(_e: Event) => this._createRulePolicy()}>
          Save
        </a>
      </li>
      <li>
        <a class="button is-danger is-rounded is-small" @click=${(_e: Event) => this._resetEditor()}>
          Clear all fields
        </a>
      </li>
    `;

    let tabView: any
    if (this._activeTab === 'metadata') {
      tabView = html`
        <ul>
          <li class="is-active">
            <a
              @click=${this._createOnClickSetTab('metadata')}>
              Policy Metadata
            </a>
          </li>
          <li>
            <a
              @click=${this._createOnClickSetTab('statement')}>
              Policy Statement
            </a>
          </li>
          ${saveButton}
        </ul>
      `
    } else if (this._activeTab === 'statement') {
      tabView = html`
        <ul>
          <li>
            <a @click=${this._createOnClickSetTab('metadata')}>
              Policy Metadata
            </a>
          </li>
          <li class="is-active">
            <a
              @click=${this._createOnClickSetTab('statement')}>
              Policy Statement
            </a>
          </li>
          ${saveButton}
        </ul>
      `
    }
    return tabView;
  }

  private _createOnClickSetTab(tabName: SupportedTabs) {
    return (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this._activeTab = tabName;
    }
  }

  protected _metadataView() {
    return html`
      <div class="block is-fullwidth">
        <rn-policy-metadata-editor
          .openForm=${true}
          .policyMetadata=${this.rulePolicy?.metadata}
          @rn-update-policy-metadata=${this._onPolicyMetadataChanged}
        ></rn-policy-metadata-editor>
      </div>
    `
  }

  protected _policyStatementView() {
    const registeredStatementTypes = getRegisteredStatementTypes();
    registeredStatementTypes.sort();
    const selectors = registeredStatementTypes.map(st => html`
      <rn-statement-selector class="box" statement-type="${st}"></rn-statement-selector>
    `)

    return html`
      <div class="block is-fullwidth">
        <div class="columns is-fullwidth">
          <div class="column">
            <h3 class="title is-3">Sampling Policy</h3>
            <rn-policy-statement-editor
              .propertyStatement=${(this.rulePolicy?.statement)}
              @rn-update-policy-statement=${this._onPolicyStatementChanged}
              class="hero is-fullheight"
            ></rn-policy-statement-editor>
          </div>

          <div class="column has-background-grey-lighter is-one-fifth">
            <h3 class="title is-3">Statements</h3>
            <div class="block">
              ${selectors}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _onPolicyStatementChanged(event: CustomEvent) {
    event.preventDefault()
    event.stopPropagation()
    const {detail: {propertyStatement}} = event;
    this.dispatchEvent(createRulePolicyChangedEvent({...this.rulePolicy, statement: propertyStatement} as RulePolicy))
  }

  private _onPolicyMetadataChanged(event: CustomEvent) {
    event.preventDefault()
    event.stopPropagation()
    const {detail: {policyMetadata}} = event;
    const rulePolicyChangedEvent = createRulePolicyChangedEvent({...this.rulePolicy, metadata: policyMetadata} as RulePolicy);
    this.dispatchEvent(rulePolicyChangedEvent)
  }

  private _createRulePolicy() {
    this.dispatchEvent(createPolicySavedEvent(this.rulePolicy))
  }

  private _resetEditor() {
    this.dispatchEvent(createResetEditorEvent(this.rulePolicy))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-editor': PolicyEditor
  }
}

customElements.define('rn-policy-editor', PolicyEditor);