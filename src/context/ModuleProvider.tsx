import { useEffect, useMemo, useState } from "react";
import { ModuleContext } from "./context";
import { Modules, Props } from "./props";

/**
 * ModuleProvider manages data for dynamic module loading within the application.
 * It fetches user permissions and dynamically loads modules based on those permissions.
 */
export function ModuleProvider({
  children,
  LoadingComponent,
  onRetrieveModules,
}: Readonly<Props>) {
  // State to manage the loaded modules, user permissions, and loading status.
  const [modules, setModules] = useState<Modules[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Function to update the loaded modules in the state.
   * @param newModules
   */
  const updateModules = (newModules: Modules[]) => {
    setModules(newModules);
  };

  /**
   * Function to update the user permissions in the state.
   * @param permissions
   */
  const updateUserPermissions = (permissions: string[]) => {
    setUserPermissions(permissions);
  };

  /**
   * Effect to fetch user permissions and dynamically load modules on component mount.
   */
  useEffect(() => {
    setLoading(true);
    onRetrieveModules()
      .then((newValues) => {
        updateModules(newValues.modules);
        updateUserPermissions(newValues.permissions);
      })
      .catch((error) => {
        console.error("Error fetching module data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Memoized values for optimization.
   */
  const memoizedValues = useMemo(
    () => ({ modules, loading, updateModules, userPermissions }),
    [modules, userPermissions]
  );

  /**
   * Provide memoized values through context to child components.
   */
  return (
    <ModuleContext.Provider value={memoizedValues}>
      {loading ? LoadingComponent ?? null : children}
    </ModuleContext.Provider>
  );
}
