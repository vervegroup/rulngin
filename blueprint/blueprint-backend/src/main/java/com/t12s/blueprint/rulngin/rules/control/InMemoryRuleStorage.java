package com.t12s.blueprint.rulngin.rules.control;

import com.techeule.filtereditor.api.rules.control.RuleStorage;
import com.techeule.filtereditor.api.rules.entity.RulePolicy;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class InMemoryRuleStorage implements RuleStorage {
  private final Map<String, RulePolicy> dbRulePolicyMap = new HashMap<>();

  @Override
  public RulePolicy create(RulePolicy rulePolicy) {
    final var id = UUID.randomUUID().toString();
    final var newRulePolicy = new RulePolicy(id,
      rulePolicy.metadata(),
      rulePolicy.statement()
    );
    dbRulePolicyMap.put(id, newRulePolicy);
    return newRulePolicy;
  }

  @Override
  public RulePolicy createOrUpdate(RulePolicy rulePolicy) {
    if (rulePolicy.id() == null) {
      return create(rulePolicy);
    }
    dbRulePolicyMap.put(rulePolicy.id(), rulePolicy);
    return rulePolicy;
  }

  @Override
  public Optional<RulePolicy> findById(String rulePolicyId) {
    return Optional.ofNullable(dbRulePolicyMap.get(rulePolicyId));
  }

  @Override
  public void deleteById(String rulePolicyId) {
    dbRulePolicyMap.remove(rulePolicyId);
  }

  @Override
  public List<RulePolicy> fetchAll() {
    return List.copyOf(dbRulePolicyMap.values());
  }
}
