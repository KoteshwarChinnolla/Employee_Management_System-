import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    fontSize: '2.6rem',
    textAlign: 'center',
    marginBottom: '2.5rem',
    fontWeight: 700,
    color: COLORS.orange,
    letterSpacing: '1.2px',
    textShadow: `1px 1px 2px ${COLORS.gray}`,
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2.8rem',
    gap: '1rem'
  },
  searchInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '0.85rem 1.4rem',
    fontSize: '1.15rem',
    border: `2px solid ${COLORS.gray}`,
    borderRadius: '14px',
    background: COLORS.white,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'all 0.3s ease-in-out',
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    padding: '0 1rem',
    marginBottom: '2rem',
  },
  teamCard: {
    border: 'none',
    padding: '2.2rem 2.2rem 1.5rem 2.2rem',
    borderRadius: '22px',
    background: `linear-gradient(145deg, ${COLORS.white}, ${COLORS.gray})`,
    boxShadow: `
      0 2px 5px rgba(0, 0, 0, 0.05),
      0 8px 24px ${COLORS.orange}22,
      inset 0 0 0 1px ${COLORS.white}1A
    `,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    minHeight: '320px',
    maxWidth: 600,
    margin: '0 auto',
  },
  teamCardHover: {
    transform: 'translateY(-8px) scale(1.035)',
    boxShadow: `
      0 10px 40px ${COLORS.orange}44,
      inset 0 0 0 1px ${COLORS.white}1A
    `,
  },
  avatar: {
    width: '72px',
    height: '72px',
    background: `linear-gradient(to top left, ${COLORS.orange}, ${COLORS.yellow})`,
    color: COLORS.white,
    borderRadius: '50%',
    fontSize: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    boxShadow: `
      0 4px 12px ${COLORS.orange}88,
      0 0 0 4px ${COLORS.orange}26
    `,
    transition: 'transform 0.3s',
  },
  name: {
    fontWeight: 700,
    fontSize: '1.4rem',
    color: COLORS.darkBlue,
    marginBottom: '0.3rem',
    textAlign: 'center',
    textShadow: `0.5px 0.5px ${COLORS.gray}`,
  },
  info: {
    fontSize: '1.05rem',
    color: COLORS.darkBlue,
    marginBottom: '0.3rem',
    textAlign: 'center',
  },
  projectBlock: {
    background: COLORS.gray,
    borderRadius: 16,
    padding: '1rem 1.2rem',
    margin: '1rem 0',
    width: '100%',
    boxShadow: `0 2px 8px ${COLORS.orange}11`,
  },
  projectTitle: {
    fontWeight: 700,
    color: COLORS.orange,
    fontSize: '1.1rem',
    marginBottom: 4,
  },
  projectDesc: {
    color: COLORS.darkBlue,
    fontSize: '1rem',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  projectDates: {
    color: COLORS.blue,
    fontSize: '0.98rem',
    marginBottom: 2,
  },
  employeeList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
  },
  employeeTag: {
    background: COLORS.blue,
    color: COLORS.white,
    borderRadius: '14px',
    padding: '4px 14px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    marginBottom: 4,
    transition: 'background 0.2s',
    textDecoration: 'underline',
  },
  sectionTitle: {
    fontWeight: 600,
    color: COLORS.darkBlue,
    fontSize: '1.08rem',
    margin: '1.2rem 0 0.3rem 0',
    letterSpacing: 0.5,
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: COLORS.orange,
    fontSize: '1.3rem',
    marginTop: '2.5rem',
  },
  editBtn: {
    position: 'absolute',
    top: 12,
    right: 52,
    background: COLORS.blue,
    color: COLORS.white,
    border: 'none',
    borderRadius: '50%',
    width: 32,
    height: 32,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 18,
    boxShadow: `0 2px 8px ${COLORS.blue}33`
  },
  deleteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: COLORS.red,
    color: COLORS.white,
    border: 'none',
    borderRadius: '50%',
    width: 32,
    height: 32,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 18,
    boxShadow: `0 2px 8px ${COLORS.red}33`
  },
  confirmBox: {
    position: 'absolute',
    top: 52,
    right: 12,
    background: COLORS.white,
    color: COLORS.darkBlue,
    border: `1.5px solid ${COLORS.red}`,
    borderRadius: 10,
    padding: '10px 18px',
    zIndex: 10,
    boxShadow: `0 2px 8px ${COLORS.red}22`,
    fontWeight: 600,
    fontSize: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  confirmBtn: {
    marginTop: 8,
    background: COLORS.red,
    color: COLORS.white,
    border: 'none',
    borderRadius: 8,
    padding: '6px 18px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: `0 2px 8px ${COLORS.red}33`
  },
  cancelBtn: {
    marginTop: 6,
    background: COLORS.gray,
    color: COLORS.darkBlue,
    border: 'none',
    borderRadius: 8,
    padding: '6px 18px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: `0 2px 8px ${COLORS.gray}33`
  },
};

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${API_BASE_URLS.ADMIN}/employeeTeam/getAll`)
      .then(res => {
        setTeams(res.data);
        setFilteredTeams(res.data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = teams.filter(team =>
      team.teamName.toLowerCase().includes(term) ||
      (team.currentProject?.name?.toLowerCase() || '').includes(term) ||
      (team.employeeNames?.some(name => name.toLowerCase().includes(term)))
    );
    setFilteredTeams(filtered);
  };

  const handleEmployeeClick = (name) => {
    history.push(`/employee-details/${encodeURIComponent(name)}`);
  };

  const handleDelete = async (teamId) => {
    try {
      await axios.get(`${API_BASE_URLS.ADMIN}/employeeTeam/deleteEmployeeTeam/${teamId}`);
      const updatedTeams = teams.filter(t => t.teamId !== teamId);
      setTeams(updatedTeams);
      setFilteredTeams(updatedTeams.filter(team =>
        team.teamName.toLowerCase().includes(searchTerm) ||
        (team.currentProject?.name?.toLowerCase() || '').includes(searchTerm) ||
        (team.employeeNames?.some(name => name.toLowerCase().includes(searchTerm)))
      ));
      setDeleteConfirmId(null);
    } catch (err) {
      alert('Failed to delete team.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Teams</h1>
      <div style={styles.searchRow}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="🔍 Search by team, project, or member..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div style={styles.cardList}>
        {filteredTeams.length === 0 && (
          <div style={styles.noResults}>No teams found.</div>
        )}
        {filteredTeams.map(team => (
          <div
            key={team.teamId}
            style={{
              ...styles.teamCard,
              ...(hoveredCard === team.teamId ? styles.teamCardHover : {})
            }}
            onMouseOver={() => setHoveredCard(team.teamId)}
            onMouseOut={() => setHoveredCard(null)}
          >
            {/* Edit button */}
            <button
              style={styles.editBtn}
              title="Edit"
              onClick={() =>
                history.push({
                  pathname: `/admin/edit-team/${team.teamId}`,
                  state: {
                    teamName: team.teamName,
                    teamDescription: team.teamDescription,
                    projectName: team.currentProject?.name,
                    teammateNames: team.employeeNames || []
                  }
                })
              }
            >
              ✎
            </button>
            {/* Delete button */}
            <button
              style={styles.deleteBtn}
              title="Delete"
              onClick={() => setDeleteConfirmId(team.teamId)}
            >
              🗑
            </button>
            {/* Confirm delete */}
            {deleteConfirmId === team.teamId && (
              <div style={styles.confirmBox}>
                Confirm delete?
                <button
                  style={styles.confirmBtn}
                  onClick={() => handleDelete(team.teamId)}
                >
                  Yes, Delete
                </button>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setDeleteConfirmId(null)}
                >
                  Cancel
                </button>
              </div>
            )}
            <div style={styles.avatar}>{team.teamName[0]}</div>
            <div style={styles.name}>{team.teamName}</div>
            <div style={styles.info}>{team.teamDescription}</div>
            {team.currentProject && (
              <div style={styles.projectBlock}>
                <div style={styles.projectTitle}>
                  Project: {team.currentProject.name}
                </div>
                <div style={styles.projectDesc}>
                  {team.currentProject.description}
                </div>
                <div style={styles.projectDates}>
                  <strong>Start:</strong> {team.currentProject.startDate} &nbsp; | &nbsp;
                  <strong>End:</strong> {team.currentProject.endDate}
                </div>
              </div>
            )}
            <div style={styles.sectionTitle}>Team Members:</div>
            <div style={styles.employeeList}>
              {team.employeeNames && team.employeeNames.map(name => (
                <span
                  key={name}
                  style={styles.employeeTag}
                  onClick={() => handleEmployeeClick(name)}
                  title={`View ${name}'s details`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
