import { IpcMainEvent } from "electron";
import { configStore } from "../../ConfigStore";
import { mainWindow } from "../../MainWindow";

export function sendConfigStore(
  _event: IpcMainEvent,
  partialConfigStore: Partial<ConfigStoreProps>
) {
  configStore.set(partialConfigStore);
  invokeConfigStore();
}

export function invokeConfigStore() {
  const data = configStore.get();
  mainWindow.send("on-config-store-response", data);
}
