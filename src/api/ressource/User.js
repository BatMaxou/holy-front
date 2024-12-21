class User {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async otp(data) {
        return this.apiClient.post('/otp/verify', {
            username: data.username ?? '',
            otp: data.password ?? '',
        }, {
            'Authorization': null,
        });
    }

    async createPassword(data) {
        return this.apiClient.post('/create-password', {
            username: data.username ?? '',
            password: data.password ?? '',
            otp: data.otp ?? '',
        }, {
            'Authorization': null,
        });
    }
}

export default User;
