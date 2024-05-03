export const createEvent = (
  eventType: string,
  statementType: string,
  propertyName: string,
  propertyValue: unknown,
  uiId: string,
  operator: string
): CustomEvent => {
  return new CustomEvent(eventType,
    {
      detail: {
        statementType,
        propertyName,
        propertyValue,
        uiId,
        operator
      },
      bubbles: true
    }
  );
}