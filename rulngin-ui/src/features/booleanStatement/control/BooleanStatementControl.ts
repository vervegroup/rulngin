import {html} from "lit";
import {BooleanPropertyOperator, BooleanPropertyStatement} from "../entity/BooleanPropertyStatement.ts";
import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";

class BooleanStatementController implements StatementController<BooleanPropertyStatement> {

  createEmptyStatement(): BooleanPropertyStatement {
    return ({
      statementType: 'BooleanPropertyStatement',
      uiId: self.crypto.randomUUID().toString().toLowerCase()
    } as BooleanPropertyStatement);
  }

  createStatement(data: Record<string, unknown>): BooleanPropertyStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: 'BooleanPropertyStatement',
      propertyValue: data.propertyValue ?? undefined,
      propertyName: data.propertyName ?? undefined,
      operator: data.operator ?? undefined,
      uiId: id
    } as BooleanPropertyStatement);
  }

  updateStatement(statement: BooleanPropertyStatement, ue: StatementUpdateEventDetails): BooleanPropertyStatement {
    const newStatement = {...statement}
    newStatement.propertyName = ue.propertyName
    newStatement.propertyValue = !!(ue.propertyValue ?? false);
    newStatement.operator = ue.operator as BooleanPropertyOperator
    newStatement.uiId = ue.uiId
    return newStatement
  }

  createUIElement(statement: BooleanPropertyStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== 'BooleanPropertyStatement') {
      throw new Error(`Invalid Statement Type. Expected 'BooleanPropertyStatement'. Got '${statement.statementType}' instead.`)
    }

    const propertyValue = statement.propertyValue ?? false
    const propertyName = statement.propertyName

    return html`
      <rn-statement-boolean
        .statementType=${statement.statementType}
        .propertyType=${'BooleanPropertyStatement'}
        .propertyName=${propertyName}
        .propertyValue=${propertyValue}
        .operatorType=${statement.operator}
        ?editable=${additionalSettings.editable ?? true}
        ui-id="${statement.uiId ?? additionalSettings.uiId ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-boolean>
    `
  }
}

const booleanController = new BooleanStatementController();

export default booleanController;