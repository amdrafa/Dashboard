import { createContext, ReactNode, useState } from "react";
import { api } from "../services/axios";
import Router from 'next/router'


type User = {
    name: string;
    email: string;
    
    
}

interface LogInCreateContextProps {
    //isAuthenticated: boolean;
    createUser: (user: createUserProps) => void;
    //user: User;
}

type createUserProps = {
    name: string;
    email: string;
    password: string;
    
    
}


export const LoginContext = createContext({} as LogInCreateContextProps)

export function LoginContextProvider({children}){

    //let [user, setUser] = useState<User>()

    //let isAuthenticated = !!user;

    


    async function createUser({name, email, password}: createUserProps){

        try{
            //setUser({email, name: 'rafael'})
            
            console.log(email + ' that worked' + name)
            await api.post('createuser', {data: email, password, name})
            .then(response => console.log(response))
            
        
        }catch(err){
            console.log(err)
        }
    }   


    //isAutenticated e User (com informações do user) devem ser retornados dentro de mais um objeto
    // exemplo value={{createUser, user, isAutenticated } }>
    return (
        <LoginContext.Provider value={{ createUser }}> 
        
            {children}
        </LoginContext.Provider>
        
    )
}