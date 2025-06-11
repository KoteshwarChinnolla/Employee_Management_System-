import React, { useEffect, useState } from 'react';
import { COLORS } from '../../theme/colors';
import API_BASE_URLS from '../../utils/ApiEndpoints';

const styles = {
  container: {
    maxWidth: 950,
    margin: '40px auto',
    padding: '32px',
    background: `linear-gradient(120deg, ${COLORS.gray} 0%, ${COLORS.white} 100%)`,
    borderRadius: 18,
    boxShadow: `0 8px 32px 0 ${COLORS.blue}22`,
    fontFamily: 'Segoe UI, Arial, sans-serif',
    minHeight: '60vh'
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.blue,
    marginBottom: 28,
    letterSpacing: 0.5
  },
  majorProject: {
    background: `linear-gradient(90deg, ${COLORS.blue} 60%, ${COLORS.yellow} 100%)`,
    color: COLORS.white,
    borderRadius: 18,
    padding: '36px 32px',
    marginBottom: 36,
    boxShadow: `0 4px 24px ${COLORS.blue}33`,
    position: 'relative'
  },
  majorTitle: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
    color: COLORS.white,
    letterSpacing: 1
  },
  majorDates: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 10
  },
  majorDesc: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 14
  },
  majorMeta: {
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 7
  },
  clientBox: {
    background: COLORS.gray,
    color: COLORS.darkBlue,
    borderRadius: 12,
    padding: '16px 18px',
    marginTop: 18,
    marginBottom: 0,
    boxShadow: `0 2px 8px ${COLORS.blue}11`,
    fontSize: 15
  },
  clientLabel: {
    color: COLORS.blue,
    fontWeight: 600,
    marginRight: 6
  },
  projectList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22
  },
  projectCard: {
    background: COLORS.white,
    borderRadius: 14,
    boxShadow: `0 2px 8px ${COLORS.gray}55`,
    padding: '22px 26px',
    borderLeft: `6px solid ${COLORS.blue}`,
    transition: 'box-shadow 0.2s',
    ':hover': { boxShadow: `0 4px 16px ${COLORS.blue}33` }
  },
  projectTitle: {
    fontSize: 21,
    fontWeight: 600,
    color: COLORS.darkBlue,
    marginBottom: 4
  },
  projectDates: {
    fontSize: 14,
    color: COLORS.yellow,
    marginBottom: 7
  },
  projectDesc: {
    fontSize: 15,
    color: COLORS.darkBlue,
    marginBottom: 7
  },
  projectMeta: {
    fontSize: 14,
    color: COLORS.blue,
    marginBottom: 2
  },
  clientRow: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.darkBlue
  },
  clientLink: {
    color: COLORS.blue,
    textDecoration: 'underline',
    marginLeft: 4
  },
  badge: status => ({
    display: 'inline-block',
    padding: '2px 12px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    marginLeft: 8,
    background: status === 'Completed'
      ? COLORS.green
      : status === 'In Progress'
        ? COLORS.yellow
        : COLORS.orange,
    color: COLORS.white,
    letterSpacing: 0.5
  })
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString() : 'N/A';

const ProjectInfo = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    // Get employee name from localStorage (like Home.jsx)
    const payload = JSON.parse(localStorage.getItem('jwt_payload'));
    if (payload?.username) {
      const name = payload.username.replace(/_/g, ' ').replace(/ /g, '-');
      setEmployeeName(name.replace(/-/g, ' '));
      fetch(`${API_BASE_URLS.EMPLOYEE}/employee/getAllProjects/${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(data => {
          setProjects(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: 60, color: COLORS.blue}}>Loading projects...</div>;
  }

  if (!projects.length) {
    return <div style={{textAlign: 'center', marginTop: 60, color: COLORS.red}}>No projects found for {employeeName || "this user"}.</div>;
  }

  const [major, ...others] = projects;

  return (
    <div style={styles.container}>
      <div style={styles.sectionTitle}>Projects for {employeeName}</div>
      {/* Major Project */}
      <div style={styles.majorProject}>
        <div style={styles.majorTitle}>
          {major.name}
          <span style={styles.badge(major.status)}>{major.status}</span>
        </div>
        <div style={styles.majorDates}>
          {formatDate(major.startDate)} - {formatDate(major.endDate)}
        </div>
        <div style={styles.majorDesc}>{major.description}</div>
        <div style={styles.majorMeta}><b>Budget:</b> ${major.budget}</div>
        <div style={styles.clientBox}>
          <div><span style={styles.clientLabel}>Client:</span>{major.clientName}</div>
          <div style={styles.clientRow}><span style={styles.clientLabel}>Contact:</span>{major.clientContact}</div>
          <div style={styles.clientRow}><span style={styles.clientLabel}>Email:</span>{major.clientEmail}</div>
          <div style={styles.clientRow}><span style={styles.clientLabel}>Address:</span>{major.clientAddress}</div>
          <div style={styles.clientRow}>
            <span style={styles.clientLabel}>Website:</span>
            <a href={major.clientWebsite} style={styles.clientLink} target="_blank" rel="noopener noreferrer">
              {major.clientWebsite}
            </a>
          </div>
        </div>
      </div>
      {/* Other Projects */}
      {others.length > 0 && (
        <>
          <div style={styles.sectionTitle}>Other Projects</div>
          <div style={styles.projectList}>
            {others.map((proj, idx) => (
              <div key={proj.id || idx} style={styles.projectCard}>
                <div style={styles.projectTitle}>
                  {proj.name}
                  <span style={styles.badge(proj.status)}>{proj.status}</span>
                </div>
                <div style={styles.projectDates}>
                  {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                </div>
                <div style={styles.projectDesc}>{proj.description}</div>
                <div style={styles.projectMeta}><b>Budget:</b> ${proj.budget}</div>
                <div style={styles.clientBox}>
                  <div><span style={styles.clientLabel}>Client:</span>{proj.clientName}</div>
                  <div style={styles.clientRow}><span style={styles.clientLabel}>Contact:</span>{proj.clientContact}</div>
                  <div style={styles.clientRow}><span style={styles.clientLabel}>Email:</span>{proj.clientEmail}</div>
                  <div style={styles.clientRow}><span style={styles.clientLabel}>Address:</span>{proj.clientAddress}</div>
                  <div style={styles.clientRow}>
                    <span style={styles.clientLabel}>Website:</span>
                    <a href={proj.clientWebsite} style={styles.clientLink} target="_blank" rel="noopener noreferrer">
                      {proj.clientWebsite}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectInfo;
