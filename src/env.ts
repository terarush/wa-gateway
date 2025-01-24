import dotenv from 'dotenv';

dotenv.config()

const ENV = {
  SECRET_TOKEN: process.env.SECRET_TOKEN || 'admin',
  PORT: process.env.PORT || 3000,
  NAME: process.env.NAME || 'MEGUMIN',
  GROQ_TOKEN: process.env.GROQ_TOKEN,
  NODE_ENV: process.env.NODE_ENV || 'DEVELOPMENT',
  GEMINI_TOKEN: process.env.GEMINI_TOKEN || ""
}

export default ENV;
