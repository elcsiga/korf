import { derived, readable } from 'svelte/store';

import type { AppState } from '../shared/types';
import { Command, CreateTeamCommand, CreateWorkstationCommand } from '../shared/commands';
import { v4 as uuid } from 'uuid';

const workstationIdStorageKey = 'korf-workstation-id';

let socket: WebSocket;
export function send(data: Command) {
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
        send( new CreateWorkstationCommand( id ));
    });

    return function stop() {
        console.log('DISCONNECT');
        socket.close();
    };
});



