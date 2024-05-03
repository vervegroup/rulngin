import {ReduxStateHolder} from "../../../app/redux/entity/ReduxStateHolder.ts";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";

export interface DashboardState extends ReduxStateHolder<RulePolicy[]> {

}