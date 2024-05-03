import BoundaryStaticElement from "../../htmlelement/boundary/BoundaryStaticElement.ts";
import {createPolicyMetadataChangedEvent} from "../control/CustomEventFactory.ts";
import {PolicyMetadata} from "../../rulePolicy/entity/RulePolicy.ts";
import {html} from "lit";
import {property, state} from "lit/decorators.js";
import {apiGetClusters} from "../control/EditorApiClient.ts";
import {Cluster} from "../../rulePolicy/entity/Clusters.ts";


export class PolicyMetadataEditor extends BoundaryStaticElement {

  @property()
  policyMetadata?: PolicyMetadata;

  @state()
  clusters: Cluster[] = [];

  constructor() {
    super();

    apiGetClusters().then(clusters => {
      this.clusters = clusters;
    })
  }


  protected get view(): unknown {

    let name: string;
    if (this.policyMetadata && this.policyMetadata.name && this.policyMetadata.name.trim().length > 0) {
      name = this.policyMetadata.name;
    } else {
      name = "'Unknown'";
    }
    const cluster = this.policyMetadata?.cluster ?? '-'

    const title = html`${name} for cluster: ${cluster}`

    return html`
      <h3 class="title is-4">${title}</h3>
      <div class="container pl-2 pr-2 has-background-light">${this._metadataFormView()}</div>
    `;
  }

  private _metadataFormView(): unknown {
    return html`
      ${this._nameAndCluster()}
      ${this._noteView()}
      ${this._creatorView()}
      ${this._modifierView()}
    `
  }

  private _creatorView() {
    return html`
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Creator</label>
            <div class="control has-icons-left">
              <input class="input"
                     type="text"
                     name="created-by"
                     placeholder="Created By"
                     value="${this.policyMetadata?.createdByUserId}"
                     readonly
              >
              <span class="icon is-small is-left"><i class="fas fa-file-signature"></i></span>
            </div>
            <p class="help is-info">
              The initial creator of the policy. It will be populated automatically in the backend
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Created At</label>
            <div class="control has-icons-left">
              <input class="input"
                     type="text"
                     name="created-at"
                     placeholder="Created At"
                     value="${this.policyMetadata?.createdAt}"
                     readonly
              >
              <span class="icon is-small is-left"><i class="fas fa-clock"></i></span>
            </div>
            <p class="help is-info">
              The initial creation time of the policy. It will be populated automatically in the backend
            </p>
          </div>
        </div>
      </div>
    `
  }

  private _modifierView() {
    return html`
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Last Modified By</label>
            <div class="control has-icons-left">
              <input class="input"
                     type="text"
                     name="last-modified-by"
                     placeholder="Last Modified By"
                     value="${this.policyMetadata?.modifiedByUserId}"
                     readonly
              >
              <span class="icon is-small is-left"><i class="fas fa-file-signature"></i></span>
            </div>
            <p class="help is-info">
              Last modified by. It will be populated automatically in the backend
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Last Modified At</label>
            <div class="control has-icons-left">
              <input class="input"
                     type="text"
                     name="last-modified-at"
                     placeholder="Last Modified At"
                     value="${this.policyMetadata?.modifiedAt}"
                     readonly
              >
              <span class="icon is-small is-left"><i class="fas fa-clock"></i></span>
            </div>
            <p class="help is-info">
              Last modified at. It will be populated automatically in the backend
            </p>
          </div>
        </div>
      </div>
    `
  }

  private _noteView() {
    return html`
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Note</label>
            <div class="control">
              <textarea
                name="policy-note"
                class="textarea"
                placeholder="Note"
                .innerText=${this.policyMetadata?.note ?? ''}
                rows="3"
                @change=${this._onPropertyChange}
              >
              </textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _nameAndCluster() {
    return html`
      <div class="columns">
        <div class="column is-two-thirds-desktop">
          <div class="field">
            <label class="label">Policy Name</label>
            <div class="control has-icons-left">
              <input class="input"
                     type="text"
                     name="policy-name"
                     placeholder="Policy Name"
                     value="${this.policyMetadata?.name}"
                     @change=${this._onPropertyChange}
                     required
              >
              <span class="icon is-small is-left"><i class="fas fa-fingerprint"></i></span>
            </div>
            <p class="help is-info">
              The name of this policy
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Cluster</label>
            <div class="control has-icons-left">
              <div class="select">
                <select
                  name="policy-cluster"
                  @change=${this._onPropertyChange}>
                  <option value="-">Select Cluster</option>
                  ${this.clusters.map(c => html`
                    <option
                      ?selected=${(this.policyMetadata?.cluster === c.id)}
                      value="${c.id}">${c.name}
                    </option>`)}
                </select>
              </div>
              <span class="icon is-small is-left"><i class="fas fa-server"></i></span>
            </div>
            <p class="help is-info">
              The cluster to which to apply this policy
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Status</label>
            <div class="control has-icons-left">
              <div class="select">
                <select
                  name="policy-status"
                  @change=${this._onPropertyChange}>
                  <option value="-">Status</option>
                  ${['DE_ACTIVE', 'ACTIVE'].map(c => html`
                    <option
                      ?selected=${(this.policyMetadata?.status === c)}
                      value="${c}">${c}
                    </option>`
                  )}
                </select>
              </div>
              <span class="icon is-small is-left"><i class="fas fa-server"></i></span>
            </div>
            <p class="help is-info">
              Status of the policy
            </p>
          </div>
        </div>

      </div>
    `;
  }

  protected afterUpdate(_changedProperties: Map<string, unknown>) {
  }

  protected dispatchStateChange() {
    this.dispatchEvent(createPolicyMetadataChangedEvent(this.policyMetadata))
  }

  private _onPropertyChange(event: InputEvent) {
    event.preventDefault()
    event.stopPropagation()

    const {name, value} = event.target as HTMLInputElement

    if (name === 'policy-name') {
      this.policyMetadata = {...this.policyMetadata, name: value} as PolicyMetadata
      this.dispatchEvent(createPolicyMetadataChangedEvent(this.policyMetadata))
    } else if (name === 'policy-cluster') {
      this.policyMetadata = {...this.policyMetadata, cluster: value} as PolicyMetadata
      this.dispatchEvent(createPolicyMetadataChangedEvent(this.policyMetadata))
    } else if (name === 'policy-note') {
      this.policyMetadata = {...this.policyMetadata, note: value} as PolicyMetadata
      this.dispatchEvent(createPolicyMetadataChangedEvent(this.policyMetadata))
    } else if (name === 'policy-status') {
      this.policyMetadata = {...this.policyMetadata, status: value} as PolicyMetadata
      this.dispatchEvent(createPolicyMetadataChangedEvent(this.policyMetadata))
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'rn-policy-metadata-editor': PolicyMetadataEditor
  }
}

customElements.define('rn-policy-metadata-editor', PolicyMetadataEditor)