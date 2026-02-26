function vedicHash(password) {

    let asciiSum = 0;
  
    for (let i = 0; i < password.length; i++) {
      asciiSum += password.charCodeAt(i);
    }
  
    const base = 100000;
  
    const nikhilam = base - asciiSum;
  
    const mixed = (nikhilam * 31) + 98765;
  
    return mixed.toString();
  }
  
  module.exports = vedicHash;