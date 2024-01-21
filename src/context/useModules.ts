import { useModuleContext } from "./useModuleContext";

/**
 * Retrieves dynamically loaded modules in the application based on the specific permissions of the user.
 */
export function useModules() {
  const { modules } = useModuleContext();
  return modules;
}
