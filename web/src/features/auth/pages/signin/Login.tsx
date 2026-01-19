import { useState } from 'react';
import { useLogin } from '../../api/auth.api';
import { Link } from 'react-router-dom';
import { FormField } from './components/FormField';
import { validateLoginForm, validateField } from './components/validation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const { isValid, errors: validationErrors } = validateLoginForm(formData);
    setErrors(validationErrors);

    if (isValid) {
      setLoginError(null); // Clear any previous errors
      loginMutation.mutate(formData, {
        onError: () => {
          setLoginError('The provided credentials are incorrect.');
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field if it was touched or form was submitted
    if (touched[name] || isSubmitted) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate the field when it loses focus
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => !error) &&
      formData.username.trim() !== '' &&
      formData.password.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white overflow-hidden flex">
        <div className="hidden md:flex md:w-1/2 ">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/src/assets/image/signin_img.svg"
              alt="Login"
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
              style={{
                contentVisibility: 'auto',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                zIndex: 2
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.opacity = '1';
                const placeholder = img.nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'none';
                }
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                console.error('Failed to load image:', img.src);
                const placeholder = img.nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'flex';
                  placeholder.style.flexDirection = 'column';
                  placeholder.style.justifyContent = 'center';
                  placeholder.style.alignItems = 'center';
                  placeholder.innerHTML = 'Login Image';
                }
              }}
            />
            <div
              className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400"
              style={{
                zIndex: 1,
                backgroundImage: 'linear-gradient(90deg, #f3f4f6 0px, #e5e7eb 50%, #f3f4f6 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            >
              Loading...
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-700 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{loginError}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <FormField
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username"
                error={errors.username}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                }
                required
              />

              <FormField
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                error={errors.password}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                }
                showPasswordToggle={true}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />

              <div className="flex justify-center">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-black/60 hover:text-black/80 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid() || loginMutation.isPending}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${isFormValid()
                  ? 'bg-teal-700 hover:bg-teal-700 focus:outline-none'
                  : 'bg-teal-700 cursor-not-allowed'
                  }`}
              >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;