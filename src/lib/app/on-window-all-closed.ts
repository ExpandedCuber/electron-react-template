import { app } from "electron";

export function onWindowAllClosed() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}
