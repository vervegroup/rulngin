package com.techeule.filtereditor.app.rules.control;

import com.techeule.filtereditor.api.cluster.control.ClusterProvider;
import com.techeule.filtereditor.api.cluster.entity.Cluster;
import com.techeule.filtereditor.api.rules.entity.PolicyMetadata;
import com.techeule.filtereditor.app.rules.entity.RequestPolicyMetadata;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MetadataConverter {
  @Inject
  ClusterProvider clusterProvider;

  public PolicyMetadata convert(RequestPolicyMetadata metadata) {
    if (metadata == null) {
      return null;
    }

    Cluster cluster = null;
    if (metadata.cluster() != null) {
      cluster = clusterProvider.getClusters().stream()
        .filter(c -> c.id().equals(metadata.cluster()))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Cluster not found: " + metadata.cluster()));
    }


    return new PolicyMetadata(
      metadata.createdByUserId(),
      metadata.createdAt(),
      metadata.modifiedByUserId(),
      metadata.modifiedAt(),
      cluster,
      metadata.name(),
      metadata.note(),
      metadata.status()
    );
  }
}
