import {StatementController} from "./StatementController.ts";
import {PropertyStatement} from "../entity/Statement.ts";

export class StatementControllerRegistry {
  private _controllers: Record<string, StatementController<PropertyStatement>> = {};

  public register(statementType: string, sc: StatementController<PropertyStatement>) {
    this._controllers[statementType] = sc;
  }

  public getController(statementType: string): StatementController<PropertyStatement> | undefined {
    return this._controllers[statementType];
  }

  public getRegisteredStatementTypes(): string[] {
    return Object.keys(this._controllers)
  }
}

export const defaultStatementControllerRegistry = new StatementControllerRegistry();

export const registerController = (statementType: string, statementController: StatementController<PropertyStatement>) => {
  defaultStatementControllerRegistry.register(statementType, statementController);
}

export const getController = (statementType: string): StatementController<PropertyStatement> | undefined => {
  return defaultStatementControllerRegistry.getController(statementType);
}

export const getRegisteredStatementTypes = (): string[] => defaultStatementControllerRegistry.getRegisteredStatementTypes()
