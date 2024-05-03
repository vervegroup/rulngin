package com.techeule.filtereditor.api.rules.entity;

import java.util.List;
import java.util.Objects;

public class ContainerStatement implements Statement {
  private List<Statement> children = List.of();
  private ContainerOperator operator = ContainerOperator.ANY_OF;

  public List<Statement> getChildren() {
    return children;
  }

  public void setChildren(List<Statement> children) {
    if (children == null) {
      throw new IllegalArgumentException("children cannot be null");
    }
    this.children = children;
  }

  public ContainerOperator getOperator() {
    return operator;
  }

  public void setOperator(ContainerOperator operator) {
    if (operator == null) {
      throw new IllegalArgumentException("operator cannot be null");
    }
    this.operator = operator;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ContainerStatement that = (ContainerStatement) o;
    return Objects.equals(children, that.children) && operator == that.operator;
  }

  @Override
  public int hashCode() {
    return Objects.hash(children, operator);
  }

  @Override
  public String toString() {
    return getClass().getSimpleName() + "{" +
      "operator=" + operator +
      ", rules=" + children +
      '}';
  }

  @Override
  public String getName() {
    return operator.name() + ContainerStatement.class.getSimpleName();
  }

  @Override
  public boolean isValid() {

    if (operator == null) {
      return false;
    }

    if (children == null) {
      return false;
    }

    for (final var child : children) {
      if (!child.isValid()) {
        return false;
      }
    }

    return true;
  }
}
