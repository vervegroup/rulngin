package com.techeule.filtereditor.api.rules.entity.property;

public final class BooleanPropertyStatement extends PropertyStatement<Boolean> {

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
    return super.isValid() && this.propertyValues != null && this.propertyValues.size() == 1;
  }
}
