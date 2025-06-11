import React, { useState, useEffect } from 'react';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';

const getProfileCompleteness = (employee) => {
    if (!employee) return 0;
    let total = 7, filled = 0;
    if (employee.name) filled++;
    if (employee.email) filled++;
    if (employee.position) filled++;
    if (employee.department) filled++;
    if (employee.skills?.length) filled++;
    if (employee.achivements?.length) filled++;
    if (employee.projects?.length) filled++;
    return Math.round((filled / total) * 100);
};

const Home = () => {
    const [employee, setEmployee] = useState(null);
    const [todayThought, setTodayThought] = useState(null);
    const [showSkillTooltip, setShowSkillTooltip] = useState(null);
    const [showAchTooltip, setShowAchTooltip] = useState(null);

    useEffect(() => {
        // Get JWT payload from localStorage
        const payload = JSON.parse(localStorage.getItem('jwt_payload'));
        if (payload?.username) {
            const employeeName = payload.username.replace(/_/g, ' ');
            fetch(`${API_BASE_URLS.EMPLOYEE}/employee/getEmployeeByName/${employeeName.replace(/ /g, '-')}`)
                .then(res => res.json())
                .then(data => setEmployee(data))
                .catch(() => setEmployee(null));
        }
    }, []);

    useEffect(() => {
        // Fetch thoughts as before (if needed)
        const fetchThoughts = async () => {
            try {
                const response = await fetch('/data/thoughts.json');
                const thoughtsData = await response.json();
                const today = new Date().toISOString().split('T')[0];
                const todaysThought = thoughtsData.thoughts.find(t => t.date === today) || thoughtsData.thoughts[0];
                setTodayThought(todaysThought);
            } catch (error) {
                setTodayThought(null);
            }
        };
        fetchThoughts();
    }, []);

    if (!employee) return <div style={{textAlign: 'center', marginTop: 80}}>Loading your profile...</div>;

    const completeness = getProfileCompleteness(employee);

    return (
        <div style={{
            padding: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            background: `linear-gradient(120deg, ${COLORS.gray} 0%, ${COLORS.white} 100%)`,
            minHeight: '100vh'
        }}>
            {/* Greeting */}
            <div style={{
                marginBottom: 18,
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.darkBlue,
                letterSpacing: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 10
            }}>
                👋 Hello, <span style={{color: COLORS.blue}}>{employee.name.split(' ')[0]}</span>!
            </div>

            {/* Profile completeness bar */}
            <div style={{
                marginBottom: 24,
                background: '#e3e3e3',
                borderRadius: 8,
                overflow: 'hidden',
                height: 18,
                boxShadow: '0 1px 4px #0001'
            }}>
                <div style={{
                    width: `${completeness}%`,
                    background: `linear-gradient(90deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
                    height: '100%',
                    transition: 'width 0.7s cubic-bezier(.4,2,.6,1)'
                }} />
                <span style={{
                    position: 'absolute',
                    marginLeft: 12,
                    fontSize: 13,
                    color: COLORS.darkBlue
                }}>
                    Profile {completeness}% complete
                </span>
            </div>

            <div
                style={{
                    background: `linear-gradient(120deg, ${COLORS.white} 0%, ${COLORS.gray} 100%)`,
                    padding: '32px',
                    borderRadius: '18px',
                    marginBottom: '32px',
                    boxShadow: '0 8px 32px 0 #b6c6e633',
                    transition: 'box-shadow 0.3s',
                    ':hover': { boxShadow: '0 12px 36px 0 #b6c6e655' }
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 32,
                        flexWrap: 'wrap'
                    }}
                >
                    {/* Responsive: On mobile, avatar left to name, else as before */}
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
                            color: COLORS.white,
                            fontSize: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            boxShadow: '0 2px 12px #007bff33',
                            border: `4px solid ${COLORS.gray}`,
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                            marginRight: 0,
                            marginBottom: 0,
                            // Move avatar left to name on mobile
                            ...(window.innerWidth <= 600
                                ? { marginRight: 18, marginBottom: 0, order: 0 }
                                : {})
                        }}
                        title="Your avatar"
                    >
                        {employee.name[0]}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        ...(window.innerWidth <= 600
                            ? { order: 1 }
                            : {})
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontWeight: 700,
                            fontSize: 32,
                            color: COLORS.darkBlue,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        }}>
                            {/* On mobile, avatar is already left, so just name */}
                            {employee.name}
                        </h1>
                        <div style={{fontSize: 18, color: COLORS.blue, margin: '6px 0 0 0'}}>
                            <span style={{marginRight: 16}}><b>Role:</b> {employee.role}</span>
                            <span style={{marginRight: 16}}><b>Position:</b> {employee.position}</span>
                            <span><b>Department:</b> {employee.department}</span>
                        </div>
                        <div style={{fontSize: 16, color: COLORS.yellow, marginTop: 4}}>
                            <span><b>Team:</b> {employee.team?.teamName}</span>
                        </div>
                        <div style={{fontSize: 15, color: '#888', marginTop: 4}}>
                            <span><b>Email:</b> {employee.email}</span>
                            <span style={{marginLeft: 16}}><b>Phone:</b> {employee.contact?.phoneNumber}</span>
                        </div>
                        <div style={{fontSize: 15, color: '#888', marginTop: 4}}>
                            <span><b>Joined:</b> {employee.joinDate}</span>
                            {employee.dob && <span style={{marginLeft: 16}}><b>DOB:</b> {employee.dob}</span>}
                            {employee.address && <span style={{marginLeft: 16}}><b>Address:</b> {employee.address}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
                marginBottom: '32px'
            }}>
                {/* Skills */}
                <div style={{
                    background: COLORS.white,
                    borderRadius: '14px',
                    padding: '22px',
                    boxShadow: `0 2px 8px ${COLORS.blue}11`,
                    transition: 'transform 0.2s',
                    ':hover': { transform: 'scale(1.03)' }
                }}>
                    <h3 style={{color: COLORS.blue, marginBottom: 12}}>Skills</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
                        {(employee.skills || []).map((skill, idx) => (
                            <span
                                key={idx}
                                style={{
                                    background: COLORS.gray,
                                    color: COLORS.darkBlue,
                                    borderRadius: '12px',
                                    padding: '6px 18px',
                                    fontWeight: 500,
                                    fontSize: 15,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={() => setShowSkillTooltip(idx)}
                                onMouseLeave={() => setShowSkillTooltip(null)}
                            >
                                {skill}
                                {showSkillTooltip === idx && (
                                    <span style={{
                                        position: 'absolute',
                                        top: 32,
                                        left: 0,
                                        background: COLORS.white,
                                        color: COLORS.darkBlue,
                                        border: `1px solid ${COLORS.gray}`,
                                        borderRadius: 8,
                                        padding: '6px 12px',
                                        fontSize: 13,
                                        boxShadow: '0 2px 8px #0002',
                                        zIndex: 10,
                                        minWidth: 120
                                    }}>
                                        {`Expertise in ${skill}`}
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Achievements */}
                <div style={{
                    background: COLORS.white,
                    borderRadius: '14px',
                    padding: '22px',
                    boxShadow: `0 2px 8px ${COLORS.yellow}22`,
                    transition: 'transform 0.2s',
                    ':hover': { transform: 'scale(1.03)' }
                }}>
                    <h3 style={{color: COLORS.yellow, marginBottom: 12}}>Achievements</h3>
                    <ul style={{paddingLeft: 18, margin: 0}}>
                        {(employee.achivements || []).map((a, idx) => (
                            <li
                                key={a.id}
                                style={{marginBottom: 8, position: 'relative', cursor: 'pointer'}}
                                onMouseEnter={() => setShowAchTooltip(idx)}
                                onMouseLeave={() => setShowAchTooltip(null)}
                            >
                                <b>{a.title}</b> <span style={{color: '#888', fontSize: 13}}>({a.date})</span>
                                <div style={{fontSize: 15, color: '#444'}}>{a.description}</div>
                                {showAchTooltip === idx && (
                                    <span style={{
                                        position: 'absolute',
                                        top: 28,
                                        left: 0,
                                        background: COLORS.white,
                                        color: COLORS.darkBlue,
                                        border: `1px solid ${COLORS.gray}`,
                                        borderRadius: 8,
                                        padding: '6px 12px',
                                        fontSize: 13,
                                        boxShadow: '0 2px 8px #0002',
                                        zIndex: 10,
                                        minWidth: 180
                                    }}>
                                        {`Awarded for: ${a.title}`}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Projects */}
                <div style={{
                    background: COLORS.white,
                    borderRadius: '14px',
                    padding: '22px',
                    boxShadow: `0 2px 8px ${COLORS.blue}11`,
                    transition: 'transform 0.2s',
                    ':hover': { transform: 'scale(1.03)' }
                }}>
                    <h3 style={{color: '#43a047', marginBottom: 12}}>Projects</h3>
                    <ul style={{paddingLeft: 18, margin: 0}}>
                        {(employee.projects || []).map(p => (
                            <li key={p.id} style={{marginBottom: 10}}>
                                <b>{p.name}</b>
                                <div style={{fontSize: 14, color: '#888'}}>
                                    {p.startDate} &rarr; {p.endDate}
                                </div>
                                <div style={{fontSize: 15, color: '#444'}}>{p.description}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Team Info */}
            <div style={{
                background: COLORS.white,
                borderRadius: '14px',
                padding: '22px',
                boxShadow: `0 2px 8px ${COLORS.blue}11`,
                marginBottom: '32px',
                transition: 'transform 0.2s',
                ':hover': { transform: 'scale(1.01)' }
            }}>
                <h3 style={{color: COLORS.blue, marginBottom: 12}}>Team: {employee.team?.teamName}</h3>
                <div style={{color: '#555', marginBottom: 8}}>{employee.team?.teamDescription}</div>
                <div style={{marginBottom: 8}}>
                    <b>Current Project:</b> {employee.team?.currentProject?.name}
                    <div style={{fontSize: 14, color: '#888'}}>{employee.team?.currentProject?.description}</div>
                </div>
                <div>
                    <b>Team Members:</b>
                    <ul style={{display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0, margin: 0, marginTop: 8}}>
                        {(employee.team?.teamMembers || []).map((tm, idx) => (
                            <li key={idx} style={{
                                background: COLORS.gray,
                                color: COLORS.darkBlue,
                                borderRadius: '12px',
                                padding: '6px 16px',
                                fontWeight: 500,
                                fontSize: 15,
                                transition: 'background 0.2s',
                                cursor: 'pointer'
                            }}>{tm}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Employee Team Table */}
            <div style={{
                background: COLORS.white,
                borderRadius: '14px',
                padding: '22px',
                boxShadow: `0 2px 8px ${COLORS.blue}11`,
                marginBottom: '32px',
                transition: 'transform 0.2s',
                ':hover': { transform: 'scale(1.01)' }
            }}>
                <h3 style={{color: COLORS.blue, marginBottom: 12}}>Employee Team Members</h3>
                <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr style={{background: COLORS.gray}}>
                                <th style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>Name</th>
                                <th style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>Email</th>
                                <th style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(employee.employeeTeam || []).map(member => (
                                <tr key={member.id} style={{transition: 'background 0.2s', ':hover': {background: COLORS.gray}}}>
                                    <td style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>{member.name}</td>
                                    <td style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>{member.email}</td>
                                    <td style={{padding: 8, borderBottom: `1px solid ${COLORS.gray}`}}>{member.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Thought of the Day */}
            {todayThought && (
                <div style={{
                    backgroundColor: COLORS.gray,
                    padding: '25px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginTop: '20px',
                    transition: 'background 0.2s'
                }}>
                    <h2 style={{ color: COLORS.darkBlue, marginBottom: '20px' }}>Thought of the Day</h2>
                    <blockquote style={{
                        fontSize: '1.2em',
                        fontStyle: 'italic',
                        borderLeft: `4px solid ${COLORS.blue}`,
                        paddingLeft: '20px',
                        margin: '20px 0'
                    }}>
                        "{todayThought.content}"
                    </blockquote>
                    <p style={{ textAlign: 'right', color: COLORS.blue }}>- {todayThought.author}</p>
                </div>
            )}
        </div>
    );
};

export default Home;