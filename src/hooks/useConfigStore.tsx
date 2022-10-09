import { IpcRendererEvent } from "electron";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export const initialConfigStoreProps: ConfigStoreProps = {
  lorem: "Loading...",
  hello: "Loading...",
};

export const ConfigStoreContext = createContext<{
  configStore: ConfigStoreProps;
  setConfigStore: Dispatch<SetStateAction<ConfigStoreProps>>;
}>({ configStore: initialConfigStoreProps, setConfigStore: () => null });

function updateConfigStore(
  currentConfigStore: ConfigStoreProps,
  partialConfigStore: Partial<ConfigStoreProps>
): ConfigStoreProps {
  return { ...currentConfigStore, ...partialConfigStore };
}

export const useConfigStore = () => {
  const { configStore, setConfigStore } = useContext(ConfigStoreContext);

  function handleConfigStoreResponse(
    _event: IpcRendererEvent,
    partialConfigStore: Partial<ConfigStoreProps>
  ) {
    setConfigStore((currentData) =>
      updateConfigStore(currentData, partialConfigStore)
    );
  }

  function onAppStart() {
    window.Main.onConfigStoreResponse(handleConfigStoreResponse);
    window.Main.invokeConfigStore();
  }

  useEffect(onAppStart, []);

  return { configStore, setConfigStore };
};

export const ConfigStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [configStore, setConfigStore] = useState(initialConfigStoreProps);

  return (
    <ConfigStoreContext.Provider value={{ configStore, setConfigStore }}>
      {children}
    </ConfigStoreContext.Provider>
  );
};
