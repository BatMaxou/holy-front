import { apiBaseUrl } from "../utils/variables";
import Tier from "./ressource/Tier";
import TierList from "./ressource/TierList";
import User from "./ressource/User";

class ApiClient {
    constructor() {
        this.baseUrl = apiBaseUrl;
        this.tierList = new TierList(this);
        this.tier = new Tier(this);
        this.user = new User(this);
    }

    async get(url) {
        const token = localStorage.getItem('token');

        return fetch(`${this.baseUrl}${url}`, token ? { headers: { Authorization: `Bearer ${token}` } } : null)
            .then(response => response.json())
    }

    async patch(url, body, additionnalHeaders = {}) {
        const token = localStorage.getItem('token');

        const headers = {
            'Accept': 'application/merge-patch+json',
            'Content-Type': 'application/merge-patch+json',
            'Authorization': token ? `Bearer ${token}` : null,
            ...additionnalHeaders,
        }

        return fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
    }

    async post(url, body, additionnalHeaders = {}) {
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : null,
            ...additionnalHeaders,
        }

        return fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
            .then(response => ({res: response.json(), status: response.status}))
    }

    async login(data) {
        return this.post('/login', {
            username: data.username ?? '',
            password: data.password ?? '',
        }, {
            'Authorization': null,
        }).then(({res, status}) => {
            if (status === 200) {
                res.then(data => localStorage.setItem('token', data.token));
            }

            return { res, status };
        });
    }

    async isLogged() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            return false;
        }

        const testCall = await this.tier.getAll();
        if (testCall.code === 401) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    }
}

const apiClient = new ApiClient()

export default apiClient
