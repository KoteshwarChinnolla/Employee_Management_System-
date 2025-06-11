import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useParams, useHistory } from 'react-router-dom';

const styles = {
  detailPage: {
    maxWidth: '960px',
    margin: '3rem auto',
    background: `linear-gradient(145deg, ${COLORS.white}, ${COLORS.gray})`,
    borderRadius: '20px',
    boxShadow: `0 10px 40px ${COLORS.blue}22`,
    padding: '3rem 2.5rem',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    animation: 'fadeIn 0.4s ease-in-out',
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    marginBottom: '2rem',
  },
  avatarLg: {
    width: '90px',
    height: '90px',
    background: `linear-gradient(to bottom right, ${COLORS.blue}, ${COLORS.yellow})`,
    color: COLORS.white,
    borderRadius: '50%',
    fontSize: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: `0 6px 20px ${COLORS.blue}33`,
  },
  detailName: {
    fontWeight: 800,
    fontSize: '2.2rem',
    color: COLORS.darkBlue,
    margin: 0,
    textShadow: `0.5px 0.5px ${COLORS.gray}`,
  },
  detailRole: {
    fontSize: '1.15rem',
    color: '#546e7a',
    margin: '0.3rem 0',
  },
  detailEmail: {
    fontSize: '1.02rem',
    color: '#78909c',
    margin: '0.2rem 0',
  },
  section: {
    margin: '2rem 0',
  },
  sectionTitle: {
    color: COLORS.blue,
    fontWeight: 700,
    fontSize: '1.3rem',
    marginBottom: '1rem',
    borderBottom: `2px solid ${COLORS.gray}`,
    paddingBottom: '0.3rem',
  },
  badge: {
    background: `linear-gradient(to right, ${COLORS.gray}, ${COLORS.lightBlue})`,
    color: COLORS.blue,
    borderRadius: '16px',
    padding: '0.4rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    marginRight: '0.6rem',
    marginBottom: '0.6rem',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(21, 101, 192, 0.15)',
    cursor: 'pointer',
    border: `1.5px solid ${COLORS.blue}`,
    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
    textDecoration: 'underline',
  },
  badgeHover: {
    background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.yellow})`,
    color: COLORS.white,
    boxShadow: `0 4px 16px ${COLORS.blue}77`,
  },
  teamInfoLarge: {
    margin: '2.5rem 0',
    padding: '2rem 1.5rem',
    background: `linear-gradient(120deg, ${COLORS.gray} 60%, ${COLORS.white} 100%)`,
    borderRadius: '18px',
    boxShadow: `0 4px 24px ${COLORS.blue}33`,
    minHeight: '220px',
  },
  teamMembersList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6rem',
    margin: '0.5rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  projectsList: {
    margin: '0.5rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  achievementsList: {
    margin: '0.5rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  backButton: {
    background: COLORS.white,
    color: COLORS.blue,
    border: `2px solid ${COLORS.blue}`,
    borderRadius: '10px',
    padding: '0.5rem 1.4rem',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '2rem',
    transition: 'all 0.25s ease',
    boxShadow: '0 3px 12px rgba(25, 118, 210, 0.1)',
    outline: 'none',
    marginTop: '-1.5rem',
    marginLeft: '-1rem',
    marginRight: 'auto',
    display: 'block'
  },
  backButtonHover: {
    background: COLORS.blue,
    color: COLORS.white,
    transform: 'scale(1.04)',
    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.25)',
  },
  highlight: {
    background: COLORS.yellow,
    borderRadius: '5px',
    padding: '0 4px',
    fontWeight: 600,
    color: COLORS.white,
  },
};

const EmployeeDetails = () => {
  const { name } = useParams();
  const history = useHistory();
  const [emp, setEmp] = useState(null);
  const [backHover, setBackHover] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    if (name) {
      const apiName = name.replace(/-/g, ' ');
      axios.get(`${API_BASE_URLS.EMPLOYEE}/employee/getEmployeeByName/${encodeURIComponent(apiName.replace(/ /g,'-'))}`)
        .then(res => setEmp(res.data))
        .catch(() => setEmp(null));
    }
  }, [name]);

  if (!emp) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>;

  return (
    <div style={styles.detailPage}>
      <button
        style={{
          ...styles.backButton,
          ...(backHover ? styles.backButtonHover : {}),
        }}
        onMouseOver={() => setBackHover(true)}
        onMouseOut={() => setBackHover(false)}
        onClick={() => history.goBack()}
      >
        ← Back
      </button>
      <div style={styles.detailHeader}>
        <div style={styles.avatarLg}>{emp.name[0]}</div>
        <div>
          <h2 style={styles.detailName}>{emp.name}</h2>
          <div style={styles.detailRole}>
            {emp.role} &mdash; {emp.position}
          </div>
          <div style={styles.detailEmail}>{emp.email}</div>
          <div style={{ color: COLORS.blue, fontWeight: 500, fontSize: '1.05rem', marginTop: 4 }}>
            Team: {emp.team?.teamName}
          </div>
          <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 2 }}>
            Joined: <span style={styles.highlight}>{emp.joinDate}</span>
          </div>
        </div>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>📁 Department & Contact</div>
        <div><strong>Department:</strong> <span style={styles.highlight}>{emp.department}</span></div>
        <div><strong>Phone:</strong> {emp.contact?.phoneNumber}</div>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🛠️ Skills</div>
        <div>
          {emp.skills.map((skill, idx) => (
            <span key={idx} style={styles.badge}>{skill}</span>
          ))}
        </div>
      </div>
      <div style={styles.teamInfoLarge}>
        <div style={{ ...styles.sectionTitle, fontSize: '1.5rem', marginBottom: '1.2rem' }}>👥 Team Info</div>
        <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>
          <strong>Team Name:</strong> <span style={styles.highlight}>{emp.team?.teamName}</span>
        </div>
        <div style={{ color: '#555', marginBottom: 12, fontSize: '1.05rem' }}>{emp.team?.teamDescription}</div>
        <div style={{ fontSize: '1.08rem', marginBottom: 8 }}>
          <strong>Current Project:</strong> <span style={styles.highlight}>{emp.team?.currentProject?.name}</span>
        </div>
        <div style={{ color: '#888', fontSize: '1.01rem', marginBottom: 18 }}>
          {emp.team?.currentProject?.description}
        </div>
        <div style={{ fontWeight: 600, color: COLORS.blue, marginBottom: 8 }}>Team Members:</div>
        <ul style={styles.teamMembersList}>
          {emp.team?.teamMembers.map((tm, idx) => (
            <li
              key={idx}
              style={{
                ...styles.badge,
                ...(hoveredMember === tm ? styles.badgeHover : {}),
              }}
              onMouseOver={() => setHoveredMember(tm)}
              onMouseOut={() => setHoveredMember(null)}
              onClick={() => history.push(`/employee-details/${encodeURIComponent(tm.replace(/ /g, '-'))}`)}
              title={`View ${tm}'s profile`}
            >
              {tm}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>📂 Projects</div>
        <ul style={styles.projectsList}>
          {emp.projects.map(p => (
            <li key={p.id} style={{
              background: '#f5faff',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              boxShadow: '0 2px 12px rgba(21, 101, 192, 0.08)',
              borderLeft: '4px solid #64b5f6',
            }}>
              <strong style={{ fontSize: '1.1rem', color: '#1565c0' }}>{p.name}</strong>
              <div style={{ color: '#888', fontSize: '0.95rem', margin: '0.3rem 0' }}>
                {p.startDate && p.endDate && (
                  <span>{new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}</span>
                )}
              </div>
              <div style={{ color: '#444' }}>{p.description}</div>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🏆 Achievements</div>
        <ul style={styles.achievementsList}>
          {emp.achivements.map(a => (
            <li key={a.id} style={{
              background: '#fffbea',
              padding: '0.9rem',
              borderRadius: '10px',
              marginBottom: '1rem',
              borderLeft: '4px solid #fbc02d',
              boxShadow: '0 2px 10px rgba(251, 192, 45, 0.1)',
            }}>
              <strong style={{ color: '#f57f17' }}>{a.title}</strong>: {a.description}
              <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                {a.date && (
                  <span>{new Date(a.date).toLocaleDateString()}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDetails;