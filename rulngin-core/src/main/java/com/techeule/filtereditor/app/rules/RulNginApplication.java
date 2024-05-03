package com.techeule.filtereditor.app.rules;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.eclipse.microprofile.auth.LoginConfig;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@OpenAPIDefinition(
  tags = {
    @Tag(name = "rule", description = "Rule related operations"),
    @Tag(name = "rules", description = "Rules related operations")
  },
  info = @Info(
    title = "TechEule - RulNgin - Filter Editor",
    version = "0.0.1",
    contact = @Contact(
      name = "TechEule",
      url = "https://techeule.com",
      email = "email@techeule.com"),
    license = @License(
      name = "Apache 2.0",
      url = "https://www.apache.org/licenses/LICENSE-2.0.html"),
    description = "This API provides endpoints to manage a blog and its posts"
  )
)
@LoginConfig(authMethod = "MP-JWT")
@ApplicationScoped
@ApplicationPath("/api")
public class RulNginApplication extends Application {
}
