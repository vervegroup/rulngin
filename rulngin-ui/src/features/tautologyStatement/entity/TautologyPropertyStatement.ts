import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type TautologyPropertyStatement = PropertyStatement & {
  statementType: 'TautologyStatement';
}
