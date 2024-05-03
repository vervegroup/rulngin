package com.techeule.filtereditor.app.rules.boundary;

import com.techeule.filtereditor.api.rules.entity.RulePolicy;
import com.techeule.filtereditor.app.rules.control.MetadataConverter;
import com.techeule.filtereditor.app.rules.entity.CreateRulePolicyRequest;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.headers.Header;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("rules")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RuleResources {
  @Inject
  RuleService ruleService;

  @Inject
  MetadataConverter metadataConverter;

  @Inject
  JsonWebToken jsonWebToken;

  @Context
  UriInfo info;

  @Context
  UriBuilder uriBuilder;

  @GET
  @RolesAllowed({"rule_list"})
  @Operation(summary = "Fetch all Rules", description = "Fetch all Rules")
  @APIResponse(responseCode = "200", description = "rules found successfully", content = @Content(
    schema = @Schema(type = SchemaType.ARRAY, implementation = RulePolicy.class)
  ))
  @APIResponse(responseCode = "204", description = "No rules could be found")
  @Tag(name = "rules", description = "Rules related operations")
  public Response getAll() {
    return Response.ok(ruleService.getAll()).build();
  }

  @POST
  @RolesAllowed({"rule_create"})
  @Operation(summary = "Create new Rules", description = "Create new Rules")
  @APIResponse(responseCode = "201", description = "created successfully",
    headers = @Header(required = true, name = "Location", description = "The URI at which you can find the newly created rule"))
  @Tag(name = "rule", description = "Rule related operations")
  public Response createRule(@Valid final CreateRulePolicyRequest request) {
    var rulePolicy = ruleService.createRulePolicy(
      getUserId(),
      metadataConverter.convert(request.metadata()),
      request.statement()
    );

    final var uri = info.getBaseUriBuilder().path(RuleResource.class).build(rulePolicy.id());
    return Response.created(uri).build();
  }

  private String getUserId() {
    return jsonWebToken.getClaim(Claims.email) + " ( " + jsonWebToken.getName() + " ) ";
  }
}
