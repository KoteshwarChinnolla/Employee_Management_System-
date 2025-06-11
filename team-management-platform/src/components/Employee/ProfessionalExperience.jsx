import React, { useEffect, useState } from 'react';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory } from 'react-router-dom';

const styles = {
  container: {
    padding: '3rem 1.5rem',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    background: `linear-gradient(to right, ${COLORS.gray}, ${COLORS.white})`,
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.2rem',
    color: COLORS.blue, // changed to accent color
    fontWeight: 800,
    marginBottom: '0.5rem',
    letterSpacing: '1px',
    textAlign: 'center',
    textShadow: `0 2px 8px ${COLORS.gray}`,
  },
  section: {
    margin: '2.5rem 0',
    background: COLORS.white,
    borderRadius: '18px',
    boxShadow: `0 2px 16px ${COLORS.blue}33`,
    padding: '2rem 1.5rem',
    transition: 'box-shadow 0.2s',
  },
  sectionTitle: {
    color: COLORS.orange, // use orange for section titles
    fontWeight: 700,
    fontSize: '1.35rem',
    marginBottom: '1.2rem',
    borderBottom: `2px solid ${COLORS.gray}`,
    paddingBottom: '0.3rem',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  teamCard: {
    background: `linear-gradient(135deg, ${COLORS.gray} 60%, ${COLORS.white} 100%)`,
    borderRadius: '14px',
    boxShadow: `0 2px 12px ${COLORS.blue}22`,
    padding: '1.5rem 1.2rem',
    marginBottom: '2rem',
    border: `2px solid ${COLORS.orange}`, // use orange border
    transition: 'transform 0.18s, box-shadow 0.18s, background 0.18s',
    position: 'relative',
  },
  teamHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1rem',
  },
  teamName: {
    fontWeight: 800,
    fontSize: '1.5rem',
    color: COLORS.orange, // use orange for team name
    letterSpacing: '1px',
    marginBottom: 0,
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
    background: COLORS.lightBlue,
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    boxShadow: `0 2px 12px ${COLORS.blue}14`,
    borderLeft: `4px solid ${COLORS.orange}`, // orange accent
  },
  projectTitle: {
    fontSize: '1.1rem',
    color: COLORS.orange, // orange for project title
    fontWeight: 600,
  },
  projectDates: {
    color: COLORS.blue,
    fontSize: '0.97rem',
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
    background: `linear-gradient(135deg, ${COLORS.gray} 60%, ${COLORS.white} 100%)`,
    borderRadius: '12px',
    boxShadow: `0 2px 8px ${COLORS.blue}22`,
    padding: '1rem 1.2rem',
    minWidth: '180px',
    cursor: 'pointer',
    transition: 'transform 0.18s, box-shadow 0.18s, background 0.18s',
    border: `2px solid ${COLORS.orange}`, // orange border
    position: 'relative',
  },
  memberCardHover: {
    background: `linear-gradient(135deg, ${COLORS.orange} 60%, ${COLORS.yellow} 100%)`,
    color: COLORS.white,
    boxShadow: `0 6px 24px ${COLORS.orange}77`,
    border: `2px solid ${COLORS.orange}`,
  },
  memberName: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: COLORS.orange, // orange for member name
    marginBottom: '0.2rem',
    letterSpacing: '0.5px',
  },
  memberNameHover: {
    color: COLORS.white,
    textDecoration: 'underline',
  },
  memberPosition: {
    color: COLORS.blue, // blue for position
    fontWeight: 500,
    fontSize: '1rem',
    marginBottom: '0.2rem',
  },
  memberEmail: {
    color: COLORS.green, // green for email
    fontSize: '0.97rem',
    marginBottom: '0.2rem',
  },
  badge: {
    background: COLORS.white,
    color: COLORS.orange,
    border: `1.5px solid ${COLORS.orange}`,
    borderRadius: '8px',
    padding: '0.2rem 0.7rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-block',
  },
  pastProjectsList: {
    margin: '0.5rem 0 0 0',
    padding: 0,
    listStyle: 'none',
  },
  pastProjectCard: {
    background: COLORS.gray,
    padding: '0.9rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    borderLeft: `4px solid ${COLORS.yellow}`,
    boxShadow: `0 2px 10px ${COLORS.yellow}1A`,
  },
  pastProjectTitle: {
    color: COLORS.yellow,
    fontWeight: 600,
    fontSize: '1.05rem',
  },
  pastProjectDates: {
    color: COLORS.orange, // orange for dates
    fontSize: '0.93rem',
    margin: '0.2rem 0',
  },
  noTeams: {
    color: COLORS.orange, // orange for empty state
    textAlign: 'center',
    fontSize: '1.15rem',
    margin: '2rem 0',
  },
};

const ProfessionalExperience = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Get employee name from jwt_payload in localStorage
    const payload = JSON.parse(localStorage.getItem('jwt_payload'));
    if (payload) {
      const emp = payload.username.replace(/_/g, ' ').replace(/ /g, '-');
      setLoading(true);
      fetch(`${API_BASE_URLS.EMPLOYEE}/employee/AllEmployeeTeams/${encodeURIComponent(emp)}`)
        .then(res => {
          if (!res.ok) throw new Error('Fetch failed: ' + res.status);
          return res.json();
        })
        .then(data => {
          setTeams(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>Professional Experience</div>
      {loading && <div style={styles.noTeams}>Loading...</div>}
      {!loading && teams.length === 0 && (
        <div style={styles.noTeams}>No professional experience found.</div>
      )}
      {!loading && teams.map(team => (
        <div key={team.teamId} style={styles.teamCard}>
          <div style={styles.teamHeader}>
            <div style={styles.teamName}>{team.teamName}</div>
          </div>
          <div style={styles.teamDesc}>{team.teamDescription}</div>
          {/* <div style={styles.sectionTitle}>🚀 Current Project</div>
          <div style={styles.projectCard}>
            <strong style={styles.projectTitle}>{team.currentProject?.name}</strong>
            <div style={styles.projectDates}>
              {team.currentProject?.startDate && team.currentProject?.endDate && (
                <span>
                  {new Date(team.currentProject.startDate).toLocaleDateString()} - {new Date(team.currentProject.endDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div style={{ color: '#444' }}>{team.currentProject?.description}</div>
          </div> */}
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
                <div style={{ color: '#444' }}>{p.description}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperience;