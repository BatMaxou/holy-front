class TierList {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getItems() {
        return this.apiClient.get('/tier-list/products');
    }

    async updateItem({ id, tier, order }) {
        return this.apiClient.patch(`/tier-list/products/${id}`, { tier, order });
    }
}

export default TierList;
