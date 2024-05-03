package com.techeule.filtereditor.api.rules.entity.property;

import com.techeule.filtereditor.api.rules.entity.Statement;

public final class TautologyStatement implements Statement {

  @Override
  public String getName() {
    return TautologyStatement.class.getSimpleName();
  }

  @Override
  public boolean isValid() {
    return true;
  }

  @Override
  public String toString() {
    return TautologyStatement.class.getSimpleName() + "{}";
  }
}
