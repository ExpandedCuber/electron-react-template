import {
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
  Tray,
} from "electron";
import { resolve } from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class MainWindow {
  _instance: BrowserWindow | null = null;

  /**
   * Creates a context menu.
   */
  private _createContextMenu(icon: string, smallIcon: string) {
    const tray = new Tray(icon);
    const template: MenuItemConstructorOptions[] = [
      {
        icon: smallIcon,
        label: "ljtech",
        enabled: false,
      },
      { type: "separator" },
      {
        label: "Toggle Context Menu",
        click: () => this.toggleMenuBar(),
      },
      {
        label: "Toggle DevTools",
        click: () => this.toggleDevTools(),
      },
      { type: "separator" },
      {
        label: "Exit",
        click: () => this.close(),
      },
    ];
    const menu = Menu.buildFromTemplate(template);
    tray.setContextMenu(menu);
  }

  /**
   * Try to open the window.
   */
  open() {
    const icon = resolve(__dirname, "main_window", "icon.ico");
    const smallIcon = resolve(__dirname, "main_window", "small-icon.png");
    const options = {
      height: 600,
      width: 800,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      icon: icon,
    };

    this._instance = new BrowserWindow(options);
    this._instance.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    this._createContextMenu(icon, smallIcon);
  }

  /**
   * Try to close the window.
   */
  close() {
    if (this._instance.closable) {
      this._instance.close();
    }
    this._instance = null;
  }

  /**
   * Toggles the menu bar.
   */
  toggleMenuBar() {
    this._instance.setMenuBarVisibility(!this._instance.menuBarVisible);
  }

  /**
   * Toggles the developer tools.
   */
  toggleDevTools() {
    this._instance.webContents.toggleDevTools();
  }

  send(channel: string, ...args: any[]) {
    this._instance.webContents.send(channel, ...args);
  }
}

export const mainWindow = new MainWindow();
