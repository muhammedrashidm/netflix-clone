import React from 'react'
import './signupscreen.css'
import { useRef } from 'react'
import { AuthRegister, AuthSignIn } from '../firebase'
import { useSelector } from 'react-redux'
import { selectPlan } from '../features/counter/plansSlice'
import { useHistory } from 'react-router'

function SignUpScreen() {

    const history = useHistory();
    const emailRef = useRef(null)
    const passwordlRef = useRef(null)
    const plan = useSelector(selectPlan)
    let planName = plan.plan

    const register = (e) => {


        AuthRegister(emailRef.current.value, passwordlRef.current.value)
        e.preventDefault();
    }
    async function signin(e) {
        const user = AuthSignIn(emailRef.current.value, passwordlRef.current.value)
        if (planName) {
            history.push('/')
        } else {
            history.push('/profile')
        }
        e.preventDefault();

    }
    return (
        <div className="signup_screen">
            <form action="">
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" name="email" placeholder="Email" />
                <input ref={passwordlRef} type="password" name="password" id="" placeholder="Password" />
                <button type="submit" onClick={signin}> Sign In</button>
                <h4>
                    <span className="signupScreen_gray">New to Netflix? </span>
                    <span className="singUpScreen_link" onClick={register}>Sign Up Now</span>
                </h4>
            </form>

        </div>
    )
}

export default SignUpScreen
