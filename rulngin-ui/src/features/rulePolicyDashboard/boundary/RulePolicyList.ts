import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {property, state} from "lit/decorators.js";
import {html} from "lit";
import {navigate} from "../../../app/navigation/control/Navigator.ts";
import {RulePolicy} from "../entity/RulePolicy.ts";


const tableColumns = html`
  <th>ID</th>
  <th>Name</th>
  <th>Cluster</th>
  <th>Status</th>
  <th>Options</th>
  </tr>
`

class RulePolicyList extends BoundaryStaticElement {

  @property()
  rulePolicies?: RulePolicy[]

  @state()
  filterKeyword?: string


  protected get view(): unknown {
    const filterView = this._getFilterView()
    const rulePolicyView = this._getRulePolicyView()

    return html`
      <div class="container">
        ${filterView}
      </div>
      <hr class="is-success">
      <div class="container">
        ${rulePolicyView}
      </div>
    `;
  }

  private _getFilterView() {
    return html`
      <div class="columns">
        <div class="column is-two-thirds-desktop is-two-thirds-fullhd">
          <div class="field">
            <label class="label">Filter</label>
            <div class="control has-icons-left">
              <input class="input is-success"
                     type="text"
                     placeholder="keyword"
                     value="${this.filterKeyword}"
                     @keyup=${this._onFilterKeywordChange}
              >
              <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
            </div>
            <p class="help is-success">Keyword to filter the rule policies by. For now, only Metadata is supported in the filtering</p>
          </div>
        </div>
      </div>
    `
  }

  private _onFilterKeywordChange(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const keyword = (event.target as HTMLInputElement)?.value ?? ''
    console.debug(this.constructor.name, this._onFilterKeywordChange.name, {'event': event}, {'value': keyword})
    if (this.filterKeyword !== keyword) {
      this.filterKeyword = keyword
    }
  }

  private _getFilteredRulePolicies(): RulePolicy[] {
    const keyword = this.filterKeyword?.trim()?.toLowerCase() ?? ''
    if (keyword === '') {
      return this.rulePolicies ?? []
    }

    return (this.rulePolicies ?? [])
      .filter(rp => this._doesContainsFilterKeyword(rp, keyword))
      .sort((a, b) => a.metadata?.createdAt?.localeCompare(b.metadata?.createdAt ?? '') ?? 0)
  }

  private _doesContainsFilterKeyword(rulePolicy: RulePolicy, keyword: string): boolean {
    if (rulePolicy.id.toLowerCase().includes(keyword)) {
      return true
    }

    if (rulePolicy.metadata) {
      const values = Object.values(rulePolicy.metadata).flatMap(v => {
        if (typeof v === 'string') {
          return [v]
        }
        if (typeof v === 'object' && v !== null) {
          return Object.values(v)
        }
      })

      for (const aValue of values) {
        if (aValue?.toString()?.toLowerCase()?.trim()?.includes(keyword)) {
          return true
        }
      }
    }

    return false;
  }

  private _getRulePolicyView() {
    const rps = this._getFilteredRulePolicies()

    if (!rps || rps.length === 0) {
      return html`
        <article class="message is-info">
          <div class="message-body">
            No <em>rule policies</em> found!
          </div>
        </article>
      `
    }

    const rpsRows = rps.map(rp => html`
      <tr>
        <td>${rp.id}</td>
        <td>${rp.metadata?.name ?? '-'}</td>
        <td>${rp.metadata?.cluster?.name ?? '-'}</td>
        <td>${rp.metadata?.status ?? "DRAFT"}</td>
        <td>
          <button class="button is-link"
                  @click=${() => navigate('policy-editor/' + rp.id)}
          >Open
          </button>
        </td>
      </tr>
    `)

    const showTableFooter = rpsRows.length > 10;


    return html`
      <div class="table-container">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
          <tr>
            ${tableColumns}
          </thead>
          ${showTableFooter ? html`
            <tfoot>
            <tr>
              ${tableColumns}
            </tr>
            </tfoot>
          ` : undefined}
          <tbody>
          ${rpsRows}
          </tbody>
        </table>
      </div>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-dashboard-list': RulePolicyList
  }
}

customElements.define('rn-policy-dashboard-list', RulePolicyList)