import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";
import { compare, hash,  } from "bcrypt";

interface HashedPasswordProps {
        name: string;
        email: string;
        password: string;
        createdAt: string;
        companyRef: string;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const { data: email, password } = request.body;

    hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.

      console.log("Login starting...", email, password);

      try {
        const hashedPassword:HashedPasswordProps = await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Abort(`E-mail doesn't exist.`
            ),
            q.Select(
                "data",
                q.Get(
                    q.Match(
                        q.Index("user_by_email"),
                        email
                    )
                )
            )
          )
        );

        

        compare(password, hashedPassword.password , function(err, result) {
            if(!err && result){
                console.log(password + 'worked' + err, result)
                return response.status(200).json({message: 'Correct password'});
                
            }else{
                console.log(hashedPassword.password + 'not working' + err, result)
                return response.status(400).json({message: 'Incorrect password'});
            }
        });

        
      } catch (err) {
        console.log("error when adding user to database", err);
        return response.status(400).json({});
      }
    });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
