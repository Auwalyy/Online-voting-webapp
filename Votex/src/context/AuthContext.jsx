import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("null");
    const [loading, setLoading] = useState(true);

    // Simulate authentication check
    useEffect(() => {
        // In a real app, you would check token or session here
        const userData = localStorage.getItem('user');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        currentUser,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};