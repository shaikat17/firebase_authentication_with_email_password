import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        setSuccess('');
        setError('');

        console.log(event)
        const email = event.target.email.value
        const password = event.target.password.value

        console.log(email, password)

         // validate
         if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please add at least one uppercase');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Please add at least two numbers');
            return
        }
        else if (password.length < 6) {
            setError('Please add at least 6 characters in your password')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            setError('')
            setSuccess('Login Successfull')
        })
        .catch(error => {
            console.log(error.message)
            setError(error.message)
            setSuccess('')
        })
    }
    return (
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Enter Your Email" id="email" />
            <br />
            <input type="password" placeholder="Enter Your Password" name="password" id="password" />
            <br />
            <p>{error}</p>
            <p>{success}</p>
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;