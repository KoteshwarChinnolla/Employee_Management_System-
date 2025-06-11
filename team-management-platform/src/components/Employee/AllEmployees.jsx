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
    color: COLORS.darkBlue,
    letterSpacing: '1.2px',
    textShadow: `1px 1px 2px ${COLORS.gray}`,
  },
  searchInput: {
    width: '100%',
    maxWidth: '500px',
    padding: '0.85rem 1.4rem',
    fontSize: '1.15rem',
    margin: '0 auto 2.8rem auto',
    display: 'block',
    border: `2px solid ${COLORS.gray}`,
    borderRadius: '14px',
    background: `linear-gradient(${COLORS.white}, ${COLORS.white}) padding-box, linear-gradient(120deg, ${COLORS.blue}, ${COLORS.yellow}) border-box`,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'all 0.3s ease-in-out',
  },
  searchInputFocus: {
    borderColor: COLORS.blue,
    boxShadow: `0 0 0 3px ${COLORS.blue}33`,
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
      0 8px 24px ${COLORS.blue}22,
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
      0 10px 40px ${COLORS.blue}44,
      inset 0 0 0 1px ${COLORS.white}1A
    `,
  },
  avatar: {
    width: '72px',
    height: '72px',
    background: `linear-gradient(to top left, ${COLORS.blue}, ${COLORS.yellow})`,
    color: COLORS.white,
    borderRadius: '50%',
    fontSize: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    boxShadow: `
      0 4px 12px ${COLORS.blue}88,
      0 0 0 4px ${COLORS.blue}26
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
    color: COLORS.blue,
    background: COLORS.gray,
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontWeight: 500,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  button: {
    marginTop: 'auto',
    background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.yellow})`,
    color: COLORS.white,
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1.05rem',
    letterSpacing: '0.5px',
    boxShadow: `0 6px 20px ${COLORS.blue}33`,
    transition: 'all 0.25s ease-in-out',
  },
  buttonHover: {
    background: `linear-gradient(to right, ${COLORS.darkBlue}, ${COLORS.blue})`,
    transform: 'scale(1.07)',
    boxShadow: `0 10px 25px ${COLORS.blue}44`,
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: COLORS.blue,
    fontSize: '1.3rem',
    marginTop: '2.5rem',
  },
};

const highlightText = (text, highlight) => {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <span key={i} style={{
          background: COLORS.yellow,
          color: COLORS.white,
          borderRadius: '5px',
          padding: '0 4px',
          fontWeight: 600
        }}>{part}</span>
      : part
  );
};

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [buttonHover, setButtonHover] = useState(null);
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

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Directory</h1>
      <input
        type="text"
        style={styles.searchInput}
        placeholder="🔍 Search by name or team..."
        value={searchTerm}
        onChange={handleSearch}
        autoFocus
      />
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
            <div style={styles.avatar}>{emp.name[0]}</div>
            <div style={styles.name}>{highlightText(emp.name, searchTerm)}</div>
            <div style={styles.info}><strong>Email:</strong> {emp.email}</div>
            <div style={styles.info}><strong>Position:</strong> {emp.position}</div>
            <div style={styles.team}><strong>Team:</strong> {highlightText(emp.employeeTeam, searchTerm)}</div>
            <button
              style={{
                ...styles.button,
                ...(buttonHover === emp.id ? styles.buttonHover : {})
              }}
              onMouseOver={() => setButtonHover(emp.id)}
              onMouseOut={() => setButtonHover(null)}
              onClick={() => history.push(`/employee-details/${encodeURIComponent(emp.name.replace(/ /g, '-'))}`)}
            >
              <span role="img" aria-label="eye">🔎</span> View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEmployees;
