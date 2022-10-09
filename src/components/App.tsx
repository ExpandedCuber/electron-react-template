import { FC } from "react";
import { useConfigStore } from "../hooks/useConfigStore";

export const App: FC = () => {
  const { configStore } = useConfigStore();

  return (
    <div>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <pre>
        <code>{JSON.stringify(configStore, null, 4)}</code>
      </pre>
      <button onClick={() => window.Main.sendConfigStore({ hello: "💖" })}>
        Send
      </button>
    </div>
  );
};
