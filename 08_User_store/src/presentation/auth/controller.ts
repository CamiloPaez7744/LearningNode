import { Request, Response,  } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";



export class AuthController {
    //DI
    constructor(
        public readonly authService: AuthService
    ) {
    }

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        res.status(500).json({error: 'An error occurred'});
    }

    registerUser = (req: Request, res: Response) =>{
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.registerUser(registerUserDto!)
            .then((result) => res.json({result}))
            .catch((error) => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) =>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authService.loginUser(loginUserDto!)
            .then((result) => res.json({result}))
            .catch((error) => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) =>{
        const {token} = req.params;
        
        this.authService.validateEmail(token)
            .then((result) => res.json({result}))
            .catch((error) => this.handleError(error, res));
    }
}