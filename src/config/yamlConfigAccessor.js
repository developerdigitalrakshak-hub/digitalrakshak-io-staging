import { load } from 'js-yaml';

// Active configuration cache in memory
let activeConfigInstance = null;

/**
 * Dynamically injects process.env variables into ${VAR_NAME} placeholders
 * @param {Object|Array|String} node 
 * @returns {Object|Array|String} Injected data
 */
export function injectEnvVariables(node) {
  if (typeof node === 'string') {
    return node.replace(/\$\{([^}]+)\}/g, (match, envKey) => {
      return process.env[envKey] !== undefined ? process.env[envKey] : match;
    });
  }

  if (Array.isArray(node)) {
    return node.map((item) => injectEnvVariables(item));
  }

  if (typeof node === 'object' && node !== null) {
    const injectedObj = {};
    for (const key in node) {
      if (Object.prototype.hasOwnProperty.call(node, key)) {
        injectedObj[key] = injectEnvVariables(node[key]);
      }
    }
    return injectedObj;
  }

  return node;
}

/**
 * Loads /config/api.config.yml dynamically from public directory without static fallback code
 */
export async function fetchAndInjectYamlConfig() {
  if (activeConfigInstance) {
    return activeConfigInstance;
  }

  try {
    let yamlString = '';

    if (typeof window !== 'undefined') {
      const response = await fetch('/config/api.config.yml');
      if (response.ok) {
        yamlString = await response.text();
      }
    } else {
      const fs = await import('fs');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'config', 'api.config.yml');
      if (fs.existsSync(filePath)) {
        yamlString = fs.readFileSync(filePath, 'utf8');
      }
    }

    if (yamlString) {
      const parsedYaml = load(yamlString);
      activeConfigInstance = injectEnvVariables(parsedYaml);
      return activeConfigInstance;
    }
  } catch (error) {
    console.error('Failed to load /config/api.config.yml:', error.message);
  }

  return activeConfigInstance || {};
}

// Initializing configuration immediately on server load
if (typeof window === 'undefined') {
  fetchAndInjectYamlConfig();
}

/**
 * Accessor function retrieving values by dot-notation key path
 * Example: getConfig('api.baseUrl')
 */
export function getConfig(keyPath, defaultValue = null) {
  const current = activeConfigInstance || {};

  if (!keyPath) return current;

  const keys = keyPath.split('.');
  let target = current;

  for (const key of keys) {
    if (target && Object.prototype.hasOwnProperty.call(target, key)) {
      target = target[key];
    } else {
      return defaultValue;
    }
  }

  return target !== undefined && target !== null ? target : defaultValue;
}

export function getApiBaseUrl() {
  return getConfig('api.baseUrl', process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com');
}

export function getApiTimeout() {
  const timeoutVal = getConfig('api.timeout', process.env.NEXT_PUBLIC_API_TIMEOUT || '15000');
  return parseInt(timeoutVal, 10);
}

export function getApiHeaders() {
  return getConfig('api.headers', {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
}
