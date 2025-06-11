import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import API_BASE_URLS from '../utils/ApiEndpoints';
import { jwtDecode } from "jwt-decode";

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
    },
    loginBox: {
        background: COLORS.white,
        borderRadius: 18,
        boxShadow: `0 8px 32px 0 ${COLORS.blue}22`,
        padding: '40px 32px 32px 32px',
        minWidth: 340,
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    loginBar: {
        width: '100%',
        height: 8,
        borderRadius: 6,
        background: `linear-gradient(90deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
        marginBottom: 32
    },
    systemTitle: {
        fontSize: 22,
        fontWeight: 800,
        color: COLORS.blue,
        marginBottom: 18,
        letterSpacing: 1.5,
        textAlign: 'center',
        textShadow: `0 2px 8px ${COLORS.gray}55`
    },
    title: {
        fontSize: 28,
        fontWeight: 700,
        color: COLORS.darkBlue,
        marginBottom: 18,
        letterSpacing: 1
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: 8,
        border: `1.5px solid ${COLORS.gray}`,
        fontSize: 16,
        marginBottom: 18,
        outline: 'none'
    },
    button: {
        width: '100%',
        padding: '12px 0',
        borderRadius: 8,
        border: 'none',
        background: COLORS.blue,
        color: COLORS.white,
        fontWeight: 700,
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: `0 2px 8px ${COLORS.blue}22`,
        marginTop: 8,
        transition: 'background 0.2s'
    },
    error: {
        color: COLORS.red,
        marginBottom: 10,
        fontWeight: 500
    }
};

const Login = () => {
    const [loginType, setLoginType] = useState('employee'); // 'employee' or 'admin'
    const [employeeId, setEmployeeId] = useState('');
    const [adminId, setadminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, admin } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (admin && history) {
            history.push(`/employee/home/${admin.id}/${encodeURIComponent(admin.name)}`);
        }
    }, [admin, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (loginType === 'employee') {
                // Use AUTH service for JWT
                const response = await fetch(`${API_BASE_URLS.AUTH}/generate-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: employeeId, password })
                });
                if (!response.ok) throw new Error('Invalid credentials');
                console.log('Response Headers:', response.headers);
                const token = response.headers.get('Authorization') || response.headers.get('authorization');
                console.log('Received Token:', token);
                if (token) {
                    localStorage.setItem('jwt_token', token);
                    const payload = jwtDecode(token.replace('Bearer ', ''));
                    localStorage.setItem('jwt_payload', JSON.stringify(payload));
                    console.log('Decoded JWT Payload:', payload);
                    await login(payload); // update context
                    // Redirect based on role
                    if (payload.role && payload.role.toLowerCase() === 'admin') {
                        history.push('/admin/home');
                    } else {
                        history.push(`/employee/home/${payload.id || employeeId}/${encodeURIComponent(payload.username.replace(/ /g, '-'))}`);
                    }
                } else {
                    throw new Error('Token not found');
                }
            } else {
                // Admin login (as before)
                let apiUrl = `${API_BASE_URLS.ADMIN}/admin/getadmin?id=${encodeURIComponent(adminId)}&password=${encodeURIComponent(password)}`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Invalid credentials');
                const adminData = await response.json();
                localStorage.setItem('admin', JSON.stringify(adminData));
                await login(adminData);
                history.push('/admin/home');
            }
        } catch (error) {
            setError('Login failed. Please check your ID and password.');
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.loginBox} onSubmit={handleSubmit}>
                <div style={styles.loginBar}></div>
                <div style={styles.systemTitle}>EMPLOYEE Management System</div>
                <div style={styles.title}>
                    {loginType === 'employee' ? 'Employee Login' : 'Admin Login'}
                </div>
                {error && <div style={styles.error}>{error}</div>}
                <input
                    style={styles.input}
                    type="text"
                    placeholder={loginType === 'employee' ? "Enter your Employee ID" : "Enter your Admin ID"}
                    value={loginType === 'employee' ? employeeId : adminId}
                    onChange={(e) => loginType === 'employee' ? setEmployeeId(e.target.value) : setadminId(e.target.value)}
                    required
                    autoFocus
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button style={styles.button} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;