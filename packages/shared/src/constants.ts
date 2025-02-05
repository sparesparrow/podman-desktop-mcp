export const DEFAULT_SERVER_IMAGE = 'mcp-server:latest';

export const DEFAULT_SERVER_CONFIG = {
  command: 'mcp-server',
  args: [],
  env: {},
  workingDir: '/app'
};

export const DEFAULT_CAPABILITIES = {
  resources: {
    subscribe: true,
    listChanged: true
  },
  prompts: {
    listChanged: true
  },
  tools: {
    listChanged: true
  },
  logging: {}
}; 