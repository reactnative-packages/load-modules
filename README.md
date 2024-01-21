# Load Modules

Load dynamically modules for React Native

Facilitates the management of critical information for dynamic loading of modules, including logic to obtain permissions from the backend and the presentation of a loading indicator to enhance the user experience during that process.

## Getting Started

### Installation

add package

```json
{
  "dependencies": {
    "@reactnative-packages/load-modules": "github:reactnative-packages/load-modules.git#latest"
  }
}
```

## Usage

Wrap your main stack in `ModuleProvider` from `reactnative-packages/load-modules`

```typescript
export function RootStack() {
  return (
    <NavigationContainer>
      <ModuleProvider
        onRetrieveModules={async () => {
          const s = authService(authRepositoryMock(axiosInstance));

          const response = await s.permissions();
          const data = response.data;

          /**
           * Transform fetched data into module objects.
           */
          const newModules = data.map((item) => ({
            name: item.moduleName,
            component: getComponentForModule(item.moduleName),
            permissions: item.permissionsTypes,
          }));

          /**
           * Flatten permissions array for easy access.
           */
          const userPermissions = data.reduce(
            (acc, item) => [...acc, ...item.permissionsTypes],
            [] as string[]
          );

          /**
           * Update state with fetched modules and permissions.
           */
          return { modules: newModules, permissions: userPermissions };
        }}
      >
        <MainStack />
      </ModuleProvider>
    </NavigationContainer>
  );
}
```

### useModules

Exposes dynamically loaded modules in the application based on the specific permissions of the user.

```typescript
const modules = useModules();
```

### Render modules

```typescript
export function MainStack() {
  const modules = useModules();

  return (
    <Stack.Navigator>
      {/* Dynamically render modules */}
      {modules.map((module) => (
        <Stack.Screen
          key={module.name}
          name={module.name}
          component={module.component}
        />
      ))}
      {/* Render other modules that do not require permissions */}
    </Stack.Navigator>
  );
}
```

### PermissionsGate

The wrapper logic will check if the set of permissions assigned to the user matches those required by the component. If there is a match, the component will be rendered.

```typescript
export function TaskList() {
  return (
    <PermissionsGate moduleName="todo" scope={["create"]}>
      <AddTaskButton />
    </PermissionsGate>
  );
}
```

### ModuleProvider Props

| Prop              | Description                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| onRetrieveModules | It retrieves data to map permissions and modules, dynamically loading modules based on the obtained permissions. |
| LoadingComponent  | A component to display while `onRetrieveModules` is in progress                                                  |
