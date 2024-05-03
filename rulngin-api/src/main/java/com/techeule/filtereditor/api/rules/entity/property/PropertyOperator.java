package com.techeule.filtereditor.api.rules.entity.property;

public enum PropertyOperator {
  PROPERTY_EXISTS,
  PROPERTY_VALUE_EQUALS,
  PROPERTY_VALUE_IN_COLLECTION,
  PROPERTY_VALUE_IN_RANGE;

  public boolean isValid(PropertyStatement<?> propertyStatement) {

    switch (this) {
      case PROPERTY_EXISTS -> {
        return propertyNameIsNotBlank(propertyStatement);
      }
      case PROPERTY_VALUE_EQUALS -> {
        final var propNameIsValid = propertyNameIsNotBlank(propertyStatement);
        final var values = propertyStatement.getPropertyValues();
        return propNameIsValid && values != null && values.size() == 1;
      }
      case PROPERTY_VALUE_IN_COLLECTION -> {
        final var propNameIsValid = propertyNameIsNotBlank(propertyStatement);
        final var values = propertyStatement.getPropertyValues();
        return propNameIsValid && values != null && !values.isEmpty();
      }
      case PROPERTY_VALUE_IN_RANGE -> {
        final var propNameIsValid = propertyNameIsNotBlank(propertyStatement);
        final var values = propertyStatement.getPropertyValues();
        return propNameIsValid && values != null && values.size() == 2 && values.getFirst() != values.getLast();
      }
    }
    return false;
  }

  private static boolean propertyNameIsNotBlank(PropertyStatement<?> propertyStatement) {
    final var propertyName = propertyStatement.getPropertyName();
    return propertyName != null && !propertyName.isBlank();
  }
}
