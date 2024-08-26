// EmailContext.tsx
'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EmailContextType {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial value of `undefined`
const EmailContext = createContext<EmailContextType | undefined>(undefined);

interface EmailProviderProps {
    children: ReactNode;
}

export const EmailProvider = ({ children }: EmailProviderProps) => {
    const [email, setEmail] = useState<string>("");

    return (
        <EmailContext.Provider value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
};

export const useEmail = (): EmailContextType => {
    const context = useContext(EmailContext);
    if (context === undefined) {
        throw new Error("useEmail must be used within an EmailProvider");
    }
    return context;
};
