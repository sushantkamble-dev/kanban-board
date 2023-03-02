import React,{ useState } from 'react'
import firebase from "../firebase";

const Signup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onClickListener = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(()=>{
            props.history.push('/LandingPage')
        })
            .catch(error => {
                console.log(error.message)
            })
    }
    const redirectToLogin = () =>{
        props.history.push('/')
    }
    return (
        <div>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={onClickListener}>
                signup
            </button>
            <button onClick={redirectToLogin} >To Login Page</button>
        </div>
    )
}

export default Signup