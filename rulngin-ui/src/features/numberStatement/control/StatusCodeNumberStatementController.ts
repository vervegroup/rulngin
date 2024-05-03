import {IntegerNumberStatementController} from "./IntegerNumberStatementController.ts";


export class StatusCodeNumberStatementController extends IntegerNumberStatementController {
  constructor() {
    super('StatusCodePropertyStatement');
  }
}


const statusCodeNumberStatementController: StatusCodeNumberStatementController = new StatusCodeNumberStatementController()

export default statusCodeNumberStatementController;
