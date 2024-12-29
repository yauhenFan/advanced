import dotenv from 'dotenv';
dotenv.config();

const Default_User = process.env.Default_User;
const Default_Pswd = process.env.Default_Pswd;
const Invited_User = process.env.Invited_User;
const Invited_Pswd = process.env.Invited_Pswd;

export { Default_User, Default_Pswd, Invited_User, Invited_Pswd };
