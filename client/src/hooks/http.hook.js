import React, {useState, useCallback, setError} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback( async (url, method='GET', body=null, headers ={}) => {
     setLoading(true)   
        try {
            if (body) {
                body=JSON.stringify(body)
                console.log("Recieved request BEFORE SETTING ", headers)
                headers['Content-Type']= 'application/json'
            }

           const response = await fetch(url,{method, body, headers})
            const data = await response.json()
            console.log("Recieved request", headers, body, method)
            if(!response.ok) {
                throw new Error(data.message || 'Something went wrong.')
            }
            setLoading(false)
            return data
        } catch (e) {
            console.log(e, error)
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])
    const clearError = useCallback(() => setError(), [])
    return { loading, request, error, clearError}
    
}