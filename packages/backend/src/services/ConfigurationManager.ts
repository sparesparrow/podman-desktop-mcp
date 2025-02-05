import { window } from '@podman-desktop/api';
import type { IMcpConfig, ServerConfig } from '@podman-desktop-mcp/shared';

export class ConfigurationManager implements IMcpConfig {
  private servers: Map<string, ServerConfig> = new Map();

  async initialize(): Promise<void> {
    // TODO: Load configuration from storage
  }

  getConfig(): IMcpConfig {
    return this;
  }

  async updateServerConfig(serverName: string, newConfig: ServerConfig): Promise<void> {
    if (!this.servers.has(serverName)) {
      throw new Error(`Server '${serverName}' not found`);
    }
    this.servers.set(serverName, newConfig);
    // TODO: Persist configuration
  }

  async addServer(serverName: string, config: ServerConfig): Promise<void> {
    if (this.servers.has(serverName)) {
      throw new Error(`Server '${serverName}' already exists`);
    }
    this.servers.set(serverName, config);
    // TODO: Persist configuration
  }

  async removeServer(serverName: string): Promise<void> {
    if (!this.servers.has(serverName)) {
      throw new Error(`Server '${serverName}' not found`);
    }
    this.servers.delete(serverName);
    // TODO: Persist configuration
  }

  getServerConfig(serverName: string): ServerConfig | undefined {
    return this.servers.get(serverName);
  }

  getAllServers(): Array<{ name: string; config: ServerConfig }> {
    return Array.from(this.servers.entries()).map(([name, config]) => ({ name, config }));
  }
} 