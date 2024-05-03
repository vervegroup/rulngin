import {DashboardState} from "./DashboardState.ts";


export const dashboardEditorSlice : string = 'dashboardEditorSlice';

export const getDashboardInitialState = (): DashboardState => ({
  actionState: "Fulfilled",
  state: undefined,
});
