import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type LocationState = {
  email: string;
};

const TwoFactorAuth = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state || {}) as LocationState;

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input if there's a value and we're not at the last input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Auto-submit when all digits are entered
  useEffect(() => {
    const isCodeComplete = code.every(digit => digit !== '');
    if (isCodeComplete && !isSubmitting) {
      const verificationCode = code.join('');
      verifyCode(verificationCode);
    }
  }, [code]);

  // Handle resend code timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendTimer]);

  // Handle lockout timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (lockTimer > 0) {
      timer = setTimeout(() => setLockTimer(lockTimer - 1), 1000);
    } else if (isLocked) {
      setIsLocked(false);
      setFailedAttempts(0);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lockTimer, isLocked]);
  
  const handleResendCode = () => {
    // Here you would typically resend the code
    // For now, we'll just show an alert and start the timer
    alert('New code sent!');
    setResendTimer(30); // 30 seconds cooldown
  };

  const verifyCode = async (verificationCode: string) => {
    if (verificationCode.length !== 6 || isLocked) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Here you would typically verify the code with your backend
      // For now, we'll simulate a failed attempt for demonstration
      const isValid = verificationCode === '123456'; // Replace with actual verification
      
      if (!isValid) {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        
        if (attempts >= 3) {
          // Lock the input for 5 minutes after 3 failed attempts
          setIsLocked(true);
          setLockTimer(300); // 5 minutes in seconds
          throw new Error('Too many failed attempts. Please try again in 5 minutes.');
        } else {
          const remainingAttempts = 3 - attempts;
          throw new Error(`Invalid verification code. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`);
        }
      }
      
      // If code is valid, proceed with verification
      console.log('Verification code:', verificationCode);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset failed attempts on successful verification
      setFailedAttempts(0);
      
      // Redirect to reset password page with email and code
      navigate('/reset-password', { 
        state: { 
          email,
          code: verificationCode 
        } 
      });
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
      console.error('Verification error:', err);
      
      // Clear the code on error but keep the input enabled if not locked
      if (!isLocked) {
        setCode(['', '', '', '', '', '']);
        const firstInput = document.getElementById('code-0') as HTMLInputElement;
        if (firstInput) firstInput.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('').slice(0, 6);
      setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      verifyCode(verificationCode);
    } else {
      setError('Please enter a 6-digit code');
    }
  };

  if (!email) {
    // If no email is provided, redirect back to forgot password
    navigate('/forgot-password');
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">Two-Factor Authentication</h1>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="flex justify-center space-x-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-2xl text-center border ${
                  error && !isLocked ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none  focus:border-teal-700 ${
                  isLocked ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-teal-700'
                }`}
                autoComplete="off"
                autoFocus={index === 0 && !isLocked}
                disabled={isSubmitting || isLocked}
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>
          {isLocked && (
            <div className="mb-4 text-center text-red-600">
              Too many failed attempts. Please try again in {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, '0')}
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            {resendTimer > 0 ? (
              <span>Resend code in {resendTimer} seconds</span>
            ) : (
              <>
                Didn't receive a code?{' '}
                <button 
                  type="button" 
                  className="text-teal-700 hover:text-teal-800 hover:underline focus:outline-none disabled:opacity-50"
                  onClick={handleResendCode}
                  disabled={isSubmitting}
                >
                  Resend Code
                </button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || code.some(digit => !digit)}
              className="w-full flex justify-center py-3 px-4 bg-teal-700 text-white text-sm font-medium rounded-full hover:bg-teal-700 focus:outline-none  transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="block w-full text-center text-sm text-teal-700 hover:text-teal-800 hover:underline"
              disabled={isSubmitting}
            >
              Back to Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
