import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type BooleanPropertyOperator = 'EQUALS' | 'NOT_EQUALS';

export type BooleanPropertyStatement = PropertyStatement & {
  statementType: 'BooleanPropertyStatement';
  propertyValue: boolean;
  operator: BooleanPropertyOperator;
}
