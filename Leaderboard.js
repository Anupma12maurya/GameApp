import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/game/leaderboard')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username} - {user.score}</li>
                ))}
            </ul>
        </div>
    );
}
