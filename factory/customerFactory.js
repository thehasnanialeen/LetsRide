class UserClass {
    constructor(email, password, firstName, lastName, dateOfBirth, phoneNumber, role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.profilePhoto = profilePhoto;
        this.role = role;
    }

    userSignUp(role);
}

class RiderClass extends UserClass {
    async userSignUp(role) {
        await axios.post('/api/authentication/signup', {
            firstName: this.firstName,
            lastName: this.lastName,
            DOB: this.dateOfBirth,
            email: this.email,
            password: this.password,
            profilePhoto: this.profilePhoto,
            phoneNumber: this.phoneNumber,
            role,
        })
    }
}

class DriverClass extends UserClass {
    async userSignUp(role) {
        await axios.post('/api/authentication/signup', {
            firstName: this.firstName,
            lastName: this.lastName,
            DOB: this.dateOfBirth,
            email: this.email,
            password: this.password,
            profilePhoto: this.profilePhoto,
            phoneNumber: this.phoneNumber,
            role,
        })
    }
}

export class UserFactory {
    createUser();  // abstract method
    async factoryUserSignUp() {
        const userCreated = this.createUser();
        userCreated.userSignup();
    }
}

export class RiderFactory extends UserFactory {
    createUser() {
        return new RiderClass();
    }
}

export class DriverFactory extends UserFactory {
    createUser() {
        return new DriverClass();
    }
}