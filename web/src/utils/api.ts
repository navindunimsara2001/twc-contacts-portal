import axios from "axios"
import { Contact } from "./types";

axios.interceptors.request.use(async (cfg) => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
        cfg.headers.Authorization = `Bearer ${jwt}`;
    }
    return cfg;
});

/**
 * Fetches all contacts from the server.
 * @returns {Promise<any>} A promise that resolves to the list of contacts.
 * @throws {Error} If the request fails.
 */
export const getContacts = async (): Promise<Contact[]> => {
    try {
        const response = await axios.get(`contacts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

/**
 * Fetches a specific contact by ID.
 * @param {string} id - The unique identifier of the contact.
 * @returns {Promise<any>} A promise that resolves to the contact data.
 * @throws {Error} If the request fails or the contact is not found.
 */
export const getContactById = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`contacts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching contact with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Creates a new contact in the database.
 * @param {Object} newContact - The details of the contact to create.
 * @param {string} newContact.name - The name of the contact.
 * @param {string} newContact.email - The email address of the contact.
 * @param {string} newContact.phone - The phone number of the contact.
 * @param {string} newContact.gender - The gender of the contact.
 * @returns {Promise<any>} A promise that resolves to the created contact data.
 * @throws {Error} If the request fails or input data is invalid.
 */
export const createContact = async (newContact: Contact): Promise<any> => {
    try {
        const response = await axios.post(`contacts`, newContact);
        return response.data;
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

/**
 * Updates an existing contact in the database.
 * @param {Object} updatedContact - The updated details of the contact.
 * @param {string} updatedContact.id - The unique identifier of the contact to update.
 * @param {string} updatedContact.name - The updated name of the contact.
 * @param {string} updatedContact.email - The updated email address of the contact.
 * @param {string} updatedContact.phone - The updated phone number of the contact.
 * @param {string} updatedContact.gender - The updated gender of the contact.
 * @returns {Promise<any>} A promise that resolves to the updated contact data.
 * @throws {Error} If the request fails or the contact is not found.
 */
export const updateContact = async (updatedContact: { id?: string, fullName: string, email: string, phone: string, gender: string }): Promise<any> => {
    const id = updatedContact.id!;
    try {
        delete updatedContact.id;
        const response = await axios.patch(`contacts/${id}`, updatedContact);
        return response.data;
    } catch (error) {
        console.error(`Error updating contact with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Deletes a contact by ID.
 * @param {string} id - The unique identifier of the contact to delete.
 * @returns {Promise<any>} A promise that resolves to the deletion confirmation.
 * @throws {Error} If the request fails or the contact is not found.
 */
export const deteleteContact = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`contacts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting contact with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Logs in a user by sending email and password to the authentication endpoint.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ contactsCount: number, accessToken: string | null }>} 
 *          An object containing the user's contact count and access token.
 * @throws {Error} Throws an error if the login process fails.
 */
export const userLogin = async (
    email: string,
    password: string
): Promise<{ contactsCount: number, accessToken: string | null }> => {
    try {
        const response = await axios.post(`auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

/**
 * Registers a new user by sending email and password to the registration endpoint.
 * 
 * @param {{ email: string, password: string }} params - An object containing user details.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<void>} Resolves if registration is successful.
 * @throws {Error} Throws an error if the registration process fails.
 */
export const userRegister = async (
    { email, password }: { email: string, password: string }
): Promise<void> => {
    try {
        await axios.post(`auth/register`, { email, password });
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};
