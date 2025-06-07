const admin = require('../config/firebase');

class User {
    constructor(userData) {
        this.uid = userData.uid;
        this.email = userData.email;
        this.emailVerified = userData.emailVerified;
        this.disabled = userData.disabled;
        this.metadata = userData.metadata;
        this.customClaims = userData.customClaims;
        this.providerData = userData.providerData;
    }

    static async findByUid(uid) {
        try {
            const userRecord = await admin.auth().getUser(uid);
            return new User(userRecord);
        } catch (error) {
            throw new Error(`User not found: ${error.message}`);
        }
    }

    static async findByEmail(email) {
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            return new User(userRecord);
        } catch (error) {
            throw new Error(`User not found: ${error.message}`);
        }
    }

    static async create(userData) {
        try {
            const userRecord = await admin.auth().createUser(userData);
            return new User(userRecord);
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async delete() {
        try {
            await admin.auth().deleteUser(this.uid);
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = User;
