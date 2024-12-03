import { apiBaseUrl } from "../utils/variables";
import Tier from "./ressource/Tier";
import TierList from "./ressource/TierList";

class ApiClient {
    constructor() {
        this.baseUrl = apiBaseUrl;
        this.tierList = new TierList(this);
        this.tier = new Tier(this);
        this.token = null;
    }

    async get(url) {
        return fetch(`${this.baseUrl}${url}`, this.token ? { headers: { Authorization: `Bearer ${this.token}` } } : null)
            .then(response => response.json())
    }

    async patch(url, body, additionnalHeaders = {}) {
        const headers = {
            'Accept': 'application/merge-patch+json',
            'Content-Type': 'application/merge-patch+json',
            ...additionnalHeaders,
        }

        return fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
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
