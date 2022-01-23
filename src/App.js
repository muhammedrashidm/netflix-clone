import React from 'react';
import HomeScreen from "./screens/HomeScreen"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import './App.css';
import { useEffect } from 'react';
import auth from './firebase'
import { login, logout, selectUser } from './features/counter/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import SearchResult from './screens/SearchResult';
import NavBar from './components/NavBar';
import { getUserSbscriptions } from './firebase';
import { selectPlan, setPlan } from './features/counter/plansSlice';
import PlanScreen from './screens/PlanScreen';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const plan = useSelector(selectPlan)
  let planName = plan.plan




  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {

      if (userAuth) {
        //logged in

        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))

        const subscription = await getUserSbscriptions(userAuth.uid)
        dispatch(setPlan(subscription?.role))

      } else {
        //logged out  
        dispatch(logout())
      }

    })
    return unsubscribe;
  }, [dispatch])


  console.log('plannnn:' + planName);
  return (
    <div className="app">


      <Router>

        {!user ? (
          <LoginScreen />
        ) : (
          planName ?
            <Switch>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
              <Route path="/searchresult">
                <SearchResult />
              </Route>
            </Switch>
            : <Switch>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
              <Route path="/">
                <ProfileScreen />
              </Route>
              <Route path="/searchresult">
                <ProfileScreen />
              </Route>
            </Switch>


        )}



      </Router>
    </div>
  );
}

export default App;
