import { createContext, ReactNode, useState } from "react";
import { api } from "../services/axios";
import Router from 'next/router'


interface LogInCreateContextProps {
    isAuthenticated: boolean;
    signIn: (user: UserSignIn) => void;
    user: User;
}

type UserSignIn = {
    email: string;
    password: string;
}

type User = {
    email: string;   
}


export const LoginContext = createContext({} as LogInCreateContextProps)

export function LoginContextProvider({children}){

    const [user, setUser] = useState<User>()

    const isAuthenticated = false;


    async function signIn({email, password}: UserSignIn){

        try{
            
            setUser({email})
        
            console.log(user)
            Router.push('/dashboard')
            
            await api.post('createuser', {data: email, password})
        }catch(err){
            console.log(err)
        }
    }   

    return (
        <LoginContext.Provider value={{ isAuthenticated, signIn, user }}>
            {children}
        </LoginContext.Provider>
        
    )
}