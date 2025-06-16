// const API_BASE_URL = 'https://wf25sa44yk.execute-api.us-east-1.amazonaws.com'; // Replace with your actual backend URL

const API_BASE_URL = 'http://localhost:'; // Replace with your actual backend URL
const API_BASE_URLS = {
    AUTH: `${API_BASE_URL}8081`,
    EMPLOYEE: `${API_BASE_URL}8080/employee`,
    ADMIN: `${API_BASE_URL}8082/admin`,
    TICKET: `${API_BASE_URL}8083/tickets`
};

export default API_BASE_URLS;
