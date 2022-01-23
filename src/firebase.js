import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, getDocs, collection, doc, setDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { loadStripe } from '@stripe/react-stripe-js';
import firebaseConfig from './firebaseConfig';


const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const db = getFirestore();



const AuthRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //console.log(user);
        })
        .catch((error) => {

        });
}
const AuthSignIn = (email, password) => {
    let user;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            user = userCredential.user;

        })
        .catch((error) => {
            console.log(error);
        });
    return user
}


async function getProducts() {
    const products = {}
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach(async doc => {
        products[doc.id] = doc.data();

        const priceSnap = await getDocs(collection(doc.ref, "prices"));

        priceSnap.docs.forEach(price => {
            products[doc.id].prices = {
                priceId: price.id,
                priceData: price.data()
            }
        })

    });
    return products

}

async function createAndExecuteCheckoutSession(userId, priceId, url) {


    const checkout_sessions_Ref = collection(db, "customers", userId, "checkout_sessions")
    await addDoc(checkout_sessions_Ref, {
        price: priceId,
        success_url: url,
        cancel_url: url
    }).then(async (sessionRef) => {
        console.log(sessionRef.path);

        const unsub = onSnapshot(doc(db, sessionRef.path), async (doc) => {
            console.log("Current data: ", doc.data());

            const { error, url, sessionId } = doc.data()
            if (error) {
                alert(`an err: ${error.message}`);
            }
            if (url) {
  
             window.location.assign(url)
            //  const stripe =   loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
            //  stripe.redirectToCheckout({ sessionId })
            }
        });



    });
}

async function getUserSbscriptions(userId) {

    let subscription;
    console.log("user:" + userId);
    const querySnapshot = await getDocs(
      collection(db, 'customers', userId, 'subscriptions')
    )
    querySnapshot.forEach(async (doc) => {

        subscription = {
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds,
        }


    });
    return subscription
}

export { AuthRegister, AuthSignIn, db, getProducts, createAndExecuteCheckoutSession, getUserSbscriptions }
export default auth







async function WORKINGcreateAndExecuteCheckoutSession(userId, priceId, url) {


    const checkout_sessions_Ref = doc(db, "customers", userId, "checkout_sessions", "sessionaaa")
    const sessionRef = await setDoc((checkout_sessions_Ref), {
        price: priceId,
        success_url: url,
        cancel_url: url
    }).then(async () => {

        const unsub = onSnapshot(doc(db, "customers", userId, "checkout_sessions", "sessionaaa"), async (doc) => {
            console.log("Current data: ", doc.data());
            // console.log(doc);
            // const { error, sessionId } = doc.data()
            // console.log(sessionId);
            // console.log(error);
            const { error, url } = doc.data();
            if (error) {
                alert(`an err: ${error.message}`);
            }
            if (url) {
                // const stripe = await loadStripe('pk_test_51JqkWWSAvZ5N2ULQPbhlrjdJzAL2wHr5xQhPUNGwfFEKJPnnJjH2Rxn8u0zdjiXnDLWMpPKlAaDDo8VQWwtwJIXo00d3MFGX9V');
                // await stripe.redirectToCheckout({ url });
                window.location.assign(url)
            }
        });



    });

    console.log(sessionRef);

    // console.log(doc.id, " => ", doc.data());
    // const error = doc.data().error;
    // const sessionId = doc.data().sessionId
    // console.log(sessionId);
    // if (error) {
    //     alert(`an err: ${error.message}`);
    // }
    // if (sessionId) {
    //     const stripe = await loadStripe(
    //         ''
    //     );
    //     await stripe.redirectToCheckout({ sessionId });
    // }



    // const querySnapshot = await getDocs(collection(db, "customers", userId, "checkout_sessions"));
    // querySnapshot.forEach((doc) => {

    //     const { error, sessionId } = doc.data();
    // });

    // const res = onSnapshot(collection(db, "customers", userId, "checkout_sessions"), (snap) => {
    //     console.log(snap.docs);
    //     //const { error, sessionId } = snap.docs[0]
    //     // if (error) {
    //     //     alert(`an err: ${error.message}`);
    //     // }
    //     // if (sessionId) {
    //     //     const stripe = loadStripe(
    //     //     );
    //     //     stripe.redirectToCheckout({ sessionId });
    //     // }
    // })

}