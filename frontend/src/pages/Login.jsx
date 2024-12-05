import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import muImage from '../assets/mu.png';
import Footer from './Footer';
// import Header from './Header';



const Login = () => {
  const [activeTab, setActiveTab] = useState('squad');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const handleLogin = async () => {
    if (activeTab === 'admin') {
      if (email === 'mumbaiuni@gmail.com' && password === 'uniMum') {
        navigate('/home');
      } else {
        alert('Invalid Admin credentials');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5555/employees/login', {
          email,
          password,
        });

        if (response.status === 200) {
          navigate(`/squad/${response.data.eid}`);
        }
      } catch (error) {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen" 
      style={{ 
        backgroundImage: `url(${muImage})`, // Use the imported image here
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >

      
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => handleTabClick('squad')}
            className={`flex-1 py-2 rounded-l-lg text-center ${activeTab === 'squad' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Squad Login
          </button>
          <button
            onClick={() => handleTabClick('admin')}
            className={`flex-1 py-2 rounded-r-lg text-center ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Admin Login
          </button>
        </div>
        <div>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
        
      </div>
      <div>
        <Footer/>
        </div>
    </div>
  );
};

export default Login;