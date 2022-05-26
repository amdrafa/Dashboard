import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'



export default async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'POST'){

        const {startDate, endDate, speedway, vehicle, user} = request.body

        console.log("heyyyy, new appointment created", startDate, endDate, speedway, vehicle, user)
        
        try{
            await fauna.query(
                q.Create(
                    q.Collection('schedules'),
                    { data: {startDate, endDate, speedway, vehicle, user} }
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
    