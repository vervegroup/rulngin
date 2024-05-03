package com.techeule.filtereditor.api.rules.entity.property;

public final class DurationPropertyStatement extends IntegerPropertyStatement {

  @Override
  public PropertyOperator getOperator() {
    return PropertyOperator.PROPERTY_VALUE_IN_RANGE;
  }

  @Override
  public void setOperator(PropertyOperator operator) {
    super.setOperator(PropertyOperator.PROPERTY_VALUE_IN_RANGE);
  }

  @Override
  public boolean isValid() {
    return super.isValid() &&
      PropertyOperator.PROPERTY_VALUE_IN_RANGE == this.operator &&
      this.propertyValues != null &&
      this.propertyValues.size() == 2 &&
      this.propertyValues.get(0) <= this.propertyValues.get(1);
  }
}
