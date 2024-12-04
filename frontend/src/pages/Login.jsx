import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const [activeTab, setActiveTab] = useState('squad');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to a different page

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  const handleLogin = async () => {
    if (activeTab === 'admin') {
      // Admin credentials check
      if (email === 'mumbaiuni@gmail.com' && password === 'uniMum') {
        // Redirect to home page
        navigate('/home');
      } else {
        alert('Invalid Admin credentials');
      }
    } else {
      try {
        // Check if the email and password match any employee in the backend
        const response = await axios.post('http://localhost:5555/employees/login', {
          email,
          password,
        });

        if (response.status === 200) {
          // Redirect to home page if credentials are valid
          navigate(`/squad/${response.data.eid}`);
        }
      } catch (error) {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="p-6 my-5 w-full max-w-md mx-auto flex flex-col">
      {/* Tabs */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleTabClick('squad')}
          className={`px-4 py-2 rounded-t-lg w-full text-center ${activeTab === 'squad' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Squad Login
        </button>
        <button
          onClick={() => handleTabClick('admin')}
          className={`px-4 py-2 rounded-t-lg w-full text-center ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Admin Login
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'squad' ? (
        <div>
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div>
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
