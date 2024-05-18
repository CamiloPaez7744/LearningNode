import jwt from 'jsonwebtoken';
import { envs } from './envs';

const { JWT_SECRET } = envs;


export class JwtAdapter {
    
    static async generateToken(payload: any, duration: string = '2h'){
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token);
            });
        });
    }

    static async verifyToken<T>(token: string): Promise<T|null>{
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}