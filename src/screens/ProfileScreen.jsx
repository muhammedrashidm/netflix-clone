import userEvent from '@testing-library/user-event'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import NavBar from '../components/NavBar'
import './profilescreen.css'
import auth from '../firebase'
import PlanScreen from './PlanScreen'
function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
        <div className="profilescreen">
            <NavBar />

            <div className="profileScreen_body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_info">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="" className="src" />
                    <div className="profileScreen_details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen_plans">
                            <h3>Plans</h3>
                            <PlanScreen />
                            <button onClick={() => auth.signOut()} className="profileScreen_signOut">Sign Out</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
