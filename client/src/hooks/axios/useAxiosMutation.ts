import { useState, useCallback } from 'react'
import { AxiosResponse } from 'axios'
import { axiosClient } from '../../services/axios.service'
interface CallBacks {
  onComplete?: (data: any) => void
  onError?: (error: any) => void
}
interface Options extends CallBacks {
  url: string
  data?: Record<string, any>
  headers?: Record<string, string>
  params?: Record<string, any>
}
type MutationResult<T = any> = {
  response: AxiosResponse<T> | null
  data: T | null
  error: any
  isLoading: boolean
  mutate: (options: Options) => Promise<void>
}

const useAxiosMutation = <T>(
  method: 'post' | 'put' | 'delete',
  { onComplete, onError }: CallBacks = {},
): MutationResult<T> => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const mutate = useCallback(
    async ({
      url,
      data = undefined,
      headers = undefined,
      params = undefined,
    }: Options) => {
      setIsLoading(true)
      try {
        const res = await axiosClient.request<T>({
          url,
          method,
          headers,
          data,
          params,
        })
        setResponse(res)
        setData(res.data)
        if (onComplete) onComplete(res.data)
      } catch (err) {
        setError(err)
        if (onError) onError(err)
      } finally {
        setIsLoading(false)
      }
    },
    [method, onComplete, onError],
  )

  return {
    response,
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useAxiosMutation
