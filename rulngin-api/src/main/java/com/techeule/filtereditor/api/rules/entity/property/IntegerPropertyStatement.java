package com.techeule.filtereditor.api.rules.entity.property;

public sealed class IntegerPropertyStatement extends PropertyStatement<Long> permits DurationPropertyStatement, StatusCodePropertyStatement {
}
