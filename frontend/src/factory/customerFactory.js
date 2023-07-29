import axios from 'axios';

class UserClass {
    constructor(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
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

    async userSignUp() {
        // abstract method
    }
}

class RiderClass extends UserClass {
    constructor(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        super(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role);
        //console.log(this.firstName, this.lastName, this.dateOfBirth, this.email, this.password, this.profilePhoto, this.phoneNumber, this.role);
    }
    
    async userSignUp() {
        // return await axios.post('/api/authentication/signup', {
        //     firstName: this.firstName,
        //     lastName: this.lastName,
        //     DOB: this.dateOfBirth,
        //     email: this.email,
        //     password: this.password,
        //     profilePhoto: this.profilePhoto,
        //     phoneNumber: this.phoneNumber,
        //     role: this.role,
        // }).then((res) => {
        //     // if (res.status == 201) {
        //     //     setMessage({ message: res.data.message, className: 'success' })
        //     //     setTimeout(() => {
        //     //         if (this.role === 'driver') {
        //     //             redirect.push('/regdriver');
        //     //         }
        //     //         else {
        //     //             redirect.push('/login');
        //     //         }
        //     //     }, 2000);
        //     // }
        //     // else {
        //     //     setMessage({ message: res.data.message, className: 'error' })
        //     // }
        //     return res;
        // })
    }
}

class DriverClass extends UserClass {
    constructor(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        super(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role);
        //console.log(this.firstName, this.lastName, this.dateOfBirth, this.email, this.password, this.profilePhoto, this.phoneNumber, this.role);
    }

    async userSignUp() {
        // return await axios.post('/api/authentication/signup', {
        //     firstName: this.firstName,
        //     lastName: this.lastName,
        //     DOB: this.dateOfBirth,
        //     email: this.email,
        //     password: this.password,
        //     profilePhoto: this.profilePhoto,
        //     phoneNumber: this.phoneNumber,
        //     role: this.role,
        // }).then((res) => {
        //     // if (res.status == 201) {
        //     //     setMessage({ message: res.data.message, className: 'success' })
        //     //     setTimeout(() => {
        //     //         if (this.role === 'driver') {
        //     //             redirect.push('/regdriver');
        //     //         }
        //     //         else {
        //     //             redirect.push('/login');
        //     //         }
        //     //     }, 2000);
        //     // }
        //     // else {
        //     //     setMessage({ message: res.data.message, className: 'error' })
        //     // }
        //     return res;
        // })
    }
}

export class UserFactory {
    
    createUser(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        // abstract method
    }
    factoryUserCreate(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        //console.log(this);
        return this.createUser(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role);
        //await userCreated.userSignUp();
    }
}

export class RiderFactory extends UserFactory {
    createUser(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        console.log("this is rider factory");
        return new RiderClass(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role);
    }
}

export class DriverFactory extends UserFactory {
    createUser(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role) {
        console.log("this is driver factory");
        return new DriverClass(email, password, firstName, lastName, dateOfBirth, phoneNumber, profilePhoto, role);
    }
}
