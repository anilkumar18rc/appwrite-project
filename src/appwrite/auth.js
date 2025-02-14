import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
  //Account creation
  async createAccount({ email, password, name }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        //call login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  //login

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  //log out

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default AuthService;
