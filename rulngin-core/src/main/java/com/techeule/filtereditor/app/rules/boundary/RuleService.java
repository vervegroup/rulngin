package com.techeule.filtereditor.app.rules.boundary;

import com.techeule.filtereditor.api.rules.control.RuleStorage;
import com.techeule.filtereditor.api.rules.entity.PolicyMetadata;
import com.techeule.filtereditor.api.rules.entity.RulePolicy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class RuleService {

  @Inject
  RuleStorage ruleStorage;

  public RulePolicy createRulePolicy(
    final String userId,
    final PolicyMetadata policyMetadata,
    final Map<String, ?> statement
  ) {
    final var now = Instant.now();
    final var npm = new PolicyMetadata(
      userId,
      now.toString(),
      userId,
      now.toString(),
      policyMetadata.cluster(),
      policyMetadata.name(),
      policyMetadata.note(),
      policyMetadata.status()
    );
    RulePolicy rulePolicy = new RulePolicy(
      null,
      npm,
      statement);
    return ruleStorage.createOrUpdate(rulePolicy);
  }

  public RulePolicy updateRulePolicy(final String userId,
                                     final String rulePolicyId,
                                     final PolicyMetadata policyMetadata,
                                     final Map<String, ?> statement) {
    final var now = Instant.now();
    final var npm = new PolicyMetadata(
      policyMetadata.createdByUserId(),
      policyMetadata.createdAt(),
      userId,
      now.toString(),
      policyMetadata.cluster(),
      policyMetadata.name(),
      policyMetadata.note(),
      policyMetadata.status()
    );
    RulePolicy rulePolicy = new RulePolicy(
      rulePolicyId,
      npm,
      statement);
    return ruleStorage.createOrUpdate(rulePolicy);
  }

  public Optional<RulePolicy> fetchRulePolicy(final String rulePolicyId) {
    return ruleStorage.findById(rulePolicyId);
  }

  public void deleteRulePolicy(final String rulePolicyId) {
    ruleStorage.deleteById(rulePolicyId);
  }

  public List<RulePolicy> getAll() {
    return ruleStorage.fetchAll();
  }

}
