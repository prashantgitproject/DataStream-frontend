import { isValidEmail } from "6pp"

export   const emailValidator = (email) => {
    if(!isValidEmail(email)) return { isValid: false, errorMessage: 'Invalid email' };
    return { isValid: true, errorMessage: '' };
  }