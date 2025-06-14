export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
}


//This will be used for the auth pages like sign in, sign up, etc.