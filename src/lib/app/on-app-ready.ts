import { configStore } from "../ConfigStore";
import { mainWindow } from "../MainWindow";

export function onAppReady() {
  mainWindow.open();
  mainWindow.toggleMenuBar();
  mainWindow.toggleDevTools();
  configStore.init();
  configStore.openInEditor();
}
