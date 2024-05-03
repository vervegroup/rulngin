import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";
import {NumberPropertyStatement} from "../entity/NumberPropertyStatement.ts";
import {Operator} from "../../statement/entity/Statement.ts";

export const getNumberValueRange = (statementType: string): number[] => {
  if (statementType === "ProbabilisticPropertyStatement") {
    return [0.0, 1.0]
  }
  if (statementType === "StatusCodePropertyStatement") {
    return [100, 599]
  }
  if (statementType === "DecimalPropertyStatement") {
    return [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
  }
  if (statementType === "IntegerPropertyStatement") {
    return [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  }
  return []
}

export abstract class NumberStatementController implements StatementController<NumberPropertyStatement> {
  protected readonly _statementType: string

  protected _getOperatorsAvailable(): Operator[] {
    return [
      {id: 'SMALLER_THAN', displayName: 'Smaller Than'},
      {id: 'SMALLER_EQUAL_THAN', displayName: 'Smaller or Equal Than'},
      {id: 'EQUALS', displayName: 'Equals'},
      {id: 'LARGER_EQUAL_THAN', displayName: 'Larger or Equal Than'},
      {id: 'LARGER_THAN', displayName: 'Larger Than'},
      {id: 'NOT_EQUALS', displayName: 'Not Equals'}
    ]
  }


  protected constructor(statementType: string) {
    this._statementType = statementType;
  }

  createEmptyStatement(): NumberPropertyStatement {
    return ({
      statementType: this._statementType,
      uiId: self.crypto.randomUUID().toString().toLowerCase(),
      propertyName: 'Unknown'
    } as NumberPropertyStatement);
  }

  createStatement(data: Record<string, unknown>): NumberPropertyStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: this._statementType,
      uiId: id,
      propertyName: data.propertyName ?? 'Unknown',
      propertyValue: data.propertyValue ?? 0,
      operator: data.operator ?? 'EQUALS'
    } as NumberPropertyStatement);
  }

  updateStatement(statement: NumberPropertyStatement, ue: StatementUpdateEventDetails): NumberPropertyStatement {
    return ({
      ...statement,
      statementType: this._statementType,
      propertyName: ue.propertyName ?? 'Unknown',
      propertyValue: ue.propertyValue ?? 0,
      operator: ue.operator ?? 'EQUALS'
    } as NumberPropertyStatement);
  }

  abstract createUIElement(statement: NumberPropertyStatement, additionalSettings: Record<string, unknown>): unknown ;
}
