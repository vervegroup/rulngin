import {EditorState} from "./EditorState.ts";


export const policyEditorSlice : string = 'policyEditorSlice';

export const getEditorInitialState = (): EditorState => ({
  actionState: "Fulfilled",
  state: undefined,
});
