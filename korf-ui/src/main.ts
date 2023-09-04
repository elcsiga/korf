import "./app.postcss";
import App from "./App.svelte";
import { prepareCommandFoToSend } from "./shared/commands/command-manager";

prepareCommandFoToSend();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
