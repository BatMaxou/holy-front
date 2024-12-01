import { apiBaseUrl } from "../utils/variables";
import Flavour from "./ressource/flavour";

class ApiClient {
    constructor() {
        this.baseUrl = apiBaseUrl;
        this.flavour = new Flavour(this);
        this.token = null;
    }

    async get(url) {
        return fetch(`${this.baseUrl}${url}`, this.token ? { headers: { Authorization: `Bearer ${this.token}` } } : null)
            .then(response => response.json())
    }

    async post(url, body, additionnalHeaders = {}) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...additionnalHeaders,
        }

        return fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                ...headers,
                Authorization: this.token ? `Bearer ${this.token}` : null
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
    }
}

const apiClient = new ApiClient()

export default apiClient
