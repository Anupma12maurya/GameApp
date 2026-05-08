import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (data.message === 'User created successfully') {
            alert('Signup successful, please login');
            navigate('/login');
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
