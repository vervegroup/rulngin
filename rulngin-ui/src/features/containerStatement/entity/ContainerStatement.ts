import {PropertyStatement} from "../../statement/entity/Statement.ts";

export type ContainerPropertyOperator = 'EQUALS' | 'NOT_EQUALS';

export type ContainerStatement = PropertyStatement & {
  statementType: 'ContainerStatement';
  propertyValue: PropertyStatement[];
  operator: ContainerPropertyOperator;
}
