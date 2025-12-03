import { useState } from 'react';
import { useLogin } from '../api/auth.api';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white overflow-hidden flex">
        <div className="hidden md:flex md:w-1/2 bg-gray-100">
          <img 
            src="/src/assets/image/login_image.png" 
            alt="Login" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 hover:border-black/60 focus:border-black/60 focus:ring-0 focus:outline-none transition-all duration-200"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  *
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 hover:border-black/60 focus:border-black/60 focus:ring-0 focus:outline-none transition-all duration-200"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <span>Hide</span>
                  ) : (
                    <span>Show</span>
                  )}
                </button>
              </div>

              <div className="flex justify-center">
                <div className="text-sm">
                  <a href="#" className="font-medium text-black/60 hover:text-black/80">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full flex justify-center py-3 px-4 bg-black text-white text-sm font-medium rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? 'Signing in...' : 'Continue'}
              </button>
            </div>
          </form>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-black/60 hover:text-black/60">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;