// firebase/emailAuth.ts
import { auth } from "./firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

export async function sendMagicLink(email: string) {
    const actionCodeSettings = {
        url: "http://localhost:3000/login/finishSignin", // redirect URL after user clicks the link
        handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    // Save email locally to complete login
    window.localStorage.setItem("emailForSignIn", email);
}
