import Input from '../../Inputs/Input'  
import styled from 'styled-components'
import BotaoCinza from '../../Botões/BotaoCinza'
import { useForm } from "react-hook-form";
import { atualizarCliente, atualizarSenha, obterCliente } from '../../../serviços/cliente';
import bcrypt from "bcryptjs"
import { useToast } from "../../Context/ToastContext";


const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100%;
    margin: 15px;
`
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
    margin-bottom: 5px;
`

const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    min-width: 80px;
    color: #C7511B;
`
const Opcoes = styled.ul`
    display: flex;
    flex-direction: collumn;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start; 
    padding: 0;
    list-style-type: none;
    margin-top: 0;
`

function FormSenha({ idCliente }) {
    const {
        register,
        handleSubmit,
    } = useForm(
        {
        mode: "onBlur"
        }
    )

    const { showToast } = useToast();

    const onSubmit = async (data) => {
        try {
            const clienteRes = await obterCliente(idCliente);
            const senhaCliente = clienteRes.data.senha;  // Senha criptografada no banco
    
            // Comparando a senha digitada com a criptografada
            const senhaCorreta = await bcrypt.compare(data.senhaAtual, senhaCliente);
            
            if (!senhaCorreta) {
                console.log("A senha atual está incorreta!");
                showToast("A senha atual está incorreta!", "error");
                return;
            }
    
            if (!data.senhaNova || !data.repitaSenhaNova) {
                console.log("As senhas não podem estar em branco.");
                showToast("As senhas não podem estar em branco.", "error");
                return;
            }
    
            if (data.senhaNova !== data.repitaSenhaNova) {
                console.log("Senha inválida! As senhas não coincidem.");
                showToast("Senha inválida! As senhas não coincidem.", "error");
                return;
            }
    
            // Atualiza a senha
            await atualizarSenha(idCliente, data.senhaNova);
            console.log("Senha atualizada com sucesso!");
            showToast("Senha atualizada com sucesso!", "success");
    
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            showToast("Erro ao atualizar a senha. Tente novamente.", "error");
        }
    };

    return (

        <FormContainer >
            <form onSubmit={handleSubmit(onSubmit)}>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Senha</Titulo>
           
            <Opcoes>
            <li key={"senhaAtual"} style={{ width: "48%" }}>
                    <Input  id="senha-atual" placeholder={"Senha Atual"} type="password" {...register("senhaAtual")} />
            </li>
            <li style={{  width: "48%", textAlign: "left", marginTop: "8px" }}>
                <BotaoCinza id="senha-botaoAtualizar" style={{ fontSize: "14px"}} type="submit"> Alterar Senha</BotaoCinza>
            </li>
            <li key={"senhaNova"} style={{ width: "48%" }}>
                    <Input id="senha-nova" placeholder={"Senha Nova"} type="password" {...register("senhaNova")} />
            </li>
            <li key={"repitaSenhaNova"} style={{ width: "48%" }}>
                    <Input id="senha-repetirNova" placeholder={"Repita a Senha Nova"} type="password" {...register("repitaSenhaNova")} />
            </li>
            </Opcoes>
</form> 
       </FormContainer>
    )

}

export default FormSenha;