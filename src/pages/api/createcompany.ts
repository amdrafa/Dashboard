import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'



export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'POST'){

        const {data:company, cnpj, responsable_name, email} = request.body

        console.log("heyyyy, I am at createCompany api" + company, cnpj, responsable_name, email)
        
        try{
            await fauna.query(
                q.Create(
                    q.Collection('companies'),
                    { data: {company, cnpj, responsable_name, email} }
                )
            )

            return true
        }catch(err){
            console.log('error when creating company', err)
            return false
        }
        

    }else{
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}
    