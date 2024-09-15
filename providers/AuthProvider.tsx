import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";


type AuthContextType = {
    session: Session | null;
    user: User | null;
    isReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isReady: false
});

export default function AuthProvider ({children}: PropsWithChildren) {

    const [session, setSession] = useState<Session | null>(null);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        })
        
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
        setIsReady(true);
    }, [])


    return (
        <AuthContext.Provider value={{session, user: session?.user, isReady}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);