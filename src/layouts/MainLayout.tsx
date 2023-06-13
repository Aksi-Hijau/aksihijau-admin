import useFetcher from '@/hooks/useFetcher'
import React, { useContext, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { API_URL } from "@/config/api.js"
import useLocalStorage from '@/hooks/useLocalStorage'
import { UserContext } from '@/context/UserContext'

const MainLayout = ({ children }) => {
  const [searchParams] = useSearchParams()
  const [userData, setUserData] = useLocalStorage("userData")

  const accessTokenParam = searchParams.get('accessToken')
  const refreshTokenParam = searchParams.get('refreshToken')

  const accessToken = accessTokenParam || userData.accessToken;
  const refreshToken = refreshTokenParam || userData.refreshToken;

  const { setUserProfile } = useContext(UserContext)

  const fetcher = useFetcher()

  if(!(accessToken && refreshToken)) {
    return <Navigate to="/login" />
  }


  useEffect(() => {
    if (accessTokenParam || refreshTokenParam) {
      setUserData({ accessToken, refreshToken })
    }
    handleGetDataUser()
  }, [])


  const handleGetDataUser = async () => {
    try {
      const response = await fetcher(`${API_URL}/user`, { 
        headers: { Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken } 
      })
      setUserProfile(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>{ children }</div>
  )
}

export default MainLayout