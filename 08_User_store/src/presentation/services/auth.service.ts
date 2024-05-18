import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity, type LoginUserDto } from "../../domain";
import type { EmailService } from "./email.service";



export class AuthService {
  
  constructor(
    private readonly emailService: EmailService,
  ) {}

  public async registerUser(registerUser: RegisterUserDto){
    const existingUser = await UserModel.findOne({ email: registerUser.email });
    if (existingUser) throw CustomError.conflict('User already exists');

    try {
      // encrypt password
      registerUser.password = bcryptAdapter.hash(registerUser.password);

      this.sendVerificationEmail(registerUser.email);

      const newUser = new UserModel(registerUser);
      await newUser.save();

      const {password, ...userEntity} = UserEntity.fromObject(newUser);
      const token = await JwtAdapter.generateToken({id: userEntity.id});
    if (!token) throw CustomError.internal('Error generating token');

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internal(`Error registering user: ${error}`)
    }
    
  }

  public async loginUser(loginUser: LoginUserDto){
    const existingUser = await UserModel.findOne({ email: loginUser.email });

    if (!existingUser) throw CustomError.notFound('User not found');
    if (!bcryptAdapter.compare(loginUser.password, existingUser.password)) throw CustomError.unauthorized('Incorrect password');

    const {password, ...userEntity} = UserEntity.fromObject(existingUser);
    const token = await JwtAdapter.generateToken({id: userEntity.id});
    if (!token) throw CustomError.internal('Error generating token');

    return {
      user: userEntity,
      token,
    };
  }

  private sendVerificationEmail = async (email: string) =>{
    
    const token = await JwtAdapter.generateToken({email});
    if (!token) throw CustomError.internal('Error generating token');
    
    const verificationLink = `${envs.WEBSERVICE_URL}/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click here to verify your email</p>
      <a href="${verificationLink}">Verify your email</a>
    `;

    const emailOptions = {
      to: email,
      subject: 'Verify your email',
      htmlBody: html,
    };

    const emailSent = await this.emailService.sendEmail(emailOptions);
    if (!emailSent) throw CustomError.internal('Error sending email');

    return true;
    
  }

  public async validateEmail(token: string){

    const payload = await JwtAdapter.verifyToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid token');

    const {email} = payload as {email: string};
    if (!email) throw CustomError.badRequest('Invalid email');

    const user = await UserModel.findOne({ email  });
    if (!user) throw CustomError.notFound('User not found');

    user.emailValidated = true;
    await user.save();

    return true;
  }

}