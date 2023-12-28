import './loadEnv';

export const COOKIE_NAME = process.env.COOKIE_NAME || 'default_cookie_name';
export const jwtToken = process.env.JWT_TOKEN_KEY || 'default_jwttoken_name';
export const port = process.env.PORT || '800';
