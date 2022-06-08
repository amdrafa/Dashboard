import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'POST'){

        const {data: email, password, name} = request.body

        console.log("heyyyy, tried to register someone", email, password)
        
        try{

            const createdAt = new Date().toLocaleDateString('EN-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

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
                        { data: {name, email, password, createdAt, companyRef: ''} }
                    ),
                    q.Get(
                        q.Match(
                            q.Index('user_by_email'),
                            q.Casefold(email) 
                        )
                    )
                )
            )

        return response.status(200).json({})
        }catch(err){
            console.log('error when adding user to database', err)
            return response.status(400)
        }
        

    }else{
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}
    