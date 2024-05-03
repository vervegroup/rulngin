import {OidcData} from "./OidcData.ts";
import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";

export interface AuthState extends ReduxStateHolder<OidcData> {
}