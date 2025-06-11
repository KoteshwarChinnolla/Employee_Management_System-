import React, { useState } from 'react';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory } from 'react-router-dom';

const initialUserState = {
  username: '',
  password: '',
  role: '',
};
const initialEmpState = {
  name: '',
  phoneNumber: '',
  email: '',
  department: '',
  position: '',
  joinDate: '',
  skills: [],
  skillInput: '',
  employeeTeams: '',
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '3rem auto',
    background: COLORS.white,
    borderRadius: 18,
    boxShadow: `0 8px 32px 0 ${COLORS.orange}33`,
    padding: '2.5rem 2rem',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    color: COLORS.orange,
    fontWeight: 800,
    marginBottom: '1.5rem',
    textAlign: 'center',
    letterSpacing: '1px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    padding: '32px 0',
    background: COLORS.white,
  },
  formGroup: {
    marginBottom: '1.1rem',
    display: 'flex',
    flexDirection: 'column',
    gridColumn: 'auto',
  },
  label: {
    fontWeight: 600,
    color: COLORS.darkBlue,
    marginBottom: 6,
    fontSize: 15,
  },
  input: {
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: 10,
    border: `1.5px solid ${COLORS.gray}`,
    fontSize: '1.08rem',
    background: COLORS.gray,
    color: COLORS.darkBlue,
    outline: 'none',
    marginBottom: 2,
    transition: 'border 0.2s',
  },
  button: {
    width: '100%',
    background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.yellow})`,
    color: COLORS.white,
    border: 'none',
    borderRadius: 12,
    padding: '0.9rem 0',
    fontWeight: 700,
    fontSize: '1.15rem',
    cursor: 'pointer',
    marginTop: '1.2rem',
    boxShadow: `0 4px 16px ${COLORS.orange}44`,
    transition: 'all 0.2s',
  },
  error: {
    color: COLORS.red,
    textAlign: 'center',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  success: {
    color: COLORS.green,
    textAlign: 'center',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  skillRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
  },
  skillChip: {
    background: COLORS.gray,
    color: COLORS.darkBlue,
    borderRadius: 12,
    padding: '6px 14px',
    fontWeight: 500,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  removeSkillBtn: {
    background: 'none',
    border: 'none',
    color: COLORS.red,
    fontWeight: 700,
    marginLeft: 4,
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
  },
  addSkillBtn: {
    background: COLORS.blue,
    color: COLORS.white,
    border: 'none',
    borderRadius: 8,
    padding: '0 18px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

const AddEmployee = () => {
  const [userForm, setUserForm] = useState(initialUserState);
  const [empForm, setEmpForm] = useState(initialEmpState);
  const [step, setStep] = useState(1); // 1: user, 2: employee
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEmpChange = (e) => {
    const { name, value } = e.target;
    setEmpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillInputChange = (e) => {
    setEmpForm(prev => ({ ...prev, skillInput: e.target.value }));
  };

  const handleAddSkill = () => {
    const skill = empForm.skillInput.trim();
    if (skill && !empForm.skills.includes(skill)) {
      setEmpForm(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
        skillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setEmpForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userData = {
        username: userForm.username,
        password: userForm.password,
        role: userForm.role,
      };
      const userRes = await fetch(`${API_BASE_URLS.AUTH}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!userRes.ok) throw new Error('Failed to register user');
      setSuccess('User registered! Now enter employee details.');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleEmpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const employeeData = {
        version: 1,
        name: empForm.name,
        phoneNumber: empForm.phoneNumber,
        email: empForm.email,
        password: userForm.password,
        role: userForm.role,
        department: empForm.department,
        position: empForm.position,
        joinDate: empForm.joinDate,
        skills: empForm.skills,
        employeeTeams: empForm.employeeTeams
          ? empForm.employeeTeams.split(',').map(id => ({ teamId: parseInt(id) }))
          : [],
      };
      const empRes = await fetch(`${API_BASE_URLS.ADMIN}/employee/postEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (!empRes.ok) throw new Error('Failed to add employee');
      setSuccess('Employee added successfully!');
      setUserForm(initialUserState);
      setEmpForm(initialEmpState);
      setTimeout(() => history.push('/admin/home'), 1200);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Add New Employee</div>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      {step === 1 && (
        <form onSubmit={handleUserSubmit} style={{ ...styles.formGrid, gridTemplateColumns: '1fr' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input style={styles.input} name="username" value={userForm.username} onChange={handleUserChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} name="password" type="password" value={userForm.password} onChange={handleUserChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <input style={styles.input} name="role" value={userForm.role} onChange={handleUserChange} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button style={styles.button} type="submit">Register User</button>
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleEmpSubmit} style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input style={styles.input} name="name" value={empForm.name} onChange={handleEmpChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input style={styles.input} name="phoneNumber" value={empForm.phoneNumber} onChange={handleEmpChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} name="email" type="email" value={empForm.email} onChange={handleEmpChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Department</label>
            <input style={styles.input} name="department" value={empForm.department} onChange={handleEmpChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Position</label>
            <input style={styles.input} name="position" value={empForm.position} onChange={handleEmpChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Join Date</label>
            <input style={styles.input} name="joinDate" type="date" value={empForm.joinDate} onChange={handleEmpChange} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.label}>Skills</label>
            <div style={styles.skillRow}>
              <input
                type="text"
                name="skillInput"
                value={empForm.skillInput}
                onChange={handleSkillInputChange}
                style={{ ...styles.input, flex: 1 }}
                placeholder="Add a skill"
                onKeyDown={handleSkillKeyDown}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                style={styles.addSkillBtn}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 32 }}>
              {empForm.skills.map((skill, idx) => (
                <span key={idx} style={styles.skillChip}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    style={styles.removeSkillBtn}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.label}>Team IDs (comma separated, optional)</label>
            <input style={styles.input} name="employeeTeams" value={empForm.employeeTeams} onChange={handleEmpChange} />
          </div>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: 8 }}>
            <button style={styles.button} type="submit">Add Employee</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEmployee;
