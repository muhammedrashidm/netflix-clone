import React from 'react'
import './loginscreen.css'
import { useState } from 'react'
import SignUpScreen from './SignUpScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img className="loginScreen_logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                <button onClick={() => setSignIn(true)} className="loginScreen_btn">Sign In</button>
                <div className="loginScreen_gradient"></div>

            </div>
            <div className="loginScreen_body">
                {signIn ? (
                    <SignUpScreen />
                ) : (
                    <>
                        <h1>Unlimited films and TV shows</h1>
                        <h2>Watch anyware</h2>

                        <div className="loginScreen_input">
                            <form action="">
                                <input type="email" placeholder="Email" />
                                <button onClick={() => { setSignIn(true) }} className="get_started">
                                    GET STARTED
                                </button>

                            </form>
                        </div>
                    </>

                )}

            </div>
        </div>
    )
}

export default LoginScreen
