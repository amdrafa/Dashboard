import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'POST'){

        const {data: email, password} = request.body

        console.log("heyyyy, new user registered", email, password)
        
        try{
            await fauna.query(
                q.If(
                    q.Not(
                        q.Exists(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email) 
                            )
                        )
                    ),
                    q.Create(
                        q.Collection('users'),
                        { data: {email} }
                    ),
                    q.Get(
                        q.Match(
                            q.Index('user_by_email'),
                            q.Casefold(email) 
                        )
                    )
                )
            )

            return true
        }catch(err){
            console.log('error when adding user to database', err)
            return false
        }
        

    }else{
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}
    