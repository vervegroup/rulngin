package com.techeule.filtereditor.app.rules.boundary;

import com.techeule.filtereditor.api.rules.entity.RulePolicy;
import com.techeule.filtereditor.app.rules.control.MetadataConverter;
import com.techeule.filtereditor.app.rules.entity.CreateRulePolicyRequest;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("rule/{id}")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "rule", description = "Rule related operations")
@RolesAllowed({"rule"})
public class RuleResource {
  @Inject
  MetadataConverter metadataConverter;

  @Inject
  RuleService ruleService;

  @Inject
  JsonWebToken jsonWebToken;

  @PathParam("id")
  String id;

  @GET
  @RolesAllowed({"rule_get"})
  @Operation(summary = "Fetch a rule by Id", description = "Fetch a rule by Id")
  @APIResponse(responseCode = "200", description = "returns the corresponding rule",
    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = RulePolicy.class)))
  @APIResponse(responseCode = "404", description = "rule is not found")
  public Response get() {
    return ruleService.fetchRulePolicy(id)
      .map(p -> Response.ok(p).build())
      .orElse(Response.status(Response.Status.NOT_FOUND).build());
  }

  @PUT
  @RolesAllowed({"rule_put"})
  @Operation(summary = "Update or create a rule by Id", description = "Update or create a rule by Id")
  @APIResponse(responseCode = "200", description = "returns the corresponding updated/inserted rule",
    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = RulePolicy.class)))
  public Response updateRule(@Valid final CreateRulePolicyRequest request) {
    return Response.ok(
      ruleService.updateRulePolicy(
        getUserId(),
        id,
        metadataConverter.convert(request.metadata()),
        request.statement()
      )
    ).build();
  }

  private String getUserId() {
    return jsonWebToken.getClaim(Claims.email) + " ( " + jsonWebToken.getName() + " ) ";
  }

  @DELETE
  @RolesAllowed({"rule_delete"})
  @Operation(summary = "Delete a rule by Id", description = "Delete a rule by Id")
  @APIResponse(responseCode = "202", description = "returns no content",
    content = @Content(mediaType = MediaType.APPLICATION_JSON))
  public Response delete() {
    ruleService.deleteRulePolicy(id);
    return Response.accepted().build();
  }
}
