import { useContext } from "react";

import { ModuleContext } from "./context";

export function useModuleContext() {
  const context = useContext(ModuleContext);
  if (!context)
    throw new Error("useModuleContext must be used in ModulesProvider");
  return context;
}
