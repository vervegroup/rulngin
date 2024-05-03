package com.techeule.filtereditor.app.rules.entity;

import jakarta.validation.constraints.NotBlank;

public record RequestPolicyMetadata(
  String createdByUserId,
  String createdAt,
  String modifiedByUserId,
  String modifiedAt,
  @NotBlank String cluster,
  @NotBlank String name,
  String note,
  @NotBlank String status
) {
}
