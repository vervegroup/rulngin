export const afterConfigurationFetched = async () => {
  await Promise.all(
    [
      import ('./statement/boundary/StatementSelectorElement.ts'),
      import ('./statement/boundary/StatementDropTargetElement.ts'),
      import ('./statement/boundary/AbstractStatementElement.ts'),
      import ('./booleanStatement/boundary/BooleanPropertyStatementElement.ts'),
      import ('./durationStatement/boundary/DurationPropertyStatementElement.ts'),
      import ('./numberStatement/boundary/NumberPropertyStatementElement.ts'),
      import ('./stringStatement/boundary/StringPropertyStatementElement.ts'),
      import ('./tautologyStatement/boundary/TautologyPropertyStatementElement.ts'),
      import ('./containerStatement/boundary/ContainerStatementElement.ts'),
      import ('./rulePolicyEditor/boundary/PolicyStatementEditor.ts'),
      import ('./rulePolicyEditor/boundary/PolicyMetadataEditor.ts'),
      import ('./rulePolicyEditor/boundary/PolicyEditor.ts'),
      import ('./rulePolicyEditor/boundary/RulePolicyEditorElement.ts'),
      import ('./rulePolicyDashboard/boundary/RulePolicyList.ts'),
      import ('./rulePolicyDashboard/boundary/RulePolicyDashboard.ts')
    ]
  )
}
