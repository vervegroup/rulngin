import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";
import {StringPropertyStatement} from "../entity/StringPropertyStatement.ts";
import {html} from "lit";

export class StringStatementController implements StatementController<StringPropertyStatement> {

  protected readonly _statementType: string

  constructor(statementType: 'StringPropertyStatement' | 'LogEventStringPropertyStatement') {
    this._statementType = statementType;
  }

  createEmptyStatement(): StringPropertyStatement {
    return ({
      statementType: this._statementType,
      uiId: self.crypto.randomUUID().toString().toLowerCase(),
      propertyName: 'Unknown'
    } as StringPropertyStatement);
  }

  createStatement(data: Record<string, unknown>): StringPropertyStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: this._statementType,
      uiId: id,
      propertyName: data.propertyName ?? 'Unknown',
      propertyValue: data.propertyValue ?? '',
      operator: data.operator ?? 'EQUALS'
    } as StringPropertyStatement);
  }

  updateStatement(statement: StringPropertyStatement, ue: StatementUpdateEventDetails): StringPropertyStatement {
    return ({
      ...statement,
      statementType: this._statementType,
      propertyName: ue.propertyName ?? 'Unknown',
      propertyValue: ue.propertyValue ?? '',
      operator: ue.operator ?? 'EQUALS'
    } as StringPropertyStatement);
  }

  createUIElement(statement: StringPropertyStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== this._statementType) {
      throw new Error(`Invalid Statement Type. Expected '${this._statementType}'. Got '${statement.statementType}' instead.`)
    }

    const propertyName = statement.propertyName

    return html`
      <rn-statement-string
        .statementType=${statement.statementType}
        .propertyType=${this._statementType}
        .propertyName=${propertyName}
        .propertyValue=${statement.propertyValue ?? ''}
        ?editable=${additionalSettings.editable ?? true}
        ui-id="${(statement.uiId ?? additionalSettings.uiId) ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-string>
    `
  }

}

const stringStatementController = new StringStatementController('StringPropertyStatement');

export default stringStatementController;