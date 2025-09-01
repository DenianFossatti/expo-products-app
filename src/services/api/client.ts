import {ApiErrorDTO} from '../../types/api.types'

const BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string
  timeout?: number
}

class ApiClient {
  private baseURL: string
  private defaultTimeout: number

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL
    this.defaultTimeout = 15000 // 15 seconds
  }

  private async makeRequest<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const {method = 'GET', headers = {}, body, timeout = this.defaultTimeout} = config

    console.log('makeRequest', endpoint, config) // TODO: remove this later

    const url = `${this.baseURL}${endpoint}`
    const controller = new AbortController()

    // Set timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const requestConfig: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      signal: controller.signal,
    }

    let lastError: Error

    try {
      const response = await fetch(url, requestConfig)
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData: ApiErrorDTO = await response.json().catch(() => ({
          message: 'Unknown error occurred',
          status: response.status,
        }))

        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.status?.toString()
        )
      }

      return await response.json()
    } catch (error) {
      lastError = error as Error

      // Don't retry on client errors (4xx) or abort errors
      if (error instanceof ApiError && error.status && error.status < 500) {
        throw error
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT')
      }
    }

    clearTimeout(timeoutId)
    throw lastError!
  }

  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.makeRequest<T>(endpoint, {...config, method: 'GET'})
  }

  async post<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.makeRequest<T>(endpoint, {...config, method: 'DELETE'})
  }
}

export const apiClient = new ApiClient()
