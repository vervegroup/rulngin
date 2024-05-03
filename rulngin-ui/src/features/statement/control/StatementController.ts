import {StatementUpdateEventDetails} from "../entity/CustomEvent.ts";
import {PropertyStatement} from "../entity/Statement.ts";

export interface StatementController<T extends PropertyStatement> {

  createEmptyStatement(): T;

  createStatement(data: Record<string, unknown>): T;

  updateStatement(statement: T, ue: StatementUpdateEventDetails): T;

  createUIElement(statement: T, additionalSettings: Record<string, unknown>): unknown;
}