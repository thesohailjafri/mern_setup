import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { stringify } from 'querystring'
import { axiosClient } from '../../services/axios.service'

type Options = {
  params?: Record<string, any>
  onError?: (error: any) => void
  onComplete?: (data?: any) => void
}

type QueryResult<T> = {
  response: AxiosResponse<T> | null
  data: T | null
  error: any
  isLoading: boolean
  params: Record<string, any>
}

const useAxiosQuery = <T>(
  url: string,
  { params, onError, onComplete }: Options = {},
): QueryResult<T> => {
  params = params || {}
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const queryString = params ? `?${stringify(params)}` : ''
        const res = await axiosClient.get<T>(`${url}${queryString}`)
        setResponse(res)
        setData(res.data)
        if (onComplete) onComplete(res.data) // Call onComplete with data
      } catch (err) {
        setError(err)
        if (onError) onError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData() // Call fetchData only once on mount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array to ensure this effect runs only once

  return { response, data, error, isLoading, params }
}

export default useAxiosQuery
