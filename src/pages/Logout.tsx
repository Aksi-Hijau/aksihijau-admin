import useFetcher from '@/hooks/useFetcher'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { API_URL } from '../config/api.js'

const Logout = () => {
  localStorage.removeItem('userData')
  const fetcher = useFetcher()

  const deleteSession = async () => {
    await fetcher(`${API_URL}/sessions`, {
      method: 'DELETE'
    })
  }

  useEffect(() => {
    deleteSession()
  }, [])

  return <Navigate to="/login" />
}

export default Logout