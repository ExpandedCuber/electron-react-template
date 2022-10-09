import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { ConfigStoreProvider } from "./hooks/useConfigStore";

const container = document.getElementById("root");
const root = createRoot(container as Element);

function main() {
  root.render(
    <ConfigStoreProvider>
      <App />
    </ConfigStoreProvider>
  );
}

main();
