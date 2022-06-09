import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'
import { useState } from "react";
import { authenticated } from "./login";


interface UserProps{
    name: string;
    email: string;
    companyRef: string;
}


interface UserDataProps {
    ref: string;
    ts: string;
    data: UserProps[]
  }

export default authenticated (async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'GET'){


        console.log("TEST GETTING ALL USERS")

        
        
        try{

            

            const {data} = await fauna.query<UserDataProps>(
                q.Map(
                    q.Paginate(
                        q.Match(q.Index('all_users'))
                    ),
                    q.Lambda(x => q.Get(x))
                )
            )

            

            

            let page = request.url.substr(22, 1)
            const per_page = 6
            
            const slicedData = () => {
                const pageStart = (Number(page) - 1)*(per_page)
                const pageEnd = pageStart + per_page
                const mySlicedData = data.slice(pageStart,pageEnd)
                
                console.log(mySlicedData)
                return mySlicedData
            }
           
            
            const PaginateData = slicedData()
            
            
            
            return response.status(200).json({PaginateData})
        }catch(err){
            console.log('error when getting all companies', err)
            return false
        }
        

    }else{
        response.setHeader('Allow', 'GET')
        response.status(405).end('Method not allowed')
    }
})
    