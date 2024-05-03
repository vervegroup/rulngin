package com.techeule.filtereditor.api.rules.entity.property;

import com.techeule.filtereditor.api.rules.entity.Statement;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public abstract sealed class PropertyStatement<T>
  implements Statement
  permits BooleanPropertyStatement, DecimalPropertyStatement, IntegerPropertyStatement, StringPropertyStatement {
  protected PropertyOperator operator = PropertyOperator.PROPERTY_EXISTS;
  protected String propertyName;
  protected List<T> propertyValues;

  public PropertyOperator getOperator() {
    return operator;
  }

  public void setOperator(PropertyOperator operator) {
    if (operator == null) {
      throw new IllegalArgumentException("operator cannot be null");
    }
    this.operator = operator;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    if (propertyName == null) {
      throw new IllegalArgumentException("propertyName cannot be null");
    }
    this.propertyName = propertyName;
  }

  public List<T> getPropertyValues() {
    return propertyValues;
  }

  public void setPropertyValues(List<T> propertyValues) {
    this.propertyValues = Objects.requireNonNullElseGet(propertyValues, List::of);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    PropertyStatement<?> that = (PropertyStatement<?>) o;
    return operator == that.operator && Objects.equals(propertyName, that.propertyName) && Objects.equals(propertyValues, that.propertyValues);
  }

  @Override
  public int hashCode() {
    return Objects.hash(operator, propertyName, propertyValues);
  }

  @Override
  public String toString() {
    return getClass().getSimpleName() + "{" +
      "operator=" + operator +
      ", propertyName='" + propertyName + '\'' +
      ", propertyValues=" + propertyValues +
      '}';
  }

  @Override
  public String getName() {
    return operator.name() + ':' + getClass().getSimpleName();
  }

  @Override
  public boolean isValid() {
    if (propertyName == null || propertyName.isBlank()) {
      return false;
    }

    if (operator == null) {
      return false;
    }

    return operator.isValid(this);
  }

  public List<T> addValue(final T value) {
    final var oldValues = this.getPropertyValues();
    final var values = new ArrayList<T>(oldValues.size() + 1);
    values.addAll(oldValues);
    values.add(value);
    setPropertyValues(List.copyOf(values));
    return oldValues;
  }
}
