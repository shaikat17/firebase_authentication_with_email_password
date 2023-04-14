import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import app from "../../firebase/firebase.config";

const auth = getAuth(app)

const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
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

        // create email password user - firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            setError('')
            setSuccess('User has been Created Successfully')
            event.target.reset()
            sendVerificationEmail(loggedUser)
        })
        .catch(error => {
            console.log(error.message)
            setError(error.message)
            setSuccess('')
        })

    }

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address')
            })
    }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        id="email"
        required
      />
      <br />
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        id="password"
        required
      />
      <br />
      <p>{error}</p>
      <p>{success}</p>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
