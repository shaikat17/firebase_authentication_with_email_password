import React from 'react';

const Login = () => {
    return (
        <form>
            <input type="email" name="email" placeholder="Enter Your Email" id="email" />
            <br />
            <input type="password" placeholder="Enter Your Password" name="password" id="password" />
            <br />
            <input type="button" value="Login" />
        </form>
    );
};

export default Login;