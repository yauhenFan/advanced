import dotenv from 'dotenv';
dotenv.config();

const Default_User = process.env.Default_User;
const Default_Pswd = process.env.Default_Pswd;
const Invited_User = process.env.Invited_User;
const Invited_Pswd = process.env.Invited_Pswd;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;
const LT_USERNAME = process.env.LT_USERNAME;

export {
	Default_User,
	Default_Pswd,
	Invited_User,
	Invited_Pswd,
	LT_USERNAME,
	LT_ACCESS_KEY,
};
