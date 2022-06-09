import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/axios";
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type User = {
    name: string;
    email: string;
    
    
}

interface LogInCreateContextProps {
    //isAuthenticated: boolean;
    createUser: (user: createUserProps) => void;
    loginAuth: (user:loginProps) => void;
    //user: User;
}

type loginProps = {
    email: string;
    password: string;
}

type createUserProps = {
    name: string;
    email: string;
    password: string; 
}

type authProviderProps = {
    children: ReactNode;
}


export const LoginContext = createContext({} as LogInCreateContextProps)

export function LoginContextProvider({children}:authProviderProps){

    //let [user, setUser] = useState<User>()
    const [status, setStatus] = useState(0)
    const [statusLogin, setStatusLogin] = useState(0)
    //let isAuthenticated = !!user;

    useEffect(() => {
        {status == 200 && Router.push('/successredirect')}
 
    }, [status])

    useEffect(() => {
        {statusLogin == 200 && Router.push('/dashboard')}

    }, [statusLogin])

    async function loginAuth({email, password}:loginProps){
        try{
            await api.post('login', {data: email, password})
            .then(response => console.log(setStatusLogin(response.status)))

            

        }catch(err){
            console.log(err)
            toast.error('E-mail or password incorrect.')
        }
    }


    async function createUser({name, email, password}: createUserProps){

        try{   
            //setUser({email, name: 'rafael'})
            await api.post('createuser', {data: email, password, name})
            .then(response => console.log(setStatus(response.status)))

        }catch(err){
            setStatus(err.response.status)
            toast.error('This e-mail is already registered.')

        }
    }   


    //isAutenticated e User (com informações do user) devem ser retornados dentro de mais um objeto
    // exemplo value={{createUser, user, isAutenticated } }>
    return (
        <LoginContext.Provider value={{ createUser, loginAuth }}> 
            <ToastContainer theme="colored" />
            {children}
        </LoginContext.Provider>
        
    )
}