import {StatementUpdateEventDetails} from "../entity/CustomEvent.ts";
import {getController} from "./StatementControllerRegistry.ts";
import {PropertyStatement} from "../entity/Statement.ts";

export const createUIDataStatement = (statementType: string, propertyName: string, additionalSettings: Record<string, unknown>): PropertyStatement => {
  const controller = getController(statementType)

  if (controller) {
    return controller.createStatement({...additionalSettings, propertyName});
  }

  const errorMessage = `No controller found for the statement type: ${statementType}`;
  console.error(`${createUIDataStatement.name}: ${errorMessage}`);
  throw new Error(errorMessage);
}

export const updateUIDataStatement = (propertyStatement: PropertyStatement, statementUpdateEventDetails: StatementUpdateEventDetails): PropertyStatement => {
  const controller = getController(propertyStatement.statementType)

  if (controller) {
    return controller.updateStatement(propertyStatement, statementUpdateEventDetails);
  }

  const errorMessage = `No controller found for statement type: ${propertyStatement.statementType}`;
  console.error(`${updateUIDataStatement.name}: ${errorMessage}`, propertyStatement, statementUpdateEventDetails);
  throw new Error(errorMessage);
}

export const createUIElement = (propertyStatement: PropertyStatement, additionalSettings: Record<string, unknown>): unknown => {
  const controller = getController(propertyStatement.statementType)

  if (controller) {
    return controller.createUIElement(propertyStatement, additionalSettings);
  }

  const errorMessage = `No controller found for statement type: ${propertyStatement.statementType}`;
  console.error(`${createUIElement.name}: ${errorMessage}`, propertyStatement);
  throw new Error(errorMessage);
}
