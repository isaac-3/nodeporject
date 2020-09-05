import React from 'react';

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="name"
                />
                <input
                type="text"
                placeholder="email"
                />
                <input
                type="text"
                placeholder="password"
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Signup
                </button>
            </div>
        </div>
    );
}
 
export default Signup;