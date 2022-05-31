import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'

interface companyProps{
    company: string;
    cnpj: string;
    responsable_name: string;
    email: string;
    companySecretKey: string;
}


interface companyDataProps {

    data: {
        ref: string;
        ts: string;
        data: companyProps[]
    }

  }

export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'GET'){


        console.log("TEST GETTING ALL COMPANIES")
        
        try{
            const companies = await fauna.query<companyDataProps>(
                q.Map(
                    q.Paginate(
                        q.Match(q.Index('all_companies'))
                    ),
                    q.Lambda(x => q.Get(x))
                )
            )

            const {data} = companies
            response.status(200).json({data})
            return response.status(200).json({companies})
        }catch(err){
            console.log('error when getting all companies', err)
            return false
        }
        

    }else{
        response.setHeader('Allow', 'GET')
        response.status(405).end('Method not allowed')
    }
}
    