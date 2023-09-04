import { AppState } from "../../korf-ui/src/shared/types";
import https from 'https';


// UI for storage:
// https://app.jsonstorage.net/items/058b4076-4b91-4eb9-84e8-0664f628b226

const url = 'https://api.jsonstorage.net/v1/json/89488c2c-bc3e-476d-aeb3-424123192c74/058b4076-4b91-4eb9-84e8-0664f628b226?apiKey=cbd93855-d686-4bdc-acae-fb204878eb68';

export function save(data: AppState) {
    const postData = JSON.stringify(data as any);
    var req = https.request(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }, (res) => {
        console.log(res.statusCode === 200 ? 'Save successful.' : 'Save failed.');
    });
    req.on('error', (e) => {
        console.log(`Save failed: ${e.message}`);
    });
    req.write(postData);
    req.end();
}

export function load(callback: (d: AppState) => void) {
    const request = https.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            console.log('Load success.');
            callback(body as AppState);
        });
    })
    request.on('error', (error) => {
        console.log('Load failed:', error);
    });
    request.end()
}


