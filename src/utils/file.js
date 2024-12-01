import { apiBaseUrl } from "./variables";

export const getFilePath = (apiFilePath) => {
    const baseUrl = apiBaseUrl.replace(/\/api$/, '');
    const path = apiFilePath.replace(/^public\//, '');

    return `${baseUrl}/${path}`;
}
