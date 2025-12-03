import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type LocationState = {
  email: string;
  code: string;
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, code } = (location.state || {}) as LocationState;

  // Check password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please choose a stronger password');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Here you would typically send the new password to your backend
      // along with the email and verification code
      console.log('Resetting password for:', email);
      console.log('Verification code:', code);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page with success message
      navigate('/login', { 
        state: { 
          message: 'Your password has been reset successfully. Please login with your new password.'
        } 
      });
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      console.error('Reset password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return 'bg-gray-200';
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (!email || !code) {
    // If no email or code is provided, redirect back to forgot password
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
          <p className="text-gray-600">
            Create a new password for <span className="font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 hover:border-black/60 focus:border-black/60 focus:ring-0 focus:outline-none transition-all duration-200"
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {password.length === 0 
                    ? 'Password strength' 
                    : passwordStrength <= 1 ? 'Weak' 
                    : passwordStrength <= 3 ? 'Good' 
                    : 'Strong'}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 hover:border-black/60 focus:border-black/60 focus:ring-0 focus:outline-none transition-all duration-200"
                placeholder="Confirm new password"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || !password || !confirmPassword}
              className="w-full flex justify-center py-3 px-4 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 focus:outline-none transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="block w-full text-center text-sm text-gray-600 hover:text-gray-800 hover:underline"
              disabled={isSubmitting}
            >
              Back to Login
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
          <h3 className="font-medium text-gray-800 mb-2">Password Requirements</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li className={password.length >= 8 ? 'text-green-600' : ''}>
              At least 8 characters long
            </li>
            <li className={password.match(/[a-z]/) ? 'text-green-600' : ''}>
              At least one lowercase letter
            </li>
            <li className={password.match(/[A-Z]/) ? 'text-green-600' : ''}>
              At least one uppercase letter
            </li>
            <li className={password.match(/[0-9]/) ? 'text-green-600' : ''}>
              At least one number
            </li>
            <li className={password.match(/[!@#$%^&*(),.?":{}|<>]/) ? 'text-green-600' : ''}>
              At least one special character
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
