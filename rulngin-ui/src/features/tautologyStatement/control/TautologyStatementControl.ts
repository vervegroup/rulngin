import {html} from "lit";
import {TautologyPropertyStatement} from "../entity/TautologyPropertyStatement.ts";
import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";

class TautologyStatementController implements StatementController<TautologyPropertyStatement> {

  createEmptyStatement(): TautologyPropertyStatement {
    return ({
      statementType: 'TautologyStatement',
      propertyName: 'Unknown',
      uiId: self.crypto.randomUUID().toString().toLowerCase()
    } as TautologyPropertyStatement);
  }

  createStatement(data: Record<string, unknown>): TautologyPropertyStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: 'TautologyStatement',
      propertyName: data.propertyName ?? 'Unknown',
      uiId: id
    } as TautologyPropertyStatement);
  }

  updateStatement(statement: TautologyPropertyStatement, ue: StatementUpdateEventDetails): TautologyPropertyStatement {
    const newStatement = {...statement}
    newStatement.propertyName = ue.propertyName
    newStatement.uiId = ue.uiId
    return newStatement
  }

  createUIElement(statement: TautologyPropertyStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== 'TautologyStatement') {
      throw new Error(`Invalid Statement Type. Expected 'TautologyStatement'. Got '${statement.statementType}' instead.`)
    }

    const propertyName = statement.propertyName

    return html`
      <rn-statement-tautology
        .statementType=${statement.statementType}
        .propertyType=${statement.statementType}
        .propertyName=${propertyName}
        .propertyValue=${'Tautology'}
        ?editable=${additionalSettings.editable ?? true}
        ui-id="${statement.uiId ?? additionalSettings.uiId ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-tautology>
    `
  }
}

const tautologyStatementController: TautologyStatementController = new TautologyStatementController();

export default tautologyStatementController;