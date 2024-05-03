package com.techeule.filtereditor.api.rules.entity;

import com.techeule.filtereditor.api.cluster.entity.Cluster;

public record PolicyMetadata(
  String createdByUserId,
  String createdAt,
  String modifiedByUserId,
  String modifiedAt,
  Cluster cluster,
  String name,
  String note,
  String status

) {
}
