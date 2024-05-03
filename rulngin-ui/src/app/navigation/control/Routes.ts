import {ActionResult, Commands, Context, type Router} from '@vaadin/router'
import {dispatchResetEditor, dispatchRulePolicyChanged} from "../../../features/rulePolicyEditor/control/EditorDispatchers.ts";
import {apiGetRulePolicy} from "../../../features/rulePolicyEditor/control/EditorApiClient.ts";
import {redirectIfNotLoggedInAction} from "./RouterActions.ts";

export type NavigationEntry = {
  name: string
  path: string
  component: string
  visible?: boolean
  children?: NavigationEntry[]
}

export const navigationEntries = [
  {
    name: 'Home',
    path: '/',
    component: 'rul-ngin-app',
    visible: true
  }, {
    name: 'Dashboard',
    path: '/dashboard',
    component: 'rn-policy-dashboard',
    visible: true,
    action: redirectIfNotLoggedInAction
  },
  {
    name: 'Create New Policy',
    path: '/create-new-policy',
    component: 'rn-policy-creator',
    visible: true,
    action: (context: Context, commands: Commands): ActionResult | Promise<ActionResult> => {
      redirectIfNotLoggedInAction(context, commands).then(_ => dispatchResetEditor())
    }
  },
  {
    name: 'signin-callback',
    path: '/signin-callback',
    component: 'rn-signin-callback',
    visible: false
  },
  {
    name: 'bq-user-info',
    path: '/me',
    component: 'bq-user-info',
    visible: false,
    action: redirectIfNotLoggedInAction
  },
  {
    name: 'Policy-Editor',
    path: '/policy-editor/:rulePolicyId',
    component: 'rn-policy-creator',
    visible: false,
    action: async (context: Context, commands: Commands): Promise<ActionResult> => {
      await redirectIfNotLoggedInAction(context, commands)
      console.log(`Maybe reset PolicyEditor using ${dispatchResetEditor.name} before navigating to the editor.`, context, commands);
      return apiGetRulePolicy(context.params.rulePolicyId as string)
        .then(rp => dispatchRulePolicyChanged(rp))
        .then(_ => null)
    }
  }
]

const routes: Router.Route[] = navigationEntries.map(e => e)

export default routes
