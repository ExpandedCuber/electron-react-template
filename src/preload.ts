import { contextBridge, ipcRenderer as ipc } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    isRenderer: typeof ipc;
  }
}

const api = {
  invokeConfigStore: () => ipc.invoke("invoke-config-store"),
  onConfigStoreResponse: (callback: IpcCallback) =>
    ipc.on("on-config-store-response", callback),
  sendConfigStore: (partialConfigStore: Partial<ConfigStoreProps>) =>
    ipc.send("send-config-store", partialConfigStore),
};

contextBridge.exposeInMainWorld("Main", api);
