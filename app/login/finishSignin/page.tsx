'use client'
// pages/finishSignIn.tsx
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink, updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { SignUpForm } from "@/components/signup-form";
import { SignUpFinishForm } from "@/components/signup-finish-form";

export default function FinishSignIn() {
    const [password, setPassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const email = window.localStorage.getItem("emailForSignIn");

        if (isSignInWithEmailLink(auth, window.location.href) && email) {
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem("emailForSignIn");
                    setShowPasswordForm(true); // Show form to set password
                })
                .catch((error) => {
                    console.error("Error signing in with email link", error);
                });
        }
    }, []);

    const handleSetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updatePassword(user, password);
                alert("Password set successfully!");
                router.push("/users"); // redirect to your main app
            } catch (err) {
                console.error("Failed to set password:", err);
            }
        }
    };

    return (
        // <div className="p-4">
        <>
            {showPasswordForm && (
                <>
                    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                        <div className="flex w-full max-w-sm flex-col gap-6">
                            {/* <a href="#" className="flex items-center gap-2 self-center font-medium">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                          </div>
                          Acme Inc.
                        </a> */}
                            <SignUpFinishForm
                                password={password}
                                setPassword={setPassword}
                                handleSetPassword={handleSetPassword}
                            />
                        </div>
                    </div>
                    <h2>Set Your Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
                    />
                    {/* <button onClick={handleSetPassword}>Set Password</button> */}
                </>
            )}
        </>
        // </div>
    );
}
