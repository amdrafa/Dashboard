import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'


type DataProps = {
    name: string;
    email:string
}

export default async (request: NextApiRequest, response: NextApiResponse) => {

    
    
    if(request.method === 'POST'){

        const {data: code, session} = request.body
        const { name, email } = session.user

        console.log("heyyyy, tried to register someone", code, name, email, session)
        
        try{
            const createdAt = new Date().toLocaleDateString('EN-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

            const companyRef = await fauna.query<DataTransfer>(
                q.If(
                    q.Exists(
                        q.Match(
                            q.Index('company_by_code'),
                            code
                        )
                    ),
                    q.Select(
                        "ref",
                        q.Get(
                            q.Match(
                                q.Index('company_by_code'),
                                code
                            )
                        )
                    ),
                    q.Abort('Company not found')
                )
            )


            await fauna.query(
                q.If(
                    q.Exists(
                        q.Match(
                            q.Index('company_by_code'),
                            code
                        ) 
                    ),
                    q.Create(
                        q.Collection('users'),
                        { data: {name, email, companyRef, createdAt} }
                    ),
                    q.Abort('Company not found')
                )
            )


            return response.status(200).json({name, email})
        }catch(err){
            console.log('error when connecting user to company', err)
            return response.status(400).json({name, email, err})
        }
        

    }else{
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}
    