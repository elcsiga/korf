"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCommandFoToSend = void 0;
const command_list_generated_1 = require("./command-list-generated");
function prepareCommandFoToSend() {
    command_list_generated_1.commands.forEach((c) => console.log(c.class.prototype));
}
exports.prepareCommandFoToSend = prepareCommandFoToSend;
//# sourceMappingURL=command-manager.js.map