import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory } from 'react-router-dom';

const styles = {
  container: {
    padding: '3rem 1.5rem',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    background: `linear-gradient(120deg, ${COLORS.gray} 0%, ${COLORS.white} 100%)`,
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.4rem',
    color: COLORS.blue,
    fontWeight: 800,
    marginBottom: '0.5rem',
    letterSpacing: '1px',
    textAlign: 'center',
    textShadow: `0 2px 8px ${COLORS.gray}`,
  },
  subHeader: {
    fontSize: '1.25rem',
    color: COLORS.darkBlue,
    fontWeight: 500,
    marginBottom: '2rem',
    textAlign: 'center',
    background: COLORS.gray,
    borderRadius: 10,
    padding: '0.8rem 1.2rem',
    boxShadow: `0 2px 8px ${COLORS.blue}11`
  },
  section: {
    margin: '2rem 0',
    background: COLORS.white,
    borderRadius: '16px',
    boxShadow: `0 2px 16px ${COLORS.blue}22`,
    padding: '2rem 1.5rem',
    transition: 'box-shadow 0.2s',
  },
  sectionTitle: {
    color: COLORS.blue,
    fontWeight: 700,
    fontSize: '1.25rem',
    marginBottom: '1.2rem',
    borderBottom: `2px solid ${COLORS.gray}`,
    paddingBottom: '0.3rem',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  teamDesc: {
    color: COLORS.darkBlue,
    fontSize: '1.08rem',
    marginBottom: '1.2rem',
    fontStyle: 'italic',
    background: COLORS.gray,
    borderRadius: '8px',
    padding: '0.7rem 1rem',
  },
  projectCard: {
    background: `linear-gradient(90deg, ${COLORS.lightBlue} 60%, ${COLORS.gray} 100%)`,
    padding: '1.2rem',
    borderRadius: '14px',
    marginBottom: '1.2rem',
    boxShadow: `0 2px 12px ${COLORS.blue}11`,
    borderLeft: `5px solid ${COLORS.blue}`,
  },
  projectTitle: {
    fontSize: '1.15rem',
    color: COLORS.blue,
    fontWeight: 700,
  },
  projectDates: {
    color: COLORS.orange,
    fontSize: '1rem',
    margin: '0.3rem 0',
  },
  memberList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.2rem',
    margin: '1rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  memberCard: {
    background: `linear-gradient(135deg, ${COLORS.white} 60%, ${COLORS.gray} 100%)`,
    borderRadius: '14px',
    boxShadow: `0 2px 8px ${COLORS.blue}22`,
    padding: '1.1rem 1.3rem',
    minWidth: '180px',
    cursor: 'pointer',
    transition: 'transform 0.18s, box-shadow 0.18s, background 0.18s',
    border: `2px solid ${COLORS.gray}`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  memberCardHover: {
    background: `linear-gradient(135deg, ${COLORS.blue} 60%, ${COLORS.orange} 100%)`,
    color: COLORS.white,
    transform: 'scale(1.04)',
    boxShadow: `0 6px 24px ${COLORS.blue}77`,
    border: `2px solid ${COLORS.blue}`,
  },
  memberName: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: COLORS.blue,
    marginBottom: '0.2rem',
    letterSpacing: '0.5px',
    transition: 'color 0.2s'
  },
  memberNameHover: {
    color: COLORS.white,
    textDecoration: 'underline',
  },
  memberPosition: {
    color: COLORS.darkBlue,
    fontWeight: 500,
    fontSize: '1rem',
    marginBottom: '0.2rem',
  },
  memberEmail: {
    color: '#78909c',
    fontSize: '0.97rem',
    marginBottom: '0.2rem',
  },
  badge: {
    background: COLORS.lightBlue,
    color: COLORS.blue,
    borderRadius: '8px',
    padding: '0.2rem 0.7rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-block',
    border: `1.5px solid ${COLORS.blue}`,
  },
  currentProject: {
    background: COLORS.gray,
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    marginBottom: '1rem',
    fontWeight: 500,
    color: COLORS.blue,
    fontSize: '1.08rem',
  },
  pastProjectsList: {
    margin: '0.5rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  pastProjectCard: {
    background: `linear-gradient(90deg, ${COLORS.gray} 60%, ${COLORS.white} 100%)`,
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    borderLeft: `5px solid ${COLORS.orange}`,
    boxShadow: `0 2px 10px ${COLORS.orange}1A`,
  },
  pastProjectTitle: {
    color: COLORS.orange,
    fontWeight: 700,
    fontSize: '1.08rem',
  },
  pastProjectDates: {
    color: COLORS.blue,
    fontSize: '0.97rem',
    margin: '0.2rem 0',
  },
};

const Team = () => {
  const [team, setTeam] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Get employee data from localStorage
    const payload = JSON.parse(localStorage.getItem('jwt_payload'));
    if (payload) {
      const emp = payload.username.replace(/_/g, ' ').replace(/ /g, '-');
      // Fetch team info from API for up-to-date data
      axios
        .get(`${API_BASE_URLS.EMPLOYEE}/employee/getEmployeeTeam/${encodeURIComponent(emp)}`)
        .then((res) => setTeam(res.data))
        .catch(() => setTeam(null));
    }
  }, []);

  if (!team) return <div style={{ textAlign: 'center', marginTop: 40, color: COLORS.blue }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>{team.teamName}</div>
      <div style={styles.subHeader}>{team.teamDescription}</div>

      {/* Current Project */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🚀 Current Project</div>
        <div style={styles.projectCard}>
          <div style={styles.projectTitle}>{team.currentProject?.name}</div>
          <div style={styles.projectDates}>
            {team.currentProject?.startDate && team.currentProject?.endDate && (
              <span>
                {new Date(team.currentProject.startDate).toLocaleDateString()} - {new Date(team.currentProject.endDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <div style={{ color: COLORS.darkBlue, marginBottom: 6 }}>{team.currentProject?.description}</div>
        </div>
      </div>

      {/* Team Members */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>👥 Team Members</div>
        <ul style={styles.memberList}>
          {team.teamMembers.map((member) => (
            <li
              key={member.id}
              style={{
                ...styles.memberCard,
                ...(hoveredMember === member.id ? styles.memberCardHover : {}),
              }}
              onMouseOver={() => setHoveredMember(member.id)}
              onMouseOut={() => setHoveredMember(null)}
              onClick={() => history.push(`/employee-details/${encodeURIComponent(member.name.replace(/ /g, '-'))}`)}
              title={`View ${member.name}'s profile`}
            >
              <div style={{
                ...styles.memberName,
                ...(hoveredMember === member.id ? styles.memberNameHover : {}),
              }}>
                {member.name}
              </div>
              <div style={styles.memberPosition}>{member.position}</div>
              <div style={styles.memberEmail}>{member.email}</div>
              <div style={styles.badge}>{member.employeeTeam}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Past Projects */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>📂 Past Projects</div>
        <ul style={styles.pastProjectsList}>
          {team.pastProjects.map((p) => (
            <li key={p.id} style={styles.pastProjectCard}>
              <strong style={styles.pastProjectTitle}>{p.name}</strong>
              <div style={styles.pastProjectDates}>
                {p.startDate && p.endDate && (
                  <span>
                    {new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div style={{ color: COLORS.darkBlue }}>{p.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;