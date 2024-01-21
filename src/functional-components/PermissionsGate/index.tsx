import { useModuleContext } from "../../context/useModuleContext";
import { Props } from "./props";

/**
 * Manages permissions for a module
 */
export function PermissionsGate({
  moduleName,
  scope,
  children,
}: Readonly<Props>) {
  const { modules } = useModuleContext();

  const currentModule = modules.find((module) => module.name === moduleName);

  if (!currentModule) {
    console.error(`Module '${moduleName}' not found`);
    return null;
  }

  const { permissions } = currentModule;

  const hasRequiredPermissions = scope.every((permission) =>
    permissions.includes(permission)
  );

  return hasRequiredPermissions ? <>{children}</> : null;
}
