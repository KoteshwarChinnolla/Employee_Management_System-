import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../../utils/ApiEndpoints';
import { COLORS } from '../../theme/colors';
import { useHistory } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: 650,
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
  row: {
    display: 'flex',
    gap: 16,
    marginBottom: 18,
  },
  halfInput: {
    flex: 1,
    minWidth: 0,
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

const AddProject = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    budget: '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
    clientAddress: '',
    clientWebsite: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Basic validation
    if (!form.name.trim() || !form.startDate || !form.endDate || !form.status || !form.clientName) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URLS.ADMIN}/projects/postProject`, form);
      setSuccess('Project created successfully!');
      setTimeout(() => history.push('/admin/add-team'), 1200);
    } catch (err) {
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Add Project</div>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Project Name *</label>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter project name"
          required
        />
        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the project (optional)"
        />
        <div style={styles.row}>
          <div style={styles.halfInput}>
            <label style={styles.label}>Start Date *</label>
            <input
              style={styles.input}
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.halfInput}>
            <label style={styles.label}>End Date *</label>
            <input
              style={styles.input}
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.halfInput}>
            <label style={styles.label}>Status *</label>
            <input
              style={styles.input}
              name="status"
              value={form.status}
              onChange={handleChange}
              placeholder="e.g. In Progress"
              required
            />
          </div>
          <div style={styles.halfInput}>
            <label style={styles.label}>Budget</label>
            <input
              style={styles.input}
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="e.g. 100000"
              type="number"
              min="0"
            />
          </div>
        </div>
        <label style={styles.label}>Client Name *</label>
        <input
          style={styles.input}
          name="clientName"
          value={form.clientName}
          onChange={handleChange}
          placeholder="Client Name"
          required
        />
        <div style={styles.row}>
          <div style={styles.halfInput}>
            <label style={styles.label}>Client Contact</label>
            <input
              style={styles.input}
              name="clientContact"
              value={form.clientContact}
              onChange={handleChange}
              placeholder="e.g. +1-555-1234"
            />
          </div>
          <div style={styles.halfInput}>
            <label style={styles.label}>Client Email</label>
            <input
              style={styles.input}
              name="clientEmail"
              value={form.clientEmail}
              onChange={handleChange}
              placeholder="e.g. example@gmail.com"
              type="email"
            />
          </div>
        </div>
        <label style={styles.label}>Client Address</label>
        <input
          style={styles.input}
          name="clientAddress"
          value={form.clientAddress}
          onChange={handleChange}
          placeholder="e.g. 123 Tech Street, Silicon Valley"
        />
        <label style={styles.label}>Client Website</label>
        <input
          style={styles.input}
          name="clientWebsite"
          value={form.clientWebsite}
          onChange={handleChange}
          placeholder="e.g. www.techsolutions.com"
        />
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button type="submit" style={styles.submitBtn}>
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
