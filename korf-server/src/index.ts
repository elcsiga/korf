
import express from 'express';
import WebSocket from 'ws';
import expressWs from 'express-ws';

import { v4 as uuid } from 'uuid';

import {
    AppState,
    initialAppState,
    Team,
    Workstation
} from '../../korf-ui/src/shared/types';
import {
    Command,
    CreateWorkstationCommand as RegisterWorkstationCommand,
    CreateTeamCommand
} from '../../korf-ui/src/shared/commands';

const { app, getWss } = expressWs(express());
const port = process.env.PORT || 3000;
app.set("port", port);

app.use(express.static('dist/public', {
    setHeaders: function (res, path) {
        res.set("korf-port", `${port}`);
    }
}));

const appState = initialAppState;

app.ws('/ws', (ws, req) => {
    const sendStateToAll = () => {
        getWss().clients.forEach((clientWs) => {
            clientWs.send(JSON.stringify(appState));
        });
    }

    ws.on('message', (message: string) => {
        const command: Command = JSON.parse(message);
        switch (command.type) {
            case 'CreateWorkstation': {
                const createWorkstationCommand = command as RegisterWorkstationCommand;
                const existingWorkstation = appState.workstations.find((w) => w.id === createWorkstationCommand.id);
                if (existingWorkstation) {
                    console.log('Workstation connected');
                } else {
                    console.log('RegisterNew Workstation');
                    const workstation: Workstation = {
                        id: createWorkstationCommand.id
                    }; appState.workstations.push(workstation);
                }
                break;
            }
            case 'CreateTeam': {
                const createTeamCommand = command as CreateTeamCommand;
                console.log('Create Team');
                const team: Team = {
                    id: uuid(),
                    name: createTeamCommand.name,
                }
                appState.teams.push(team);
                break;
            }
            default: {
                console.error('Unknown command!');
                break;
            }
        };
        sendStateToAll();
    });

    ws.on('close', function () {
        //const client = getClient();
        //client.ws = null;
        console.log('Disconnected: ') //, client.clientId);
        sendStateToAll();
    });
});

app.listen(port, () => {
    console.log(`korf is listening at http://localhost:${port}`)
});
