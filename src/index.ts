import { createApp } from "./app";

const PORT = 8080;
const HOST = "0.0.0.0";

createApp().listen(PORT, HOST, () => console.log("Server started"));
