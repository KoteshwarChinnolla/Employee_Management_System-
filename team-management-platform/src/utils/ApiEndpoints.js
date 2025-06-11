const API_BASE_URL = 'https://wf25sa44yk.execute-api.us-east-1.amazonaws.com'; // Replace with your actual backend URL

const API_BASE_URLS = {
    AUTH: `${API_BASE_URL}/auth`,
    EMPLOYEE: `${API_BASE_URL}/employee`,
    ADMIN: `${API_BASE_URL}/admin`
};

export default API_BASE_URLS;
