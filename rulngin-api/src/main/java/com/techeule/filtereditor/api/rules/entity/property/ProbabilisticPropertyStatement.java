package com.techeule.filtereditor.api.rules.entity.property;

public final class ProbabilisticPropertyStatement extends DecimalPropertyStatement {

  @Override
  public String getPropertyName() {
    return "ProbabilisticPropertyStatement";
  }

  @Override
  public void setPropertyName(String propertyName) {
    super.setPropertyName("ProbabilisticPropertyStatement");
  }

  @Override
  public PropertyOperator getOperator() {
    return PropertyOperator.PROPERTY_VALUE_EQUALS;
  }

  @Override
  public void setOperator(PropertyOperator operator) {
    super.setOperator(PropertyOperator.PROPERTY_VALUE_EQUALS);
  }

  @Override
  public boolean isValid() {
    return propertyValues != null &&
      PropertyOperator.PROPERTY_VALUE_EQUALS == operator &&
      propertyValues.size() == 1 &&
      propertyValues.getFirst() >= 0 &&
      propertyValues.getFirst() <= 1;
  }
}
