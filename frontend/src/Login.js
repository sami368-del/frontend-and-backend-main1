import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    if (username) {
      setUser(username);  // ذخیره‌سازی نام کاربر
      history.push('/home');  // هدایت به صفحه خانه
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
