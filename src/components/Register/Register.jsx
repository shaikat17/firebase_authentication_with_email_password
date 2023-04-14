import React from "react";

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        const email = event.target.email.value
        const password = event.target.password.value

        console.log(email, password)
    }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        id="email"
      />
      <br />
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        id="password"
      />
      <br />
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
