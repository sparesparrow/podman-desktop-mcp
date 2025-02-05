import type { ServerCapabilities } from '@modelcontextprotocol/sdk';

export type ServerStatus = 'STARTING' | 'RUNNING' | 'STOPPING' | 'STOPPED' | 'ERROR';

export type LLMRequest = {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  model?: string;
};

export type LLMResponse = {
  content: string;
  role: 'assistant';
  metadata?: Record<string, unknown>;
};

export type ExecResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

export type ServerInfo = {
  name: string;
  status: ServerStatus;
  capabilities?: ServerCapabilities;
}; 