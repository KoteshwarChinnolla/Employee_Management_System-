import React, { useState, useEffect } from 'react';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';

const Settings = () => {
    const [employee, setEmployee] = useState(null);
    const [form, setForm] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        role: '',
        department: '',
        position: '',
        joinDate: '',
        skills: [],
    });
    const [newSkill, setNewSkill] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // If admin is editing, get employee from localStorage
        const editEmp = localStorage.getItem('edit_employee');
        if (editEmp) {
            const data = JSON.parse(editEmp);
            setEmployee(data);
            setForm({
                id: data.id,
                name: data.name || '',
                phoneNumber: data.phoneNumber || data.contact?.phoneNumber || '',
                email: data.email || '',
                password: data.password || '',
                role: data.role || '',
                department: data.department || '',
                position: data.position || '',
                joinDate: data.joinDate || '',
                skills: Array.isArray(data.skills) ? data.skills : [],
            });
            setLoading(false);
            localStorage.removeItem('edit_employee');
            return;
        }
        // Fetch employee details (same as Home.jsx)
        const payload = JSON.parse(localStorage.getItem('jwt_payload'));
        if (payload?.username) {
            const employeeName = payload.username.replace(/_/g, ' ').replace(/ /g, '-');
            fetch(`${API_BASE_URLS.EMPLOYEE}/employee/getEmployeeByName/${employeeName}`)
                .then(res => res.json())
                .then(data => {
                    setEmployee(data);
                    setForm({
                        id: data.id,
                        name: data.name || '',
                        phoneNumber: data.contact?.phoneNumber || '',
                        email: data.email || '',
                        password: data.password || '',
                        role: data.role || '',
                        department: data.department || '',
                        position: data.position || '',
                        joinDate: data.joinDate || '',
                        skills: Array.isArray(data.skills) ? data.skills : [],
                    });
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSkill = () => {
        const skill = newSkill.trim();
        if (skill && !form.skills.includes(skill)) {
            setForm(prev => ({
                ...prev,
                skills: [...prev.skills, skill]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setForm(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skill)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        // Prepare payload exactly as required
        const payload = {
            id: form.id,
            version: null,
            name: form.name,
            phoneNumber: form.phoneNumber,
            email: form.email,
            password: form.password,
            role: form.role,
            department: form.department,
            position: form.position,
            joinDate: form.joinDate,
            skills: form.skills,
            employeeTeams: []
        };
        await fetch(`${API_BASE_URLS.ADMIN}/employee/updateEmployee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        setSuccess(true);
    };

    if (loading) return <div style={{textAlign: 'center', marginTop: 80}}>Loading settings...</div>;

    return (
        <div
            style={{
                minHeight: '100vh',
                background: `linear-gradient(120deg, ${COLORS.lightBlue} 0%, ${COLORS.white} 100%)`,
                padding: '40px 0'
            }}
        >
            <div
                style={{
                    maxWidth: 600,
                    margin: '0 auto',
                    background: COLORS.white,
                    borderRadius: 18,
                    boxShadow: '0 8px 32px 0 #b6c6e633',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        background: `linear-gradient(90deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
                        padding: '28px 0 18px 0',
                        textAlign: 'center'
                    }}
                >
                    <h2 style={{
                        color: COLORS.white,
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 28,
                        letterSpacing: 1
                    }}>
                        Edit Your Details
                    </h2>
                </div>
                <div style={{
                    borderBottom: `2px solid ${COLORS.gray}`,
                    margin: '0 32px 0 32px'
                }} />
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 24,
                        padding: '32px',
                        background: COLORS.white
                    }}
                >
                    <div style={{gridColumn: '1 / -1', marginBottom: 8, textAlign: 'center'}}>
                        <span style={{
                            color: COLORS.darkBlue,
                            fontWeight: 500,
                            fontSize: 16
                        }}>
                            Fields marked <span style={{color: COLORS.red}}>*</span> are required
                        </span>
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Name <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Email <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Password <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Role <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            placeholder="Enter department"
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Position <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="text"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Join Date <span style={{color: COLORS.red}}>*</span></label>
                        <input
                            type="date"
                            name="joinDate"
                            value={form.joinDate}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 8,
                                border: `1.5px solid ${COLORS.gray}`,
                                marginTop: 6,
                                fontSize: 15,
                                transition: 'border 0.2s',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>
                    <div style={{gridColumn: '1 / -1'}}>
                        <label style={{fontWeight: 500, color: COLORS.blue}}>Skills</label>
                        <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                            <input
                                type="text"
                                name="newSkill"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    borderRadius: 8,
                                    border: `1.5px solid ${COLORS.gray}`,
                                    fontSize: 15,
                                    outline: 'none'
                                }}
                                placeholder="Add a skill"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSkill();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                style={{
                                    background: COLORS.blue,
                                    color: COLORS.white,
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '0 18px',
                                    fontWeight: 600,
                                    fontSize: 15,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 32}}>
                            {form.skills.map((skill, idx) => (
                                <span key={idx} style={{
                                    background: COLORS.gray,
                                    color: COLORS.darkBlue,
                                    borderRadius: 12,
                                    padding: '6px 14px',
                                    fontWeight: 500,
                                    fontSize: 15,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6
                                }}>
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: COLORS.red,
                                            fontWeight: 700,
                                            marginLeft: 4,
                                            cursor: 'pointer',
                                            fontSize: 16,
                                            lineHeight: 1
                                        }}
                                        aria-label={`Remove ${skill}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', marginTop: 8}}>
                        <button
                            type="submit"
                            style={{
                                background: `linear-gradient(90deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
                                color: COLORS.white,
                                padding: '12px 38px',
                                border: 'none',
                                borderRadius: 10,
                                fontWeight: 700,
                                fontSize: 18,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px #0002',
                                transition: 'background 0.2s, transform 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Update Details
                        </button>
                        {success && (
                            <div style={{
                                color: COLORS.green,
                                marginTop: 18,
                                fontWeight: 600,
                                fontSize: 16
                            }}>
                                Details updated successfully!
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;