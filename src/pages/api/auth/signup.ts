import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = checkValidation(req);

    // throw first error of array
    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

    // check if email is existing
    const userWithEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    res.status(200).json({
      hello: "there",
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
