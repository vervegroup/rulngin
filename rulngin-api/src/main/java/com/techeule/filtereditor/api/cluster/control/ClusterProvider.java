package com.techeule.filtereditor.api.cluster.control;

import com.techeule.filtereditor.api.cluster.entity.Cluster;

import java.util.Set;

public interface ClusterProvider {
  Set<Cluster> getClusters();
}
