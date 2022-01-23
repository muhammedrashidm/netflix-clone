import React from 'react'
import './planscreen.css'
import { useState, useEffect } from 'react';
import { getProducts } from '../firebase';
import { query } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { createAndExecuteCheckoutSession, getUserSbscriptions } from '../firebase'
import { selectPlan } from '../features/counter/plansSlice';
function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)
    const plan = useSelector(selectPlan)

    useEffect(async () => {
        let productsRes = await getProducts();
        setProducts(productsRes)

    }, [])
    useEffect(async () => {
        let subscription = await getUserSbscriptions(user.uid)
        setSubscription(subscription)
            console.log(subscription);
    }, [user.uid]);


    const loadCheckOut = async (priceId) => {
        createAndExecuteCheckoutSession(user.uid, priceId, window.location.origin)
    }

    console.log("plan is:" + JSON.stringify(plan));
    return (
        <div className="planscreen">
            {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            <br />
            {Object.entries(products).map(([productId, productData]) => {
                //
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role?.toLowerCase())
                console.log(isCurrentPackage);
                console.log(productData.name + "=>" + subscription?.role);
                return (

                    <div key={productId} className={isCurrentPackage ? 'planScreen_plan_disabled' : 'planScreen_plan'}>
                        <div className="planScreen_info">
                            <h5> {productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => {
                            !isCurrentPackage ? loadCheckOut(productData.prices.priceId) : alert('Pleas Select another Plan')
                        }

                        }>
                            {isCurrentPackage ? 'Current Plan' : 'Subscibe'}
                        </button>
                    </div>
                )
            })}

        </div>
    )
}

export default PlanScreen
