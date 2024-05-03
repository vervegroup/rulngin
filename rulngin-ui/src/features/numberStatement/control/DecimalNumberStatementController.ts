import {NumberPropertyStatement} from "../entity/NumberPropertyStatement.ts";
import {html} from "lit";
import {getNumberValueRange, NumberStatementController} from "./NumberStatementController.ts";

const supportedTypes = ['DecimalPropertyStatement', 'ProbabilisticPropertyStatement'];

export class DecimalNumberStatementController extends NumberStatementController {

  constructor(numberPropertyStatement: 'DecimalPropertyStatement' | 'ProbabilisticPropertyStatement') {
    if (!(supportedTypes.includes(numberPropertyStatement))) {
      throw Error(`Only the following types: ${supportedTypes} are supported, but got ${numberPropertyStatement}`)
    }
    super(numberPropertyStatement);
  }

  createUIElement(statement: NumberPropertyStatement, additionalSettings: Record<string, unknown>): unknown {
    if (statement.statementType !== this._statementType) {
      throw new Error(`Invalid Statement Type. Expected '${this._statementType}'. Got '${statement.statementType}' instead.`)
    }

    return html`
      <rn-statement-number
        .statementType=${statement.statementType}
        .propertyType=${this._statementType}
        .propertyName=${statement.propertyName}
        .propertyValue=${statement.propertyValue}
        .operatorType=${statement.operator}
        .operatorsAvailable=${this._getOperatorsAvailable()}
        ?editable=${additionalSettings.editable ?? true}
        ?isInteger=${false}
        .valueRange=${additionalSettings.valueRange ?? getNumberValueRange(statement.statementType)}
        .hasPropertyKey=${additionalSettings.hasPropertyKey ?? true}
        ui-id="${(statement.uiId ?? additionalSettings.uiId) ?? self.crypto.randomUUID().toLowerCase()}"></rn-statement-number>
    `;
  }
}


const decimalNumberStatementController: DecimalNumberStatementController = new DecimalNumberStatementController('DecimalPropertyStatement')

export default decimalNumberStatementController;
