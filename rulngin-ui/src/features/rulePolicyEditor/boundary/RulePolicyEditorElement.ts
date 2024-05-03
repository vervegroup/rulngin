import BoundaryDynamicElement from "../../htmlelement/boundary/BoundaryDynamicElement.ts";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import {readEditorState, readRulePolicy} from "../control/EditorStateReaders.ts";
import {html} from "lit";
import {
  dispatchCreateRulePolicyAction,
  dispatchResetEditor,
  dispatchRulePolicyChanged,
  dispatchUpdateRulePolicyAction
} from "../control/EditorDispatchers.ts";

export class RulePolicyEditorElement extends BoundaryDynamicElement<RulePolicy> {
  protected extractState(reduxState: unknown): RulePolicy {
    return readRulePolicy(readEditorState(reduxState));
  }

  protected get view(): unknown {
    console.log(this.constructor.name, 'view', {state: this.state})
    return html`
      <rn-policy-editor
        .rulePolicy=${this.state}
        @rn-update-rule-policy=${this.updateRulePolicy}
        @rn-save-policy=${this.saveRulePolicy}
        @rn-reset-editor=${this.resetEditor}
      >
      </rn-policy-editor>
    `;
  }

  protected updateRulePolicy(event: CustomEvent) {
    event.preventDefault()
    event.stopPropagation()
    const {detail: {rulePolicy}} = event
    dispatchRulePolicyChanged(rulePolicy)
  }

  protected saveRulePolicy(event: CustomEvent) {
    event.preventDefault()
    event.stopPropagation()
    const rulePolicy: RulePolicy = event.detail?.rulePolicy ?? undefined
    if (!rulePolicy) {
      console.warn(this.constructor.name, this.saveRulePolicy.name, 'Can not save an undefined RulePolicy')
      return
    }

    if (rulePolicy.id?.trim().length === 36) {
      dispatchUpdateRulePolicyAction(rulePolicy)
    } else {
      dispatchCreateRulePolicyAction(rulePolicy)
    }
  }

  protected resetEditor(event: CustomEvent) {
    event.preventDefault()
    event.stopPropagation()
    dispatchResetEditor()
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-creator': RulePolicyEditorElement
  }
}


customElements.define('rn-policy-creator', RulePolicyEditorElement)