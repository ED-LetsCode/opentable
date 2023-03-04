import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, email, phone, city, password } = req.body;

    const errors: string[] = checkValidation(req);

    // throw first error of array
    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

    // check if email is existing
    const userWithEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    // if email is existing return error message
    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstname,
        last_name: lastname,
        password: hashedPassword,
        city: city,
        phone: phone,
        email: email,
      },
    });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // create json webtoken
    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    res.status(200).json({
      user: user,
    });
  }
}

function checkValidation(req: NextApiRequest): string[] {
  const { firstname, lastname, email, phone, city, password } = req.body;
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstname, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastname, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
      }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong enough",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) errors.push(check.errorMessage);
  });

  return errors;
}
