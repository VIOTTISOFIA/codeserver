import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PASSWORD,
      },
    });
    await transport.verify();
    await transport.sendMail({
      from: `BABY-SHOP <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.email.toUpperCase()} REGISTERED!`,
      html: ` 
      <h1> WELCOME TO BABY-SHOP! </h1>
      <p> VERIFY CODE: ${data.code} </p>
      //REVISAR DIAPOSITIVAS PARA CONFIGURAR IMAGENES
      //https://app.postdrop.io/ PARA GENERAR PLANTILLAS PARA EL EMAIL`,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
