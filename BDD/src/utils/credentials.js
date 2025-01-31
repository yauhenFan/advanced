import dotenv from 'dotenv';
dotenv.config();

const Default_User1 = process.env.Default_User1;
const Default_Pswd1 = process.env.Default_Pswd1;
const Invited_User = process.env.Invited_User;
const Invited_Pswd = process.env.Invited_Pswd;

export { Default_User1, Default_Pswd1, Invited_User, Invited_Pswd };
