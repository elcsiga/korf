
import express from 'express';
import expressWs from 'express-ws';
import path from 'path';

import {
    initialAppState,
} from '../../korf-ui/src/shared/types';

import { commands } from '../../korf-ui/src/shared/commands/command-list-generated';
import { save, load } from './storage';
import { Command } from '../../korf-ui/src/shared/commands/command-manager';

const { app, getWss } = expressWs(express());
const port = process.env.PORT || 3000;
app.set("port", port);

app.use(express.static('dist/public', {
    setHeaders: function (res, path) {
        res.set("korf-port", `${port}`);
    }
}));

let appState = initialAppState;
load((loadedState) => appState = {...initialAppState, ...loadedState});
let saveRequired = false;
setInterval(() => {
    if (saveRequired) {
        save(appState);
    }
    saveRequired = false;
}, 5000);

app.ws('/ws', (ws, req) => {
    const sendStateToAll = () => {
        getWss().clients.forEach((clientWs) => {
            clientWs.send(JSON.stringify(appState));
        });
        saveRequired = true;
    }

    ws.on('message', (message: string) => {
        try {
            const command: Command = JSON.parse(message);
            const descriptor = commands.find((desc) => desc.name === command.type);
            if (descriptor) {
                console.log('Processing command:', command.type, descriptor.class);
                try {
                    appState = descriptor.class.prototype.reduce.call(command, appState);
                } catch (e) {
                    console.log('Failed to execute command:', command, appState);
                }
            } else {
                console.log('Unknown command:', command);
            }
            sendStateToAll();
        } catch (e) {
            console.log('Failed to process commend', message, e);
        }
    });

    ws.on('close', function () {
        appState.workstations = [];
        console.log('Disconnected.');
        sendStateToAll();
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
})

app.listen(port, () => {
    console.log(`korf is listening at http://localhost:${port}`)
});
