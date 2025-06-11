import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { transport, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try{
        const response = await transport
        .sendMail({
          from: sender,
          to: [email],
          subject: "Verify your account",
          html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
          category: "Verification Email",
        })
        .then(console.log, console.error);
        console.log("Verification email sent successfully:", response);
    } catch(error){
        console.error("Error sending verification email:", error);
        throw new Error(`Failed to send verification email:  ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
      const response = await transport.sendMail({
        from: sender,
        to: [email],
        subject: "Welcome to Elegance",
        html: WELCOME_EMAIL_TEMPLATE(name),
        category: "Welcome Email",
      });
      console.log("Welcome email sent successfully:", response);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transport.sendMail({
            from: sender,
            to: [email],
            subject: "Password Reset Request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Email",
        });
        console.log("Password reset email sent successfully:", response);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await transport.sendMail({
            from: sender,
            to: [email],
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Email",
        });
        console.log("Password reset success email sent successfully:", response);
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error(`Failed to send password reset success email: ${error.message}`);
    }
};