interface ValidationResult {
  isValid: boolean;
  errors: {
    username?: string;
    password?: string;
  };
}

export const validateLoginForm = (formData: { username: string; password: string }): ValidationResult => {
  const errors: ValidationResult['errors'] = {};
  let isValid = true;

  // Username validation
  if (!formData.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  } else if (formData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    errors.username = 'Username can only contain letters, numbers, and underscores';
    isValid = false;
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
    isValid = false;
  }

  return {
    isValid,
    errors,
  };
};

export const validateField = (name: string, value: string): string | undefined => {
  switch (name) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (value.length < 3) return 'Username must be at least 3 characters long';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
      return undefined;
    
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters long';
      return undefined;
      
    default:
      return undefined;
  }
};
