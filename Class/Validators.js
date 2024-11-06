class validators {
    static isEmail(email) {
        return email.includes('@');
    }
    static isPassword(password) {
        return password.length >= 6;
    }
    static isPhone(phone) {
        return phone.length >= 10;
    }
    static isUsername(username) {
        return username.length >= 6;
    }
    static isName(name) {
        return name.length >= 3;
    }
    static isRole(role) {
        return role === 'Admin' || role === 'User';
    }
    static isNumber(number) {
        return !isNaN(number);
    }
    static isString(string) {
        return isNaN(string);
    }

}


module.exports = validators;