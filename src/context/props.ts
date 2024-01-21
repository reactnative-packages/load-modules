import { StackScreenProps } from "@react-navigation/stack";
import { ReactNode } from "react";

type RetrieveParams = { modules: Modules[]; permissions: string[] };

export type Props = {
  children: ReactNode;
  onRetrieveModules: () => Promise<RetrieveParams>;
  LoadingComponent?: ReactNode;
};

/**
 * Represents the modules that can be dynamically loaded in the application based on the specific permissions of the user.
 */
export type Modules = {
  name: string;
  /**
   * The component must be a stack.
   * @param _ Stack screen props.
   */
  component: (_: StackScreenProps<any>) => JSX.Element | ReactNode;
  permissions: string[];
};

export type ContextType = {
  modules: Modules[];
  updateModules: (modules: Modules[]) => void;
};
