import { derived, readable } from 'svelte/store';

import type { AppState } from '../shared/types';
import { type Command, ConnectWorkstationCommand } from '../shared/commands/commands';
import { v4 as uuid } from 'uuid';
import { commands } from '../shared/commands/command-list-generated';

const workstationIdStorageKey = 'korf-workstation-id';

let socket: WebSocket;
export function send(data: Command) {
    commands.forEach((command) => {
        if (data instanceof command.class) {
            data.type = command.name;
        }
    });

    if (socket) {
        console.log('SEND: ', data);
        socket.send(JSON.stringify(data));
    }
}

export const appState = readable<AppState>(null, (set) => {
    const url = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? `ws://localhost:3000/ws`
        : `wss://${window.location.host}/ws`

    socket = new WebSocket(url);
    socket.addEventListener('message', (event) => {
        const state = JSON.parse(event.data);
        console.log('State: ', state);
        set(state);
    });

    socket.addEventListener('open', () => {
        let id = window.sessionStorage.getItem(workstationIdStorageKey);
        if (!id) {
            id = uuid();
            window.sessionStorage.setItem(workstationIdStorageKey, id);
        }
        send(new ConnectWorkstationCommand(id));
    });

    return function stop() {
        console.log('DISCONNECT');
        socket.close();
    };
});



