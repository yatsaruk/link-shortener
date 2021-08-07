import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth =useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({ 
        email:'', password:''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form,[event.target.name]:event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log("Data login", data.token, data.userId)
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }
    return (
        <div className="row">
           <div className="col s6 offset-s3">
                <h1>Weblink shortener </h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title"> Login</span>

                        <div> 
                            <div className="input-field">
                                <input placeholder="Email" 
                                id="email" 
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Password" 
                                id="password" 
                                type="text"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>    

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue" onClick={loginHandler} disabled={loading}>Login</button>
                        <button className="btn grey" onClick={registerHandler} disabled={loading} >Register</button>
                    </div>
                </div>
            </div>
        </div>    
    )
}