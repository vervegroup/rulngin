package com.techeule.filtereditor.api.rules.entity;

import java.util.Map;

public record RulePolicy(
  String id,
  PolicyMetadata metadata,
  Map<String, ?> statement
) {

}
