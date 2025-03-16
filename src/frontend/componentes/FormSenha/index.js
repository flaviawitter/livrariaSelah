import Input from '../Input'  
import styled from 'styled-components'
import BotaoCinza from '../BotaoCinza'
import { useForm } from "react-hook-form";
import { atualizarCliente, atualizarSenha, obterCliente } from '../../serviços/cliente';
import { useState } from "react";


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

  const onSubmit = async (data) => {
    const clienteRes = await obterCliente(idCliente);
    const senhaCliente = clienteRes.data.senha;    
    const senhaNovaCliente = data.senhaNova;
    
    if(data.senhaAtual === senhaCliente){
        // console.log("Senha Atual:", data.senhaAtual);
        // console.log("Nova Senha:", data.senhaNova);
        // console.log("Repita a Nova Senha:", data.repitaSenhaNova)

        if (data.senhaNova && data.repitaSenhaNova != null) {
            if (data.repitaSenhaNova == data.senhaNova) {
                await atualizarSenha(idCliente, senhaNovaCliente);
            }
             else {
                console.log("Senha inválida! As senhas não coincidem.");
            }
        }else{
            console.log("As senhas não podem estar em branco.")
        }    

    }else{
        console.log("As senhas atuais não coincidem!")
    }
    
  }

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