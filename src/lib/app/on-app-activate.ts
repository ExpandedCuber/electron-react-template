import { BrowserWindow } from "electron";
import { onAppReady } from "./on-app-ready";

export function onAppActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    onAppReady();
  }
}
