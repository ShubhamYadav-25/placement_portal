import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between Login & SignUp

  // Shared states for both forms
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only used in signup

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in:', { role, email, password });
    } else {
      console.log('Signing up:', { role, name, email, password });
    }
    // Add backend logic here
  };
  const handleLogin = async () => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem('token', data.token);
    alert('Login successful');
    // redirect to dashboard
  } else {
    alert(data.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-500 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold shadow-md">
            {isLogin ? '🔐' : '📝'}
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-gray-500">
            {isLogin ? 'Please sign in to your account' : 'Sign up to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="student">Student</option>
              <option value="tpo">TPO</option>
            </select>
          </div>

          {/* Name field for Sign Up only */}
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Remember + Forgot */}
          {isLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Switch between login/signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 font-medium hover:underline ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
