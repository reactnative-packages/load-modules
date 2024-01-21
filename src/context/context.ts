import { createContext } from "react";
import { ContextType } from "./props";

export const ModuleContext = createContext<ContextType>({} as ContextType);
