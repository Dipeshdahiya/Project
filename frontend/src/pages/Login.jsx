import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" /></div>
      <button type="submit">Login</button>
    </form>
  );
}
