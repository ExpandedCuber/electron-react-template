import { app, ipcMain as ipc } from "electron";
import { onAppActivate } from "./lib/app/on-app-activate";
import { onAppReady } from "./lib/app/on-app-ready";
import { onWindowAllClosed } from "./lib/app/on-window-all-closed";
import {
  invokeConfigStore,
  sendConfigStore,
} from "./lib/ipc/data/get-config-store";

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", onAppReady);
app.on("window-all-closed", onWindowAllClosed);
app.on("activate", onAppActivate);

ipc.on("send-config-store", sendConfigStore);
ipc.handle("invoke-config-store", invokeConfigStore);
