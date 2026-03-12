import React from 'react'
import {
  ArrayOfPrimitivesInputProps,
  ArrayOfPrimitivesFunctions,
  ArrayInputFunctionsProps,
  ArraySchemaType,
} from 'sanity'

// Helper function to check if a value is a number
const isNumber = (value: any): value is number => typeof value === 'number'

// Helper function to check if validation is an array and has _rules
const hasValidationRules = (
  validation: any
): validation is { _rules: { flag: string; constraint: number }[] }[] =>
  Array.isArray(validation) &&
  validation[0] &&
  Array.isArray(validation[0]._rules)

function ArrayFunctions(
  props: ArrayInputFunctionsProps<string | number | boolean, ArraySchemaType>
) {
  const validationRules = hasValidationRules(props.schemaType.validation)
    ? props.schemaType.validation[0]._rules
    : []

  const max = validationRules.find((rule) => rule.flag === 'max')?.constraint

  const total = props.value?.length || 0

  if (isNumber(max) && total >= max) return null

  return <ArrayOfPrimitivesFunctions {...props} />
}

export const ArrayMaxItems = (props: ArrayOfPrimitivesInputProps) => {
  return props.renderDefault({ ...props, arrayFunctions: ArrayFunctions })
}
