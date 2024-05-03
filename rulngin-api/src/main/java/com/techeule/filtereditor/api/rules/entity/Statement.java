package com.techeule.filtereditor.api.rules.entity;

import com.techeule.filtereditor.api.rules.entity.property.*;
import jakarta.json.bind.annotation.JsonbSubtype;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.json.bind.annotation.JsonbTypeInfo;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@JsonbTypeInfo(key = "__type", value = {
  @JsonbSubtype(type = BooleanPropertyStatement.class, alias = "BooleanPropertyStatement"),
  @JsonbSubtype(type = ContainerStatement.class, alias = "ContainerStatement"),
  @JsonbSubtype(type = DecimalPropertyStatement.class, alias = "DecimalPropertyStatement"),
  @JsonbSubtype(type = DurationPropertyStatement.class, alias = "DurationPropertyStatement"),
  @JsonbSubtype(type = IntegerPropertyStatement.class, alias = "IntegerPropertyStatement"),
  @JsonbSubtype(type = LogEventStringPropertyStatement.class, alias = "LogEventStringPropertyStatement"),
  @JsonbSubtype(type = ProbabilisticPropertyStatement.class, alias = "ProbabilisticPropertyStatement"),
  @JsonbSubtype(type = StatusCodePropertyStatement.class, alias = "StatusCodePropertyStatement"),
  @JsonbSubtype(type = StringPropertyStatement.class, alias = "StringPropertyStatement"),
  @JsonbSubtype(type = TautologyStatement.class, alias = "TautologyStatement")
})
@Schema(oneOf = {
  BooleanPropertyStatement.class,
  ContainerStatement.class,
  DecimalPropertyStatement.class,
  DurationPropertyStatement.class,
  IntegerPropertyStatement.class,
  LogEventStringPropertyStatement.class,
  ProbabilisticPropertyStatement.class,
  StatusCodePropertyStatement.class,
  StringPropertyStatement.class,
  TautologyStatement.class})
public interface Statement {

  @JsonbTransient
  String getName();

  @JsonbTransient
  boolean isValid();

}
