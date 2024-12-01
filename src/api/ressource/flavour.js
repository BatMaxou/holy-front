class Flavour {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getAll() {
        return this.apiClient.get('/flavours');
    }
}

export default Flavour;
