import {DecimalNumberStatementController} from "./DecimalNumberStatementController.ts";
import {Operator} from "../../statement/entity/Statement.ts";

export class ProbabilisticNumberStatementController extends DecimalNumberStatementController {

  protected _getOperatorsAvailable(): Operator[] {
    return [
      {id: 'EQUALS', displayName: 'Equals'}
    ];
  }

  constructor() {
    super('ProbabilisticPropertyStatement');
  }
}


const probabilisticNumberStatementController: ProbabilisticNumberStatementController = new ProbabilisticNumberStatementController()

export default probabilisticNumberStatementController;
