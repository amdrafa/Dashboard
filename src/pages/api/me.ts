import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'
import { useState } from "react";
import {decode} from 'jsonwebtoken'
import { authenticated } from "./login";


interface speedwayProps{
    speedway: string;
    vehicles_limit: number;
    description: string;
    createdAt: string;
}


interface speedwayDataProps {
    ref: string;
    ts: string;
    data: speedwayProps[]
  }

  interface UserDataProps {
    name: string;
    email: string;
    password: string;
    createdAt: string;
    companyRef: string;
    roles: string[];
  }

  export type DecodedToken = {
    sub: string;
  }

  type User = {
    name: string;
    email: string; 
    roles: string[];
}

export default authenticated (async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'GET'){


        console.log("Me route. Responsable for bringing all the user informations.")

        
        try{
            
            const auth = request.headers.authorization;
                
            const decoded = decode(auth as string) as DecodedToken;

            const email = decoded.sub;
                


            const userData: UserDataProps = await fauna.query(
                q.If(
                  q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))),
                  q.Abort(`E-mail doesn't exist.`),
                  q.Select("data", q.Get(q.Match(q.Index("user_by_email"), email)))
                )
              );
            
            
            return response.status(200).json({name: userData.name, email: userData.email, roles: userData.roles})
        }catch(err){
            console.log('error when calling "me" route. ', err)
            return false
        }
        

    }else{
        response.setHeader('Allow', 'GET')
        response.status(405).end('Method not allowed')
    }
})
    