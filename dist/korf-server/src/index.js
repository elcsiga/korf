"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const uuid_1 = require("uuid");
const types_1 = require("../../korf-ui/src/shared/types");
const { app, getWss } = (0, express_ws_1.default)((0, express_1.default)());
const port = process.env.PORT || 3000;
app.set("port", port);
app.use(express_1.default.static('dist/public', {
    setHeaders: function (res, path) {
        res.set("korf-port", `${port}`);
    }
}));
const appState = types_1.initialAppState;
app.ws('/ws', (ws, req) => {
    const sendStateToAll = () => {
        getWss().clients.forEach((clientWs) => {
            clientWs.send(JSON.stringify(appState));
        });
    };
    ws.on('message', (message) => {
        const command = JSON.parse(message);
        switch (command.type) {
            case 'CreateWorkstation': {
                const createWorkstationCommand = command;
                const existingWorkstation = appState.workstations.find((w) => w.id === createWorkstationCommand.id);
                if (existingWorkstation) {
                    console.log('Workstation connected');
                }
                else {
                    console.log('RegisterNew Workstation');
                    const workstation = {
                        id: createWorkstationCommand.id
                    };
                    appState.workstations.push(workstation);
                }
                break;
            }
            case 'CreateTeam': {
                const createTeamCommand = command;
                console.log('Create Team');
                const team = {
                    id: (0, uuid_1.v4)(),
                    name: createTeamCommand.name,
                };
                appState.teams.push(team);
                break;
            }
            default: {
                console.error('Unknown command!');
                break;
            }
        }
        ;
        sendStateToAll();
    });
    ws.on('close', function () {
        //const client = getClient();
        //client.ws = null;
        console.log('Disconnected: '); //, client.clientId);
        sendStateToAll();
    });
});
app.listen(port, () => {
    console.log(`korf is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map