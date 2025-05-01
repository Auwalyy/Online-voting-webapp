import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const [communityId, setCommunityId] = useState("");
    const { register, error, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role, communityId);
            navigate(from, { replace: true });
        } catch (err) {
            // Error is already set in context
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" 
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input type="email" 
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input type="password" 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {error && <div className="error">{error}</div>}
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="voter">Voter</option>
                <option value="admin">Admin</option>
            </select>
            <button>Sign up</button>

        </form>
    </div>
  )
}

export default Register