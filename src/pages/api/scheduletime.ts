import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'
import { authenticated } from "./login";




export default authenticated (async (request: NextApiRequest, response: NextApiResponse) => {
    
    if(request.method === 'POST'){

        const {startDate, endDate, speedway, vehicle, userId} = request.body

        console.log("heyyyy, new appointment created", startDate, endDate, speedway, vehicle, userId)
        
        try{
            await fauna.query(
                q.Create(
                    q.Collection('schedules'),
                    { data: {startDate, endDate, speedway, vehicle, userId} }
                )
            )

            return response.status(200).json({Message: "Appointment scheduled"})
        }catch(err){
            console.log('error when creating appointment', err)
            return response.status(400).json({error: err})
        }
        

    }else{
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
})
    