class Tier {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getAll() {
        return this.apiClient.get('/tiers');
    }
}

export default Tier;
