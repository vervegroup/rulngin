package com.techeule.filtereditor.api.rules.control;


import com.techeule.filtereditor.api.rules.entity.RulePolicy;

import java.util.List;
import java.util.Optional;

public interface RuleStorage {
  RulePolicy create(RulePolicy rulePolicy);

  RulePolicy createOrUpdate(RulePolicy rulePolicy);

  Optional<RulePolicy> findById(final String rulePolicyId);

  void deleteById(final String rulePolicyId);

  List<RulePolicy> fetchAll();
}
