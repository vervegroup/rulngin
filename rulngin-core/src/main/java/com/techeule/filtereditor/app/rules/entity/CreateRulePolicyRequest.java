package com.techeule.filtereditor.app.rules.entity;


import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record CreateRulePolicyRequest(
  @NotNull RequestPolicyMetadata metadata,
  @NotNull Map<String, ?> statement
) {
}
