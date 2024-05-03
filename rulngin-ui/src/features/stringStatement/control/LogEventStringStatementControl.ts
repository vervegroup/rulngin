import {StringStatementController} from "./StringStatementControl.ts";

class LogEventStringStatementController extends StringStatementController {

  constructor() {
    super('LogEventStringPropertyStatement')
  }

}

const logEventStringStatementController = new LogEventStringStatementController();

export default logEventStringStatementController;