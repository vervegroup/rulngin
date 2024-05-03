import applicationStore from '../../../app/redux/control/ApplicationStore.ts'
import {html, LitElement} from 'lit'

export default class BoundaryDynamicElement<T> extends LitElement {
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true}
  private _state?: T = undefined
  private unsubscribe?: () => void = undefined

  connectedCallback(): void {
    super.connectedCallback()
    this.unsubscribe = applicationStore.subscribe(() => {
      this.triggerViewUpdate()
    })
    this.beforeRender()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    if (this.unsubscribe != null) {
      this.unsubscribe()
    }
  }

  private triggerViewUpdate(): void {
    this.beforeRender()
    this.reRender()
  }

  protected beforeRender(): void {
    const storeState = applicationStore.getState()
    this._state = this.extractState(storeState)
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this.renderTarget
  }

  render(): unknown {
    return this.view
  }

  updated(changedProperties: Map<string, unknown>): void {
    this.afterUpdate(changedProperties)
  }

  protected reRender(): void {
    this.requestUpdate()
  }

  protected extractState(reduxState: unknown): T {
    return reduxState as T
  }

  protected get view(): unknown {
    return html`<H2>${this.constructor.name}</H2>`
  }

  protected get state(): T | undefined {
    return this._state
  }

  protected get renderTarget(): HTMLElement {
    return this
  }

  protected afterUpdate(changedProperties: Map<string, unknown>): void {
    console.group(this.constructor.name, 'afterUpdate')
    for (const [key, value] of changedProperties) {
      console.debug(`Changed property: ${key} = ${value}`)
    }
    console.groupEnd()
  }
}
