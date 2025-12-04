export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  // More strict email regex pattern
  // 1. Must start with letters (no numbers or special chars at start)
  // 2. Must contain @ symbol
  // 3. Domain part must contain at least one dot
  // 4. TLD must be at least 2 characters
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { 
      isValid: false, 
      error: 'Please enter a valid email address (e.g., name@domain.com)' 
    };
  }
  
  // Additional check to prevent numbers-only local part
  const [localPart] = email.split('@');
  if (/^\d+$/.test(localPart)) {
    return {
      isValid: false,
      error: 'Email must start with letters and contain valid characters'
    };
  }
  
  return { isValid: true };
};

export const validateForgotPasswordForm = (email: string) => {
  const emailValidation = validateEmail(email);
  
  if (!emailValidation.isValid) {
    return {
      isValid: false,
      errors: {
        email: emailValidation.error
      }
    };
  }
  
  return { isValid: true, errors: {} };
};
