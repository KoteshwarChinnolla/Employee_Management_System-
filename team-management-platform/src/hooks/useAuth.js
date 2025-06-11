import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { user, setUser, loading } = useContext(AuthContext);
    return { user, loading, setUser };
};

export default useAuth;