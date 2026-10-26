import { load } from 'js-yaml';

// In-memory cache for parsed YAML configuration
let activeConfigInstance = null;

/**
 * Resolves an environment variable name referenced in the YAML file.
 * The variable must be defined in the environment (process.env); otherwise an error is thrown.
 * No default or fallback values are permitted.
 * @param {string} envKey
 * @returns {string}
 */
function resolveEnvVariable(envKey) {
  let val;

  if (typeof process !== 'undefined' && process.env) {
    val = process.env[envKey];
  }

  if (val === undefined || val === null || val === '') {
    throw new Error(`[Config Error] Environment variable "${envKey}" referenced in api.config.yml is not defined in env file!`);
  }

  return val;
}

/**
 * Injects environment variables into ${VAR_NAME} placeholders defined in YAML.
 * If any referenced variable is missing from env, throws an error.
 * @param {Object|Array|String} node 
 * @returns {Object|Array|String}
 */
export function injectEnvVariables(node) {
  if (typeof node === 'string') {
    return node.replace(/\$\{([^}]+)\}/g, (match, envKey) => {
      return resolveEnvVariable(envKey);
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
 * Loads configuration with strict priority on config/api.config.yml.
 * - On server (SSR): reads and parses config/api.config.yml via fs and resolves env variables.
 * - In browser: reads from window.__YAML_CONFIG__ (injected during SSR in initial HTML).
 * - ZERO network calls are made in the browser.
 */
export function loadYamlConfig(throwOnError = false) {
  if (activeConfigInstance) {
    return activeConfigInstance;
  }

  // Client-side (Browser) environment
  if (typeof window !== 'undefined') {
    if (window.__YAML_CONFIG__) {
      activeConfigInstance = window.__YAML_CONFIG__;
      return activeConfigInstance;
    }

    const configScript = document.getElementById('__YAML_CONFIG__');
    if (configScript && configScript.textContent) {
      try {
        const scriptContent = configScript.textContent.replace(/^window\.__YAML_CONFIG__\s*=\s*/, '').replace(/;$/, '');
        activeConfigInstance = JSON.parse(scriptContent);
        return activeConfigInstance;
      } catch (e) {
        // Continue
      }
    }

    if (throwOnError) {
      throw new Error('[Config Error] Could not load configuration in browser!');
    }
    return null;
  }

  // Server-side (Node.js runtime): reads from private config/api.config.yml
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'config', 'api.config.yml');

    if (!fs.existsSync(filePath)) {
      if (throwOnError) {
        throw new Error(`configuration file is not found`);
      }
      return null;
    }

    const yamlString = fs.readFileSync(filePath, 'utf8');
    if (!yamlString || !yamlString.trim()) {
      if (throwOnError) {
        throw new Error('configuration file is empty!');
      }
      return null;
    }

    const parsedYaml = load(yamlString);
    if (!parsedYaml || typeof parsedYaml !== 'object') {
      if (throwOnError) {
        throw new Error('Failed to parse config file: invalid format!');
      }
      return null;
    }

    activeConfigInstance = injectEnvVariables(parsedYaml);
    return activeConfigInstance;
  } catch (error) {
    if (throwOnError) {
      throw new Error(`[Config Error] Failed to read config file on server: ${error.message}`);
    }
    return null;
  }
}

/**
 * Accessor function retrieving configuration values strictly via dot-notation key path.
 * When required === true (e.g. during an API call), throws if the key is missing or empty.
 * When required === false (e.g. on frontend load), returns undefined safely without crashing the UI.
 * @param {string} keyPath
 * @param {boolean} required
 * @returns {any}
 */
export function getConfig(keyPath, required = false) {
  if (!activeConfigInstance) {
    loadYamlConfig(required);
  }

  if (!keyPath) {
    return activeConfigInstance;
  }

  const current = activeConfigInstance || {};
  const keys = keyPath.split('.');
  let target = current;

  for (const key of keys) {
    if (target && Object.prototype.hasOwnProperty.call(target, key)) {
      target = target[key];
    } else {
      if (required) {
        throw new Error(`[Config Error] Configuration key "${keyPath}" does not exist in config file!`);
      }
      return undefined;
    }
  }

  if (target === undefined || target === null || target === '') {
    if (required) {
      throw new Error(`[Config Error] Configuration value for "${keyPath}" is missing or empty!`);
    }
    return undefined;
  }

  return target;
}

export function getApiBaseUrl(required = false) {
  return getConfig('api.baseUrl', required);
}

export function getApiTimeout(required = false) {
  const timeoutVal = getConfig('api.timeout', required);
  return timeoutVal ? parseInt(timeoutVal, 10) : undefined;
}

export function getApiHeaders(required = false) {
  return getConfig('api.headers', required);
}

export function getApiToken(required = false) {
  return getConfig('api.apiToken', required);
}
