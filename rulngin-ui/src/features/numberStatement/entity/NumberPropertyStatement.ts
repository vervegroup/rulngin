import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type NumberPropertyOperator = 'EQUALS' | 'NOT_EQUALS';

export type NumberPropertyStatement = PropertyStatement & {
  statementType: 'IntegerPropertyStatement' | 'DecimalPropertyStatement' | 'ProbabilisticPropertyStatement';
  propertyValue: number;
  operator: NumberPropertyOperator;
}
