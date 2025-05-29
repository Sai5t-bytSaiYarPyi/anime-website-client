import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-text mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full bg-background text-text p-2 rounded-lg mb-4"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-background text-text p-2 rounded-lg mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full bg-background text-text p-2 rounded-lg mb-4"
      />
      <button type="submit" className="w-full bg-primary text-text p-2 rounded-lg hover:bg-[#E04355]">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;