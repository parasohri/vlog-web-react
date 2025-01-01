import { Client, Account, ID } from "appwrite";
import conf from "../conf/confi";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create a new user account
    async createAccount({ email, password, name }) {
        try {
            // Remove the custom userId and let Appwrite handle it
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error('Error creating account:', error.message); // Improved error logging
            throw error;
        }
    }

    // Login a user
    async login({ email, password }) {
        try {
            // Attempt to create a session using the provided email and password
            const session = await this.account.createEmailPasswordSession(email, password);
    
            // If successful, return the session object
            return session;
        } catch (error) {
            // Improved error logging to capture the full error message
            console.error('Error logging in:', error.message || error); // Log the error message
    
            // Optionally, log more details to help debug the issue
            console.error('Error details:', error);
    
            // Rethrow the error so it can be caught and handled where this method is called
            throw error;
        }
    }
    
    // Get the current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error.message);
            if (error.code === 401) {
                console.error('Unauthorized. User might not be logged in.');
            }
            throw error;
        }
    }
    

    // Logout the user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error.message); // Improved error logging
        }
    }
}

// Instantiate and export the AuthService
const authService = new AuthService();
export default authService;
