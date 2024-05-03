import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type StringPropertyOperator = 'EQUALS' | 'NOT_EQUALS';

export type StringPropertyStatement = PropertyStatement & {
  statementType: 'StringPropertyStatement' | 'LogEventStringPropertyStatement';
  propertyValue: string;
  operator: StringPropertyOperator;
}
