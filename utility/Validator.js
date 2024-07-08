class Validator {
    static isValidMobileNumber(mobileNumber) {
      const regex = /^[0-9]{10}$/;
      return regex.test(mobileNumber || '');
    }
  
    static isValidEmail(email) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email || '');
    }
  
    static isValidName(name) {
      const regex = /^.{4,}$/;
      return regex.test(name || '');
    }
  
    static isValidAddress(address) {
      const regex = /^.{5,}$/;
      return regex.test(address || '');
    }
  
    static isValidPincode(pincode) {
      const regex = /^[1-9][0-9]{5}$/;
      return regex.test(pincode || '');
    }
  
    static isValidAccount(account) {
      const regex = /^[0-9]{10,16}$/;
      return regex.test(account || '');
    }
  
    static isValidAmount(amount) {
      const tempAmount = amount || '';
      const decimalCount = tempAmount.split('.').length - 1;
      if (decimalCount > 1) {
        return false;
      }
      const regex = /(?:\d*\.\d{1,2}|\d+)$/;
      return regex.test(tempAmount);
    }
  
    static isValidIBAN(ibanNumber) {
      const regex = /^.{10,16}$/;
      return regex.test(ibanNumber || '');
    }
  
    static isValidPassword(password) {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regex.test(password || '');
    }
  }
  
  export default Validator;
  