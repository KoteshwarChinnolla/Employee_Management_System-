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
  addButton: {
    background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`,
    color: COLORS.white,
    border: 'none',
    borderRadius: '14px',
    padding: '0.85rem 1.6rem',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: `0 4px 16px ${COLORS.orange}44`,
    transition: 'all 0.2s',
    marginLeft: '1rem'
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '0 1rem',
    marginBottom: '2rem',
  },
  employeeCard: {
    border: 'none',
    padding: '2rem 1.5rem',
    borderRadius: '20px',
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
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: '260px',
  },
  employeeCardHover: {
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
  team: {
    fontSize: '1rem',
    color: COLORS.orange,
    background: COLORS.gray,
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontWeight: 500,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: COLORS.orange,
    fontSize: '1.3rem',
    marginTop: '2.5rem',
  },
};

const AdminHome = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${API_BASE_URLS.EMPLOYEE}/employee/getAll`)
      .then(res => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch(err => console.error('Error fetching employees:', err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(term) || emp.employeeTeam.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  const handleEdit = (emp) => {
    history.push(`/admin/edit-employee/${encodeURIComponent(emp.name)}`);
  };

  const handleViewDetails = (emp) => {
    history.push(`/employee-details/${encodeURIComponent(emp.name)}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Employees</h1>
      <div style={styles.searchRow}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="🔍 Search by name or team..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          style={styles.addButton}
          onClick={() => history.push('/admin/add-employee')}
        >
          + Add Employee
        </button>
      </div>
      <div style={styles.cardList}>
        {filteredEmployees.length === 0 && (
          <div style={styles.noResults}>No employees found.</div>
        )}
        {filteredEmployees.map(emp => (
          <div
            key={emp.id}
            style={{
              ...styles.employeeCard,
              ...(hoveredCard === emp.id ? styles.employeeCardHover : {})
            }}
            onMouseOver={() => setHoveredCard(emp.id)}
            onMouseOut={() => setHoveredCard(null)}
          >
            {/* Edit button */}
            <button
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
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
              }}
              title="Edit"
              onClick={() => handleEdit(emp)}
            >
              ✎
            </button>
            <div style={styles.avatar}>{emp.name[0]}</div>
            <div style={styles.name}>{emp.name}</div>
            <div style={styles.info}><strong>Email:</strong> {emp.email}</div>
            <div style={styles.info}><strong>Position:</strong> {emp.position}</div>
            <div style={styles.team}><strong>Team:</strong> {emp.employeeTeam}</div>
            {/* View Details button */}
            <button
              style={{
                marginTop: 16,
                background: COLORS.orange,
                color: COLORS.white,
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: `0 2px 8px ${COLORS.orange}33`
              }}
              onClick={() => handleViewDetails(emp)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
