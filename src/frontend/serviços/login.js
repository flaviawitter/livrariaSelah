import axios from "axios";

const loginAPI = "http://localhost:5000/api/login";

async function verificarLogin(email, senha) {
    try {
        const response = await axios.post(loginAPI, { email, senha }); // Agora usa POST
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
}

export { verificarLogin };
