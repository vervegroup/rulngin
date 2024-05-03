import {PropertyStatement} from "../../statement/entity/Statement.ts";
import {html} from "lit";
import {ContainerPropertyOperator, ContainerStatement} from "../entity/ContainerStatement.ts";
import {StatementController} from "../../statement/control/StatementController.ts";
import {StatementUpdateEventDetails} from "../../statement/entity/CustomEvent.ts";

class ContainerStatementController implements StatementController<ContainerStatement> {

  createEmptyStatement(): ContainerStatement {
    return ({
      statementType: 'ContainerStatement',
      uiId: self.crypto.randomUUID().toString().toLowerCase()
    } as ContainerStatement);
  }

  createStatement(data: Record<string, unknown>): ContainerStatement {
    let id = (data.uiId ?? '').toString().trim()
    if (id.length != 36) {
      id = self.crypto.randomUUID().toString().toLowerCase()
    }

    return ({
      ...data,
      statementType: 'ContainerStatement',
      propertyValue: data.propertyValue ?? [],
      propertyName: data.propertyName ?? 'Unknown',
      operator: data.operator ?? 'ANY_OF',
      uiId: id
    } as ContainerStatement);
  }

  updateStatement(statement: ContainerStatement, ue: StatementUpdateEventDetails): ContainerStatement {
    const newStatement = {...statement} as ContainerStatement
    newStatement.propertyName = ue.propertyName
    newStatement.propertyValue = (ue.propertyValue ?? []) as PropertyStatement[];
    newStatement.operator = ue.operator as ContainerPropertyOperator
    newStatement.uiId = ue.uiId
    return newStatement
  }

  createUIElement(statement: ContainerStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== 'ContainerStatement') {
      throw new Error(`Invalid Statement Type. Expected 'ContainerStatement'. Got '${statement.statementType}' instead.`)
    }

    return html`
      <rn-statement-container
        .statementType=${statement.statementType}
        .propertyType=${'ContainerStatement'}
        .propertyName=${statement.propertyName}
        .operatorType=${statement.operator}
        .propertyValue=${(statement.propertyValue ?? [])}
        ?editable=${additionalSettings.editable ?? true}
        ui-id="${statement.uiId ?? additionalSettings.uiId ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-container>
    `
  }
}

const containerStatementController = new ContainerStatementController();

export default containerStatementController;