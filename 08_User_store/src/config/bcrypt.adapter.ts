import bcrypt, { compare, compareSync, hashSync } from 'bcryptjs';


export const bcryptAdapter = {

    hash: (password: string) => {
        const salt = bcrypt.genSaltSync();
        return hashSync(password, salt);
    },

    compare: (password: string, hash: string) => {
        return compareSync(password, hash);
    }
}

// export class BcryptAdapter {
//     static hash(password: string){
//         const salt = bcrypt.genSaltSync();
//         return hashSync(password, salt);
//     }

//     static compare(password: string, hash: string){
//         return compareSync(password, hash);
//     }
// }