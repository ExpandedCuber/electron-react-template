import Store, { Schema } from "electron-store";
import { initialConfigStoreProps } from "../hooks/useConfigStore";

class ConfigStore {
  private _instance: Store<ConfigStoreProps> | null;

  init() {
    const schema: Schema<ConfigStoreProps> = {
      hello: {
        type: "string",
      },
      lorem: {
        type: "string",
      },
    };

    const options: Store.Options<ConfigStoreProps> = {
      schema: schema,
      defaults: initialConfigStoreProps,
    };

    this._instance = new Store(options);
  }

  /**
   * Delete all items.
   */
  clear() {
    this._instance.clear();
  }

  /**
   * Set an item or multiple items at once.
   */
  set(...args: [partialConfigStore: Partial<ConfigStoreProps>]) {
    this._instance.set(...args);
  }

  /**
   * Get all items.
   */
  get() {
    return this._instance.store;
  }

  /**
   * Opens the storage file in the user's editor.
   */
  openInEditor() {
    this._instance.openInEditor();
  }
}

export const configStore = new ConfigStore();
