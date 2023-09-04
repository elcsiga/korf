"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports.save = void 0;
const https_1 = __importDefault(require("https"));
// UI for storage:
// https://app.jsonstorage.net/items/058b4076-4b91-4eb9-84e8-0664f628b226
const url = 'https://api.jsonstorage.net/v1/json/89488c2c-bc3e-476d-aeb3-424123192c74/058b4076-4b91-4eb9-84e8-0664f628b226?apiKey=cbd93855-d686-4bdc-acae-fb204878eb68';
function save(data) {
    const postData = JSON.stringify(data);
    var req = https_1.default.request(url, {
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
exports.save = save;
function load(callback) {
    const request = https_1.default.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        response.on('end', () => {
            const body = JSON.parse(data);
            console.log('Load success.');
            callback(body);
        });
    });
    request.on('error', (error) => {
        console.log('Load failed:', error);
    });
    request.end();
}
exports.load = load;
//# sourceMappingURL=storage.js.map