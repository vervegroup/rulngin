import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type DurationPropertyOperator = 'WITHIN' | 'OUTSIDE';

export type DurationValues = { minValue: number, maxValue: number }

export type DurationPropertyStatement = PropertyStatement & {
  statementType: 'DurationPropertyStatement';
  propertyValue: DurationValues;
  operator: DurationPropertyOperator;
}
