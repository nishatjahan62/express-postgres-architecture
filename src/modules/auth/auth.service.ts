import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const signInUserFromDb = async (payload: {
  email: string;
  password: string;
}) => {
  /*
**steps for jwt
 1=> check if user exits .
 2=> compare the passwords . db user with login user..
 3=> generate JWT token 
*/

  // *** step -01
  const { email, password } = payload;
  const userInfo = await pool.query(
    `
    
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userInfo.rows.length === 0) {
    throw new Error("Invalid credentials ");
  }
  const user = userInfo.rows[0];
  // console.log(user)

  // *** step -02

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    throw new Error("Invalid credentials ");
  }

  //   *** step - 03
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    is_active: user.is_active,
  };
  const jwtSecret = config.jwtSecret as string;

  const accessToken = jwt.sign(jwtPayload, jwtSecret, { expiresIn: "1d" });

return {accessToken}

};

export const authServices = {
  signInUserFromDb,
};
