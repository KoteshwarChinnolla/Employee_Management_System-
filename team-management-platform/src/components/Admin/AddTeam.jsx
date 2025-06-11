import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory } from 'react-router-dom';

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

const AddTeam = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [hoveredEmp, setHoveredEmp] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    allProjects: [],
    allEmployees: [],
  });
  const [projectOption, setProjectOption] = useState('choose'); // 'choose' or 'create'
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  // Fetch all projects for dropdown
  useEffect(() => {
    if (projectOption === 'choose') {
      axios.get(`${API_BASE_URLS.ADMIN}/projects/getAll`)
        .then(res => setProjects(res.data))
        .catch(() => setProjects([]));
    }
  }, [projectOption]);

  // Fetch all employees
  useEffect(() => {
    axios.get(`${API_BASE_URLS.EMPLOYEE}/employee/getAll`)
      .then(res => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch(() => setEmployees([]));
  }, []);

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
      setForm({
        ...form,
        allEmployees: [...form.allEmployees, emp.id]
      });
    }
    setEmployeeSearch('');
    setError('');
    setSuccess('');
  };

  // Remove employee from team
  const handleRemoveEmployee = (empId) => {
    setForm({
      ...form,
      allEmployees: form.allEmployees.filter(id => id !== empId)
    });
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
      (projectOption === 'choose' && !selectedProjectId) ||
      !form.allEmployees.length
    ) {
      setError('Please fill all required fields and assign at least one employee.');
      return;
    }
    const payload = {
      name: form.name,
      description: form.description,
      allProjects: projectOption === 'choose' ? [selectedProjectId] : [],
      allEmployees: form.allEmployees,
    };
    try {
      await axios.post(`${API_BASE_URLS.ADMIN}/employeeTeam/postEmployeeTeam`, payload);
      setSuccess('Team created successfully!');
      setTimeout(() => history.push('/admin/team-management'), 1200);
    } catch (err) {
      setError('Failed to create team. Please try again.');
    }
  };

  // Handle create project option
  const handleCreateProject = () => {
    history.push('/admin/add-project');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Add Team</div>
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
        <div style={styles.buttonRow}>
          <button
            type="button"
            style={{
              ...styles.button,
              background: projectOption === 'create'
                ? `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`
                : COLORS.gray,
              color: projectOption === 'create' ? COLORS.white : COLORS.darkBlue,
            }}
            onClick={handleCreateProject}
          >
            Create Project
          </button>
          <button
            type="button"
            style={{
              ...styles.button,
              background: projectOption === 'choose'
                ? `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`
                : COLORS.gray,
              color: projectOption === 'choose' ? COLORS.white : COLORS.darkBlue,
            }}
            onClick={() => setProjectOption('choose')}
          >
            Choose Project
          </button>
        </div>
        {projectOption === 'choose' && (
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
        )}
        <label style={styles.label}>Add Team Members *</label>
        <input
          style={styles.searchBox}
          type="text"
          placeholder="Search employees by name, email, or position..."
          value={employeeSearch}
          onChange={e => setEmployeeSearch(e.target.value)}
        />
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
                  onClick={() => handleRemoveEmployee(empId)}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button type="submit" style={styles.submitBtn}>
          Add Team
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
