
import express from 'express';
import WebSocket from 'ws';
import expressWs from 'express-ws';

import { v4 as uuid } from 'uuid';

//import { ApplyCommand, Command, ConnectCommand, GameReport, GameState, Player, SendSheetsCommand } from '../ui/src/shared/types';
//import { gameConfig } from '../../korf-ui/src/shared/config';
//import { areGroupsSetUp, areSheetsReady, clearGroups, shuffleGroups } from '../ui/src/shared/utilities';

const { app, getWss } = expressWs(express());
const port = process.env.PORT || 3000;
app.set("port", port);

app.use(express.static('dist/public', {
    setHeaders: function (res, path) {
        res.set("korf-port", `${port}`);
    }
}));

// const gameState: GameState = {
//     status: 'GATHERING',
//     clients: []
// };

app.ws('/ws', (ws, req) => {
    // const getClient = () => gameState.clients.find((client) => client.ws === ws);
    // const getPlayers = () => gameState.clients
    //     .filter((client) => client.player)
    //     .map((client) => client.player);
     const sendReportToAll = () => {
         getWss().clients.forEach((clientWs) => {
    //         const { status, clients } = gameState;
    //         const myClient = clients.find((client) => client.ws === clientWs);
    //         if (myClient && clientWs.readyState === WebSocket.OPEN) {
    //             const playerClients = clients.filter((client) => client.player);
    //             const myIndex = playerClients.findIndex((client) => client.ws === clientWs);
    //             const players = playerClients.map((client, index) => ({
    //                 ...client.player,
    //                 connected: !!client.ws,
    //                 // encode famousPeople of other players
    //                 sheets: index === myIndex ? client.player.sheets : client.player.sheets.map(() => '***')
    //             }));
    //             const numOfClients = clients.length;
    //             const myClientId = myClient.clientId;
    //             const report: GameReport = { status, myIndex, myClientId, players, numOfClients };
                 clientWs.send(JSON.stringify('report'));
    //         } else {
    //             console.error('Could not find my client');
    //         }
         });
    }

    ws.on('message', (message: string) => {
        // const data: Command = JSON.parse(message);
        // switch (data.command) {
        //     case 'goToGathering': {
        //         console.log('Go to Gathering');
        //         gameState.status = 'GATHERING';
        //         break;
        //     }
        //     case 'connect': {
        //         const connectCommend = data as ConnectCommand;
        //         if (connectCommend.clientId) {
        //             const existingClient = gameState.clients.find(client => client.clientId === connectCommend.clientId && !client.ws);
        //             if (existingClient) {
        //                 // reconnect existing session
        //                 existingClient.ws = ws;
        //                 console.log('Reconnected: ', existingClient.clientId);
        //                 break;
        //             }
        //         }
        //         const clientId = uuid();
        //         gameState.clients.push({ ws, clientId });
        //         console.log('Connected: ', clientId);
        //         break;
        //     }
        //     case 'apply': {
        //         const client = getClient();
        //         if (gameState.status === 'GATHERING' && client && !client.player) {
        //             const applyCommand = data as ApplyCommand;
        //             const { name } = applyCommand;
        //             client.player = { name, sheets: [], ord: -1 };
        //             console.log('Applied: ', client.player);
        //             clearGroups(getPlayers());
        //         }
        //         break;
        //     }
        //     case 'quit': {
        //         const client = getClient();
        //         if (gameState.status === 'GATHERING' && client && client.player) {
        //             console.log('Quit: ', client.player.name);
        //             client.player = null;
        //             clearGroups(getPlayers());
        //         }
        //         break;
        //     }
        //     case 'quitNotConnectedPlayers': {
        //         if (gameState.status === 'GATHERING') {
        //             let found = false;
        //             gameState.clients
        //                 .filter((client) => client.player && !client.ws)
        //                 .forEach((client) => {
        //                     console.log('Force quit: ', client.player.name);
        //                     client.player = null;
        //                     found = true;
        //                 });

        //             if (found) {
        //                 clearGroups(getPlayers());
        //             }
        //         }
        //         break;
        //     }
        //     case 'sendSheets': {
        //         const client = getClient();
        //         if (gameState.status === 'GATHERING' && client && client.player) {
        //             const sendSheetsCommand = data as SendSheetsCommand;
        //             const { sheets } = sendSheetsCommand;
        //             client.player.sheets = sheets;
        //             console.log('Sheets added: ', client.player.sheets);
        //         }
        //         break;
        //     }
        //     case 'goToGrouping': {
        //         const players = getPlayers();
        //         if (gameState.status === 'GATHERING'
        //             && players.length >= gameConfig.numOfPlayers.min
        //             && players.length <= gameConfig.numOfPlayers.max
        //             && players.every((p) => areSheetsReady(p))
        //         ) {
        //             console.log('Start grouping');
        //             gameState.status = 'GROUPING';
        //         }
        //         break;
        //     }
        //     case 'shuffleGroups': {
        //         if (gameState.status === 'GROUPING') {
        //             const players = getPlayers();
        //             shuffleGroups(players);
        //             console.log('Shuffle groups');
        //         }
        //         break;
        //     }
        //     case 'clearGroups': {
        //         if (gameState.status === 'GROUPING') {
        //             const players = getPlayers();
        //             clearGroups(players);
        //             console.log('Clear groups');
        //         }
        //         break;
        //     }
        //     case 'goToQuiz': {
        //         const players = getPlayers();
        //         if (gameState.status === 'GROUPING'
        //             && players.every((p) => areGroupsSetUp(p))
        //         ) {
        //             console.log('Start quiz');
        //             gameState.status = 'QUIZ';
        //         }
        //         break;
        //     }
        //     case 'goToResults': {
        //         if (gameState.status === 'QUIZ') {
        //             console.log('Results');
        //             gameState.status = 'RESULTS';
        //         }
        //         break;
        //     }
        //     default:
        // };
        sendReportToAll();
    });

    ws.on('close', function () {
        //const client = getClient();
        //client.ws = null;
        console.log('Disconnected: ') //, client.clientId);
        sendReportToAll();
    });
});

app.listen(port, () => {
    console.log(`famous-people is listening at http://localhost:${port}`)
});
