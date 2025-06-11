import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory, useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: 600,
    margin: '48px auto',
    background: `linear-gradient(120deg, ${COLORS.white} 70%, ${COLORS.gray} 100%)`,
    borderRadius: 24,
    boxShadow: `0 8px 32px ${COLORS.orange}22`,
    padding: '40px 32px 32px 32px',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  header: {
    fontSize: '2.2rem',
    fontWeight: 700,
    color: COLORS.orange,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1.2,
    textShadow: `1px 1px 2px ${COLORS.gray}`,
  },
  label: {
    fontWeight: 600,
    color: COLORS.darkBlue,
    marginBottom: 6,
    display: 'block',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.gray}`,
    fontSize: 16,
    marginBottom: 18,
    outline: 'none',
    background: COLORS.white,
    transition: 'border 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.gray}`,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 18,
    outline: 'none',
    background: COLORS.white,
    resize: 'vertical',
    transition: 'border 0.2s',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.gray}`,
    fontSize: 16,
    marginBottom: 18,
    outline: 'none',
    background: COLORS.white,
    transition: 'border 0.2s',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: 18,
  },
  tag: {
    background: COLORS.orange,
    color: COLORS.white,
    borderRadius: 16,
    padding: '6px 16px',
    fontWeight: 600,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: `0 2px 8px ${COLORS.orange}33`,
  },
  removeTag: {
    marginLeft: 6,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 16,
    color: COLORS.white,
    background: 'none',
    border: 'none',
  },
  searchBox: {
    width: '100%',
    padding: '10px 16px',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.gray}`,
    fontSize: 16,
    marginBottom: 10,
    outline: 'none',
    background: COLORS.white,
    transition: 'border 0.2s',
  },
  employeeList: {
    maxHeight: 120,
    overflowY: 'auto',
    marginBottom: 18,
    borderRadius: 10,
    background: COLORS.gray,
    padding: '8px 0',
  },
  employeeItem: {
    padding: '8px 16px',
    cursor: 'pointer',
    borderBottom: `1px solid ${COLORS.white}`,
    color: COLORS.darkBlue,
    fontWeight: 500,
    transition: 'background 0.2s',
  },
  employeeItemHover: {
    background: COLORS.orange,
    color: COLORS.white,
  },
  buttonRow: {
    display: 'flex',
    gap: 16,
    marginBottom: 18,
    justifyContent: 'flex-start',
  },
  button: {
    background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`,
    color: COLORS.white,
    border: 'none',
    borderRadius: 12,
    padding: '8px 22px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: `0 4px 16px ${COLORS.orange}44`,
    transition: 'all 0.2s',
  },
  submitBtn: {
    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.orange})`,
    color: COLORS.white,
    border: 'none',
    borderRadius: 12,
    padding: '14px 40px',
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
    boxShadow: `0 4px 16px ${COLORS.green}44`,
    transition: 'all 0.2s',
    width: '100%',
    marginTop: 10,
  },
  error: {
    color: COLORS.red,
    fontWeight: 600,
    marginBottom: 12,
    textAlign: 'center',
  },
  success: {
    color: COLORS.green,
    fontWeight: 600,
    marginBottom: 12,
    textAlign: 'center',
  }
};

const EditTeam = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [hoveredEmp, setHoveredEmp] = useState(null);
  const [removeConfirmEmpId, setRemoveConfirmEmpId] = useState(null);

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    allProjects: [],
    allEmployees: [],
  });
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  // Fetch all projects for dropdown
  useEffect(() => {
    axios.get(`${API_BASE_URLS.ADMIN}/projects/getAll`)
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  // Fetch all employees for search/add
  useEffect(() => {
    axios.get(`${API_BASE_URLS.EMPLOYEE}/employee/getAll`)
      .then(res => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch(() => setEmployees([]));
  }, []);

  // Fetch team details and fill form
  useEffect(() => {
    axios.get(`${API_BASE_URLS.ADMIN}/employeeTeam/getEmployeeTeam/${id}`)
      .then(res => {
        const team = res.data;
        setForm({
          id: team.teamId || team.id || id,
          name: team.teamName || team.name || '',
          description: team.teamDescription || team.description || '',
          allProjects: team.currentProject ? [team.currentProject.id] : [],
          allEmployees: Array.isArray(team.employee) ? team.employee.map(e => e.id) : [],
        });
        setSelectedProjectId(team.currentProject ? team.currentProject.id : '');
      })
      .catch(() => setError('Failed to fetch team details.'));
  }, [id]);

  // Filter employees by search
  useEffect(() => {
    const term = employeeSearch.toLowerCase();
    setFilteredEmployees(
      employees.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position?.toLowerCase().includes(term)
      )
    );
  }, [employeeSearch, employees]);

  // Handle form field changes
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Handle project selection
  const handleProjectSelect = e => {
    setSelectedProjectId(e.target.value);
    setForm({ ...form, allProjects: e.target.value ? [e.target.value] : [] });
    setError('');
    setSuccess('');
  };

  // Add employee to team
  const handleAddEmployee = emp => {
    if (!form.allEmployees.includes(emp.id)) {
      setForm(prev => {
        const updated = {
          ...prev,
          allEmployees: [...prev.allEmployees, emp.id]
        };
        // Console log for confirmation
        console.log(`Added employee: ${emp.name} (ID: ${emp.id})`);
        return updated;
      });
    }
    setEmployeeSearch('');
    setError('');
    setSuccess('');
  };

  // Remove employee from team (after confirmation)
  const confirmRemoveEmployee = (empId) => {
    setForm(prev => {
      const updated = {
        ...prev,
        allEmployees: prev.allEmployees.filter(id => id !== empId)
      };
      // Console log for confirmation
      const emp = employees.find(e => e.id === empId);
      if (emp) {
        console.log(`Removed employee: ${emp.name} (ID: ${emp.id})`);
      }
      return updated;
    });
    setRemoveConfirmEmpId(null);
    setError('');
    setSuccess('');
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (
      !form.name.trim() ||
      !selectedProjectId ||
      !form.allEmployees.length
    ) {
      setError('Please fill all required fields and assign at least one employee.');
      return;
    }
    const payload = {
      id: form.id,
      name: form.name,
      description: form.description,
      allProjects: [selectedProjectId],
      allEmployees: form.allEmployees,
    };
    console.log(payload);
    try {
      await axios.post(`${API_BASE_URLS.ADMIN}/employeeTeam/updateEmployeeTeam`, payload);
      setSuccess('Team updated successfully!');
      setTimeout(() => history.push('/admin/teams'), 1200);
    } catch (err) {
      setError('Failed to update team. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Edit Team</div>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Team Name *</label>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter team name"
          required
        />
        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the team (optional)"
        />
        <label style={styles.label}>Project *</label>
        <select
          style={styles.select}
          value={selectedProjectId}
          onChange={handleProjectSelect}
          required
        >
          <option value="">-- Choose a project --</option>
          {projects.map(proj => (
            <option key={proj.id} value={proj.id}>{proj.name}</option>
          ))}
        </select>
        <label style={styles.label}>Team Members *</label>
        {/* Show current teammates as removable tags */}
        <div style={styles.tagList}>
          {form.allEmployees.map(empId => {
            const emp = employees.find(e => e.id === empId);
            if (!emp) return null;
            return (
              <span key={empId} style={styles.tag}>
                {emp.name}
                <button
                  style={styles.removeTag}
                  type="button"
                  title="Remove"
                  onClick={() => setRemoveConfirmEmpId(empId)}
                >
                  ×
                </button>
                {/* Confirmation dialog for removing teammate */}
                {removeConfirmEmpId === empId && (
                  <span style={{
                    position: 'absolute',
                    background: COLORS.white,
                    color: COLORS.darkBlue,
                    border: `1.5px solid ${COLORS.red}`,
                    borderRadius: 10,
                    padding: '8px 16px',
                    zIndex: 10,
                    marginLeft: 10,
                    boxShadow: `0 2px 8px ${COLORS.red}22`,
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                    Remove {emp.name}?
                    <button
                      style={{
                        marginLeft: 8,
                        background: COLORS.red,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: 6,
                        padding: '2px 10px',
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                      type="button"
                      onClick={() => confirmRemoveEmployee(empId)}
                    >
                      Yes
                    </button>
                    <button
                      style={{
                        marginLeft: 6,
                        background: COLORS.gray,
                        color: COLORS.darkBlue,
                        border: 'none',
                        borderRadius: 6,
                        padding: '2px 10px',
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                      type="button"
                      onClick={() => setRemoveConfirmEmpId(null)}
                    >
                      No
                    </button>
                  </span>
                )}
              </span>
            );
          })}
        </div>
        <input
          style={styles.searchBox}
          type="text"
          placeholder="Search employees by name, email, or position..."
          value={employeeSearch}
          onChange={e => setEmployeeSearch(e.target.value)}
        />
        {/* Search results for adding teammates */}
        <div style={styles.employeeList}>
          {filteredEmployees
            .filter(emp => !form.allEmployees.includes(emp.id))
            .slice(0, 8)
            .map(emp => (
              <div
                key={emp.id}
                style={{
                  ...styles.employeeItem,
                  ...(hoveredEmp === emp.id ? styles.employeeItemHover : {})
                }}
                onMouseOver={() => setHoveredEmp(emp.id)}
                onMouseOut={() => setHoveredEmp(null)}
                onClick={() => handleAddEmployee(emp)}
              >
                {emp.name} <span style={{ color: COLORS.gray, fontSize: 13 }}>({emp.position})</span>
              </div>
            ))}
          {filteredEmployees.filter(emp => !form.allEmployees.includes(emp.id)).length === 0 && (
            <div style={{ padding: 12, color: COLORS.gray, textAlign: 'center' }}>No employees found.</div>
          )}
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button type="submit" style={styles.submitBtn}>
          Update Team
        </button>
      </form>
    </div>
  );
};

export default EditTeam;
