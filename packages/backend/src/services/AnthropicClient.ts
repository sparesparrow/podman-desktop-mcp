import { window } from '@podman-desktop/api';
import type { ILLMProvider, LLMRequest, LLMResponse } from '@podman-desktop-mcp/shared';

export class AnthropicClient implements ILLMProvider {
  private apiKey?: string;

  async initialize(): Promise<void> {
    // TODO: Load API key from secure storage
  }

  async setApiKey(apiKey: string): Promise<void> {
    this.apiKey = apiKey;
    // TODO: Store API key in secure storage
  }

  async sendRequest(payload: LLMRequest): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not set');
    }

    try {
      // TODO: Implement actual Anthropic API call
      return {
        content: 'Not implemented yet',
        role: 'assistant'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to send request to Anthropic API: ${errorMessage}`);
    }
  }

  async getResponse(): Promise<LLMResponse> {
    return {
      content: 'Not implemented yet',
      role: 'assistant'
    };
  }
} 