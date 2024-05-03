import {html} from "lit";
import {DurationPropertyOperator, DurationPropertyStatement, DurationValues} from "../entity/DurationPropertyStatement.ts";
import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";


class DurationStatementController implements StatementController<DurationPropertyStatement> {

  createEmptyStatement(): DurationPropertyStatement {
    return ({
      statementType: 'DurationPropertyStatement',
      uiId: self.crypto.randomUUID().toString().toLowerCase()
    } as DurationPropertyStatement);
  }

  createStatement(data: Record<string, unknown>): DurationPropertyStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: 'DurationPropertyStatement',
      propertyValue: data.propertyValue ?? undefined,
      propertyName: data.propertyName ?? undefined,
      operator: data.operator ?? undefined,
      uiId: id
    } as DurationPropertyStatement);
  }

  updateStatement(statement: DurationPropertyStatement, ue: StatementUpdateEventDetails): DurationPropertyStatement {
    const newStatement: DurationPropertyStatement = {...statement}
    newStatement.propertyName = ue.propertyName
    newStatement.operator = ue.operator as DurationPropertyOperator
    newStatement.propertyValue = ue.propertyValue as DurationValues;
    return newStatement
  }

  createUIElement(statement: DurationPropertyStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== 'DurationPropertyStatement') {
      throw new Error(`Invalid Statement Type. Expected 'DurationPropertyStatement'. Got '${statement.statementType}' instead.`)
    }

    return html`
      <rn-statement-duration
        .statementType=${statement.statementType}
        .propertyType=${'DurationPropertyStatement'}
        .propertyName=${statement.propertyName}
        .propertyValue=${(statement.propertyValue ?? {minValue: 10, maxValue: 250})}
        .operatorType=${statement.operator}
        ?editable=${additionalSettings.editable ?? true}
        .hasPropertyKey=${additionalSettings.hasPropertyKey ?? true}
        ui-id="${statement.uiId ?? additionalSettings.uiId ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-duration>
    `
  }
}

const durationController = new DurationStatementController();

export default durationController;