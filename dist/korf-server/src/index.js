"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const types_1 = require("../../korf-ui/src/shared/types");
const command_list_generated_1 = require("../../korf-ui/src/shared/commands/command-list-generated");
const storage_1 = require("./storage");
const { app, getWss } = (0, express_ws_1.default)((0, express_1.default)());
const port = process.env.PORT || 3000;
app.set("port", port);
app.use(express_1.default.static('dist/public', {
    setHeaders: function (res, path) {
        res.set("korf-port", `${port}`);
    }
}));
let appState = types_1.initialAppState;
(0, storage_1.load)((s) => appState = s);
let saveRequired = false;
setInterval(() => {
    if (saveRequired) {
        (0, storage_1.save)(appState);
    }
    saveRequired = false;
}, 5000);
app.ws('/ws', (ws, req) => {
    const sendStateToAll = () => {
        getWss().clients.forEach((clientWs) => {
            clientWs.send(JSON.stringify(appState));
        });
        saveRequired = true;
    };
    ws.on('message', (message) => {
        try {
            const command = JSON.parse(message);
            const descriptor = command_list_generated_1.commands.find((desc) => desc.name === command.type);
            if (descriptor) {
                console.log('Processing command:', command.type, descriptor.class);
                try {
                    appState = descriptor.class.prototype.reduce.call(command, appState);
                }
                catch (e) {
                    console.log('Failed to execute command:', command, appState);
                }
            }
            else {
                console.log('Unknown command:', command);
            }
            sendStateToAll();
        }
        catch (e) {
            console.log('Failed to process commend', message, e);
        }
    });
    ws.on('close', function () {
        appState.workstations = [];
        console.log('Disconnected.');
        sendStateToAll();
    });
});
app.get('/**', function (req, res) {
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`korf is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map