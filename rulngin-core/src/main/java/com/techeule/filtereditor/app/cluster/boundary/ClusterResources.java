package com.techeule.filtereditor.app.cluster.boundary;

import com.techeule.filtereditor.api.cluster.control.ClusterProvider;
import com.techeule.filtereditor.api.cluster.entity.Cluster;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("clusters")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ClusterResources {
  @Inject
  ClusterProvider clusterProvider;

  @GET
  @RolesAllowed({"cluster_list"})
  @Operation(summary = "Fetch all Clusters", description = "Fetch all Clusters")
  @APIResponse(responseCode = "200", description = "clusters found", content = @Content(
    schema = @Schema(type = SchemaType.ARRAY, implementation = Cluster.class)
  ))
  @Tag(name = "clusters", description = "Cluster related operations")
  public Response getAll() {
    return Response.ok(clusterProvider.getClusters()).build();
  }

}
