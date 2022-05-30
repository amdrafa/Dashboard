import { createContext, ReactNode, useState } from "react";
import { api } from "../services/axios";
import Router from 'next/router'


type User = {
    email: string;
    name: string;
}

interface LogInCreateContextProps {
    isAuthenticated: boolean;
    signIn: (user: UserSignIn) => void;
    user: User;
}

type UserSignIn = {
    email: string;
    password: string;
}


export const LoginContext = createContext({} as LogInCreateContextProps)

export function LoginContextProvider({children}){

    let [user, setUser] = useState<User>()

    let isAuthenticated = !!user;

    


    async function signIn({email, password}: UserSignIn){

        try{
            

            setUser({email, name: 'rafael'})
        
            Router.push('/dashboard')
            console.log(user.email + ' that worked' + user.name)
            await api.post('createuser', {data: email, password})
            
            

            
        
        }catch(err){
            console.log(err)
        }
    }   

    return (
        <LoginContext.Provider value={{ isAuthenticated, signIn, user  }}>
            {children}
        </LoginContext.Provider>
        
    )
}