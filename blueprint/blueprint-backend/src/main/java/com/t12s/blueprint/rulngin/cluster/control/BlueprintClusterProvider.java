package com.t12s.blueprint.rulngin.cluster.control;

import com.techeule.filtereditor.api.cluster.control.ClusterProvider;
import com.techeule.filtereditor.api.cluster.entity.Cluster;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Set;

@ApplicationScoped
public class BlueprintClusterProvider implements ClusterProvider {
  private static final Set<Cluster> clusters = Set.of(
    new Cluster("cluster1", "First Cluster"),
    new Cluster("cluster2", "Second Cluster")
  );

  @Override
  public Set<Cluster> getClusters() {
    return clusters;
  }
}
