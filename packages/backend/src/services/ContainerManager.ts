import { window } from '@podman-desktop/api';
import type { Container, ContainerConfig, ContainerManager, ServerStatus } from '@podman-desktop-mcp/shared';

export class PodmanContainerManager implements ContainerManager {
  private containers: Map<string, Container> = new Map();

  async createContainer(name: string, config: ContainerConfig): Promise<Container> {
    try {
      const container: Container = {
        id: `mcp-${name}`,
        name,
        status: 'STOPPED',
        start: async () => {
          const existingContainer = this.containers.get(name);
          if (existingContainer) {
            existingContainer.status = 'RUNNING';
          }
        },
        stop: async () => {
          const existingContainer = this.containers.get(name);
          if (existingContainer) {
            existingContainer.status = 'STOPPED';
          }
        },
        exec: async (command: string) => {
          return {
            exitCode: 0,
            stdout: '',
            stderr: ''
          };
        }
      };

      this.containers.set(name, container);
      return container;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to create container: ${errorMessage}`);
    }
  }

  async removeContainer(name: string): Promise<void> {
    const container = this.containers.get(name);
    if (container) {
      await container.stop();
      this.containers.delete(name);
    }
  }

  async listContainers(): Promise<Container[]> {
    return Array.from(this.containers.values());
  }

  async getContainer(name: string): Promise<Container | undefined> {
    return this.containers.get(name);
  }

  async startServer(serverName: string): Promise<Container | undefined> {
    try {
      const container = await this.createContainer(serverName, {
        image: 'mcp-server:latest',
        command: 'mcp-server',
        args: ['--name', serverName]
      });

      await container.start();
      return container;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      window.showErrorMessage(`Failed to start server container: ${errorMessage}`);
      return undefined;
    }
  }

  async stopServer(serverName: string): Promise<void> {
    const container = this.containers.get(serverName);
    if (container) {
      await container.stop();
      this.containers.delete(serverName);
    }
  }

  getAllContainers(): Container[] {
    return Array.from(this.containers.values());
  }
} 