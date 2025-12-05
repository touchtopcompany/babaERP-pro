import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForgotPassword } from '../../api/auth.api';
import { validateForgotPasswordForm } from '../../utils/validations';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const forgotPasswordMutation = useForgotPassword();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear error when user starts typing
    if (errors.email) {
      const { isValid } = validateForgotPasswordForm(newEmail);
      if (isValid) {
        setErrors({});
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const { isValid, errors: validationErrors } = validateForgotPasswordForm(email);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await forgotPasswordMutation.mutateAsync({ email });
      setIsSuccess(true);
      setMessage('If an account exists with this email, you will receive a password reset link.');
      setErrors({});
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to receive a password reset link</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => {
                    const { isValid, errors: validationErrors } = validateForgotPasswordForm(email);
                    if (!isValid) {
                      setErrors(validationErrors);
                    } else {
                      setErrors({});
                    }
                  }}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-gray-50 hover:border-black/60 focus:border-black/60 focus:ring-0 focus:outline-none transition-all duration-200"
                  placeholder="Email address"
                />
                <div className="absolute -bottom-6 left-0 right-0">
                  {errors.email && (
                    <p className="text-sm text-red-600 pl-3">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full flex justify-center py-3 px-4 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 focus:outline-none  transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
              </button>
              
              <Link
                to="/login"
                className="block w-full text-center text-sm text-gray-600 hover:text-gray-800 hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-black/90 transition-colors duration-200"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
