package com.techeule.filtereditor.api.rules.entity;

import jakarta.json.JsonObject;

public record PropertyStatement(
  String statementType,
  String uiId,
  String propertyName,
  JsonObject propertyValue
) {
}
