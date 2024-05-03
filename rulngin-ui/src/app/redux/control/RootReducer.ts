import {authSliceName} from '../../auth/entity/AuthConstants.ts'
import {authReducer} from '../../auth/entity/AuthStoreSlice.ts'
import {policyEditorSlice} from "../../../features/rulePolicyEditor/entity/EditorConstants.ts";
import {editorReducer} from "../../../features/rulePolicyEditor/entity/EditorStoreSlice.ts";

const rootReducer = {
  [authSliceName]: authReducer,
  [policyEditorSlice]: editorReducer
}

export default rootReducer
