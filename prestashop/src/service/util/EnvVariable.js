export function getEnv(name, defaultValue = null) {
    const envs = import.meta.env;
    const value = envs[name];

    return value ?? defaultValue;
}