import type { ServerCapabilities } from '@modelcontextprotocol/sdk';
import type { ServerStatus, ExecResult } from './types';

export interface ServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
  workingDir?: string;
}

export interface ServerOptions {
  capabilities?: string[];
  env?: Record<string, string>;
}

export interface Container {
  id: string;
  name: string;
  status: ServerStatus;
  start(): Promise<void>;
  stop(): Promise<void>;
  exec(command: string): Promise<ExecResult>;
}

export interface ContainerManager {
  createContainer(name: string, config: ContainerConfig): Promise<Container>;
  removeContainer(name: string): Promise<void>;
  listContainers(): Promise<Container[]>;
}

export interface ContainerConfig {
  image: string;
  command: string;
  args?: string[];
  env?: Record<string, string>;
  workingDir?: string;
}

export interface IMcpServer {
  getName(): string;
  getConfig(): ServerConfig;
  start(): Promise<void>;
  stop(): Promise<void>;
  isActive(): boolean;
  getStatus(): ServerStatus;
  getContainer(): Container | undefined;
  setContainer(container: Container): void;
}

export interface IMcpClient {
  processMessage(message: string): Promise<string>;
  sendRequest(request: unknown): Promise<unknown>;
}

export interface ILLMProvider {
  sendRequest(payload: unknown): Promise<unknown>;
  getResponse(): Promise<unknown>;
}

export interface IMcpConfig {
  getConfig(): IMcpConfig;
  updateServerConfig(serverName: string, newConfig: ServerConfig): Promise<void>;
  addServer(serverName: string, config: ServerConfig): Promise<void>;
  removeServer(serverName: string): Promise<void>;
  getServerConfig(serverName: string): ServerConfig | undefined;
  getAllServers(): Array<{ name: string; config: ServerConfig }>;
} 