import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import {Task, TaskFunctionOptions} from "@lit/task";
import {getRulePolices} from "../control/DashboardApiClient.ts";
import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {html} from "lit";

class RulePolicyDashboard extends BoundaryStaticElement {

  private _fetchRulePoliciesTask = new Task(this, {
    task: this._task,
    args: () => [],
    onError: this._onTaskExecutionError
  })


  private _onTaskExecutionError(error: unknown): unknown {
    console.debug(this.constructor.name, this._onTaskError.name, {'error': error})
    return
  }

  protected get view(): unknown {
    return this._fetchRulePoliciesTask.render({
      pending: this._onTaskPending,
      complete: this._onTaskComplete,
      error: this._onTaskError
    });
  }


  private async _task(_args: string[], _options: TaskFunctionOptions): Promise<RulePolicy[]> {
    console.debug(this.constructor.name, this._task.name, {'task': 'Fetching Data from Backend'})
    return ((await getRulePolices()) ?? []
    )
  }

  private _onTaskPending() {
    return html`
      <div class="container">
        Loading...
      </div>
    `;
  }

  private _onTaskComplete(rulePolicies: RulePolicy[]) {
    return html`
      <rn-policy-dashboard-list .rulePolicies=${rulePolicies ?? []}></rn-policy-dashboard-list>
    `
  }

  private _onTaskError() {
    return html`
      <article class="message is-danger">
        <div class="message-header">
          <p>Error</p>
        </div>
        <div class="message-body">
          Can not lead rule policies from the backend.
        </div>
      </article>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-dashboard': RulePolicyDashboard
  }
}

customElements.define('rn-policy-dashboard', RulePolicyDashboard)