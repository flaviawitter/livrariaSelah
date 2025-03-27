import axios from "axios";

async function verificarLogin(email, senha) {
    try {
        const response = await axios.post("http://localhost:5000/api/login", {
            email,
            senha,
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
}



export {
    verificarLogin
} 

