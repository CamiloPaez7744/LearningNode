import nodemailer, { type Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerSecretKey: string,
    private readonly postToProvider: boolean,
  ) {
    this.transporter = nodemailer.createTransport({
        service: mailerService,
        auth: {
            user: mailerEmail,
            pass: mailerSecretKey,
        },
    });
  }


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;

    try {

      if ( !this.postToProvider ) {
        console.log( 'Email sent to:', to );
        console.log( 'Subject:', subject );
        console.log( 'Body:', htmlBody );
        console.log( 'Attachments:', attachements );
        return true;
      }

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      console.log( sentInformation );

      return true;
    } catch ( error ) {
        console.error( error );
        return false;
    }

  }

}