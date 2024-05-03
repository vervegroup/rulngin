export const ADDED_STATEMENT_EVENT_TYPE: string = 'rm-added-statement'
export const UPDATED_STATEMENT_EVENT_TYPE: string = 'rn-updated-statement'
export const REMOVED_STATEMENT_EVENT_TYPE: string = 'rn-removed-statement'
export const RN_DROPPED_EVENT_TYPE: string = 'rn-dropped'

export type StatementUpdateEventDetails = {
  statementType: string;
  propertyName: string;
  propertyValue: unknown;
  operator: unknown;
  uiId: string;
}