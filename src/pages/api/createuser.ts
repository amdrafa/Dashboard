import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";
import { hash } from "bcrypt";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const { data: email, password, name } = request.body;

    hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.

      console.log("heyyyy, tried to register someone", email, password);

      try {
        const createdAt = new Date().toLocaleDateString("EN-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), {
              data: { name, email, password: hash, createdAt, companyRef: "", roles: ["USER"] },
            }),
            q.Abort("Email already exists")
          )
        );

        return response.status(200).json({});
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
