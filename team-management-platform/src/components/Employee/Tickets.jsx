import React, { useEffect, useState, useRef } from 'react';
import { COLORS } from '../../theme/colors';
import API_BASE_URLS from '../../utils/ApiEndpoints';

const styles = {
  container: {
    maxWidth: '100vw',
    width: '100%',
    margin: 0,
    padding: 0,
    background: `linear-gradient(120deg, ${COLORS.gray} 0%, ${COLORS.white} 100%)`,
    borderRadius: 0,
    boxShadow: 'none',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    minHeight: 'calc(100vh - 56px)',
    display: 'flex',
    gap: 0,
    position: 'relative',
    flexWrap: 'nowrap',
    height: 'calc(100vh - 56px)', // 56px is navbar height
    overflow: 'hidden',
    flexDirection: 'row' // ensure row direction
  },
  mainPanel: {
    flex: 2,
    background: COLORS.white,
    borderRadius: 0,
    boxShadow: 'none',
    padding: '32px 32px 24px 32px',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    minWidth: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  sidebar: {
    flex: '0 0 350px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    minWidth: 320,
    maxWidth: 400,
    width: 350,
    height: '100%',
    background: COLORS.gray,
    overflowY: 'auto',
    borderRight: `1.5px solid ${COLORS.gray}`,
    boxShadow: `2px 0 8px ${COLORS.gray}22`
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: COLORS.blue,
    marginBottom: 28,
    letterSpacing: 0.5
  },
  ticketCard: {
    background: COLORS.white,
    borderRadius: 14,
    boxShadow: `0 2px 8px ${COLORS.gray}55`,
    padding: '18px 20px',
    borderLeft: `6px solid ${COLORS.blue}`,
    cursor: 'pointer',
    transition: 'box-shadow 0.2s, border 0.2s',
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  ticketCardActive: {
    borderLeft: `6px solid ${COLORS.yellow}`,
    boxShadow: `0 4px 16px ${COLORS.yellow}33`
  },
  ticketHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12
  },
  ticketTitle: {
    fontSize: 21,
    fontWeight: 600,
    color: COLORS.darkBlue,
    flex: 1
  },
  badge: status => ({
    display: 'inline-block',
    padding: '2px 12px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    background: status === 'Resolved'
      ? COLORS.green
      : status === 'In Progress'
        ? COLORS.yellow
        : COLORS.orange,
    color: COLORS.white,
    letterSpacing: 0.5
  }),
  ticketMeta: {
    fontSize: 14,
    color: COLORS.blue,
    marginBottom: 6
  },
  ticketDesc: {
    fontSize: 15,
    color: COLORS.darkBlue,
    marginBottom: 10
  },
  chatBox: {
    background: COLORS.gray,
    borderRadius: 10,
    padding: '18px 16px',
    marginTop: 10,
    maxHeight: 'none', // allow flex to control height
    minHeight: 0,
    flex: 1,
    overflowY: 'auto',
    marginBottom: 0,
    paddingBottom: 0 // remove extra padding at bottom
  },
  chatRow: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 2
  },
  chatBubbleEmp: {
    background: COLORS.blue,
    color: COLORS.white,
    borderRadius: '16px 16px 16px 4px',
    padding: '10px 16px',
    maxWidth: '60%',
    marginRight: 'auto',
    fontSize: 15,
    boxShadow: `0 2px 8px ${COLORS.blue}22`
  },
  chatBubbleAdmin: {
    background: COLORS.yellow,
    color: COLORS.white,
    borderRadius: '16px 16px 4px 16px',
    padding: '10px 16px',
    maxWidth: '60%',
    marginLeft: 'auto',
    fontSize: 15,
    boxShadow: `0 2px 8px ${COLORS.yellow}22`
  },
  chatMeta: {
    fontSize: 12,
    color: COLORS.darkBlue,
    marginTop: 2,
    marginLeft: 4,
    marginRight: 4
  },
  chatInputRow: {
    display: 'flex',
    gap: 8,
    marginTop: 0,
    background: COLORS.white,
    padding: '12px 0 12px 0',
    zIndex: 2,
    borderTop: `1.5px solid ${COLORS.gray}`,
    // Add mobile fix: stick to bottom on mobile
    position: 'static'
  },
  addTicketBtn: {
    background: COLORS.blue,
    color: COLORS.white,
    border: 'none',
    borderRadius: 8,
    padding: '10px 28px',
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 24,
    cursor: 'pointer',
    boxShadow: `0 2px 8px ${COLORS.blue}22`,
    transition: 'background 0.2s'
  },
  addTicketFab: {
    position: 'fixed',
    bottom: 40,
    right: 60,
    zIndex: 1200,
    background: COLORS.blue,
    color: COLORS.white,
    border: 'none',
    borderRadius: '50%',
    width: 60,
    height: 60,
    boxShadow: `0 4px 16px ${COLORS.blue}44`,
    fontSize: 32,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, box-shadow 0.2s'
  },
  addTicketFabHover: {
    background: COLORS.yellow,
    color: COLORS.white,
    boxShadow: `0 8px 32px ${COLORS.yellow}44`
  },
  addTicketFabLabel: {
    position: 'absolute',
    right: 80,
    bottom: 50,
    background: COLORS.darkBlue,
    color: COLORS.white,
    padding: '6px 16px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    boxShadow: `0 2px 8px ${COLORS.darkBlue}33`,
    whiteSpace: 'nowrap',
    zIndex: 1201,
    pointerEvents: 'none'
  },
  addTicketForm: {
    background: COLORS.white,
    borderRadius: 14,
    boxShadow: `0 2px 8px ${COLORS.gray}55`,
    padding: '22px 26px',
    marginBottom: 32,
    borderLeft: `6px solid ${COLORS.yellow}`,
    maxWidth: 500
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.18)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    background: COLORS.white,
    borderRadius: 16,
    boxShadow: `0 8px 32px ${COLORS.blue}33`,
    padding: 32,
    minWidth: 340,
    maxWidth: 420,
    width: '90%',
    borderLeft: `6px solid ${COLORS.yellow}`,
    position: 'relative'
  },
  // Responsive styles
  '@media (max-width: 900px)': {
    container: {
      flexDirection: 'column',
      gap: 0,
      padding: 0,
      height: 'auto',
      minHeight: 'calc(100vh - 56px)'
    },
    mainPanel: {
      padding: '18px 10px 24px 10px',
      minHeight: 0,
      borderRadius: 0,
      height: 'calc(100vh - 56px - 180px)'
    },
    sidebar: {
      minWidth: 0,
      maxWidth: '100%',
      width: '100%',
      height: 180,
      flex: '0 0 180px',
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      borderRight: 'none',
      borderBottom: `1.5px solid ${COLORS.gray}`,
      boxShadow: `0 2px 8px ${COLORS.gray}22`
    },
    chatBox: {
      maxHeight: 'calc(100vh - 56px - 60px - 120px)', // header + chat input + desc
      minHeight: 0,
      flex: 1,
      overflowY: 'auto',
      marginBottom: 0,
      paddingBottom: 0
    },
    chatInputRow: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      background: COLORS.white,
      borderTop: `1.5px solid ${COLORS.gray}`,
      padding: '12px 12px 12px 12px',
      zIndex: 100
    }
  },
  '@media (max-width: 600px)': {
    container: {
      padding: 0,
      margin: 0,
      height: 'auto'
    },
    mainPanel: {
      padding: '10px 2px 70px 2px',
      height: 'calc(100vh - 56px - 120px)'
    },
    sidebar: {
      padding: 0,
      gap: 0,
      height: 120,
      flex: '0 0 120px'
    }
  }
};

// Responsive helper for inline styles
const useResponsiveStyles = (baseStyles) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  let merged = { ...baseStyles };
  if (width <= 600) {
    Object.assign(merged, styles['@media (max-width: 600px)'][Object.keys(baseStyles)[0]] || {});
  } else if (width <= 900) {
    Object.assign(merged, styles['@media (max-width: 900px)'][Object.keys(baseStyles)[0]] || {});
  }
  return merged;
};

const formatDate = (d) => d ? new Date(d).toLocaleString() : '';
const todayDate = () => new Date().toISOString().split('T')[0];

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    ticketName: '',
    ticketDescription: '',
    ticketStatus: 'Pending Approval'
  });
  const [submitting, setSubmitting] = useState(false);
  const [chatInputs, setChatInputs] = useState({});
  const [chatLoading, setChatLoading] = useState({});
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [fabHover, setFabHover] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showChatMobile, setShowChatMobile] = useState(false);
  const chatBoxRef = useRef(null);

  // Responsive styles (move these to the top, before any conditional returns)
  const containerStyle = useResponsiveStyles({ container: styles.container });
  const mainPanelStyle = useResponsiveStyles({ mainPanel: styles.mainPanel });
  const sidebarStyle = useResponsiveStyles({ sidebar: styles.sidebar });

  useEffect(() => {
    const payload = JSON.parse(localStorage.getItem('jwt_payload'));
    if (payload?.username) {
      const name = payload.username.replace(/_/g, ' ').replace(/ /g, '-');
      setEmployeeName(payload.username.replace(/_/g, ' '));
      fetch(`${API_BASE_URLS.EMPLOYEE}/employee/getTicketByNameAll/${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(data => {
          setTickets(Array.isArray(data) ? data : []);
          setLoading(false);
          if (Array.isArray(data) && data.length > 0 && selectedTicketId === null) {
            setSelectedTicketId(data[0].ticketId);
          }
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [submitting]);

  useEffect(() => {
    // Scroll chat to bottom when selectedTicket changes
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [selectedTicketId, tickets]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      employeeName,
      ticketName: form.ticketName,
      ticketDescription: form.ticketDescription,
      ticketStatus: form.ticketStatus,
      dateCreated: todayDate(),
      dataUpdated: todayDate(),
      empConversation: [],
      adminConversation: []
    };
    await fetch(`${API_BASE_URLS.EMPLOYEE}/employee/addTicket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setShowAdd(false);
    setForm({ ticketName: '', ticketDescription: '', ticketStatus: 'Pending Approval' });
    setSubmitting(false);
  };

  const handleChatInputChange = (ticketId, value) => {
    setChatInputs(inputs => ({ ...inputs, [ticketId]: value }));
  };

  const handleSendMessage = async (ticketId) => {
    const message = chatInputs[ticketId]?.trim();
    if (!message) return;
    setChatLoading(l => ({ ...l, [ticketId]: true }));
    const payload = {
      date: todayDate(),
      message,
      sender: "EMPLOYEE",
      ticket: ticketId
    };
    await fetch(`${API_BASE_URLS.EMPLOYEE}/employee/addConversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setChatInputs(inputs => ({ ...inputs, [ticketId]: '' }));
    setChatLoading(l => ({ ...l, [ticketId]: false }));
    // Remove setLoading(true) and ticket reload here to avoid UI blinking
    // Instead, optimistically update the conversation in UI:
    setTickets(prevTickets => prevTickets.map(t =>
      t.ticketId === ticketId
        ? {
            ...t,
            allConversations: [
              ...(t.allConversations || []),
              {
                id: `temp-${Date.now()}`,
                date: todayDate(),
                message,
                sender: "EMPLOYEE"
              }
            ]
          }
        : t
    ));
    // Optionally, you can refresh tickets in the background (not blocking UI)
    fetch(`${API_BASE_URLS.EMPLOYEE}/employee/getTicketByNameAll/${encodeURIComponent(employeeName.replace(/ /g, '-'))}`)
      .then(res => res.json())
      .then(data => {
        setTickets(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  };

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: 60, color: COLORS.blue}}>Loading tickets...</div>;
  }

  // Sort tickets by dateCreated (newest first)
  const sortedTickets = tickets.slice().sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  const selectedTicket = sortedTickets.find(t => t.ticketId === selectedTicketId) || sortedTickets[0];

  // Handler for mobile ticket click
  const handleTicketClick = (ticketId) => {
    setSelectedTicketId(ticketId);
    if (windowWidth <= 900) setShowChatMobile(true);
  };

  // Handler for mobile back button
  const handleBack = () => setShowChatMobile(false);

  return (
    <div style={containerStyle.container}>
      {windowWidth <= 900 ? (
        // Mobile/tablet: WhatsApp/Instagram style
        <>
          {/* Floating Add Ticket FAB for mobile */}
          <button
            style={{
              ...styles.addTicketFab,
              ...(fabHover ? styles.addTicketFabHover : {}),
              bottom: 24,
              right: 24,
              position: 'fixed',
              zIndex: 1200,
              width: 56,
              height: 56,
              fontSize: 30
            }}
            onMouseEnter={() => setFabHover(true)}
            onMouseLeave={() => setFabHover(false)}
            onClick={() => setShowAdd(true)}
            aria-label="Add Ticket"
          >
            +
          </button>
          {showAdd && (
            <div style={styles.modalOverlay}>
              <form
                onSubmit={handleAddTicket}
                style={styles.modalContent}
              >
                <div style={{marginBottom: 14}}>
                  <label style={{color: COLORS.blue, fontWeight: 600}}>Employee Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    disabled
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 8,
                      border: `1.5px solid ${COLORS.gray}`,
                      marginTop: 6,
                      fontSize: 15,
                      background: COLORS.gray,
                      color: COLORS.darkBlue
                    }}
                  />
                </div>
                <div style={{marginBottom: 14}}>
                  <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Name</label>
                  <input
                    type="text"
                    name="ticketName"
                    value={form.ticketName}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 8,
                      border: `1.5px solid ${COLORS.gray}`,
                      marginTop: 6,
                      fontSize: 15
                    }}
                    placeholder="e.g. VPN Problem"
                    autoFocus
                  />
                </div>
                <div style={{marginBottom: 14}}>
                  <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Description</label>
                  <textarea
                    name="ticketDescription"
                    value={form.ticketDescription}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 8,
                      border: `1.5px solid ${COLORS.gray}`,
                      marginTop: 6,
                      fontSize: 15,
                      minHeight: 60,
                      resize: 'vertical'
                    }}
                    placeholder="Describe the issue..."
                  />
                </div>
                <div style={{marginBottom: 14}}>
                  <label style={{color: COLORS.blue, fontWeight: 600}}>Status</label>
                  <select
                    name="ticketStatus"
                    value={form.ticketStatus}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 8,
                      border: `1.5px solid ${COLORS.gray}`,
                      marginTop: 6,
                      fontSize: 15
                    }}
                  >
                    <option>Pending Approval</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <div style={{textAlign: 'right'}}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: COLORS.yellow,
                      color: COLORS.white,
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 28px',
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: `0 2px 8px ${COLORS.yellow}22`,
                      transition: 'background 0.2s'
                    }}
                  >
                    {submitting ? 'Adding...' : 'Submit Ticket'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 16,
                    background: 'none',
                    border: 'none',
                    color: COLORS.red,
                    fontSize: 22,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  aria-label="Close"
                >×</button>
              </form>
            </div>
          )}
          {showChatMobile && selectedTicket ? (
            <div style={{ ...mainPanelStyle.mainPanel, width: '100vw', height: '100vh', maxWidth: '100vw', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: COLORS.gray,
                padding: '16px 18px',
                borderBottom: `1.5px solid ${COLORS.gray}`,
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: COLORS.blue,
                    fontSize: 26,
                    fontWeight: 700,
                    marginRight: 16,
                    cursor: 'pointer'
                  }}
                  aria-label="Back"
                >&#8592;</button>
                <div style={{ fontWeight: 700, fontSize: 20, color: COLORS.blue, flex: 1 }}>
                  {selectedTicket.ticketName}
                </div>
                <span style={styles.badge(selectedTicket.ticketStatus)}>{selectedTicket.ticketStatus}</span>
              </div>
              <div style={{padding: '0 18px'}}>
                <div style={styles.ticketDesc}>{selectedTicket.ticketDescription}</div>
                <div style={styles.ticketMeta}>
                  <b>Created:</b> {formatDate(selectedTicket.dateCreated)}
                  {selectedTicket.dateUpdated && (
                    <span style={{marginLeft: 16}}><b>Updated:</b> {formatDate(selectedTicket.dateUpdated)}</span>
                  )}
                </div>
              </div>
              <div
                ref={chatBoxRef}
                style={{
                  ...styles.chatBox,
                  ...(windowWidth <= 900 ? styles['@media (max-width: 900px)'].chatBox : {}),
                  flex: 1
                }}
              >
                {selectedTicket.allConversations
                  .slice()
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((conv, idx) => (
                    <div key={conv.id + '-' + idx} style={styles.chatRow}>
                      {conv.sender === 'EMPLOYEE' ? (
                        <div style={styles.chatBubbleEmp}>
                          {conv.message}
                          <div style={styles.chatMeta}>{formatDate(conv.date)} &mdash; You</div>
                        </div>
                      ) : (
                        <div style={styles.chatBubbleAdmin}>
                          {conv.message}
                          <div style={styles.chatMeta}>{formatDate(conv.date)} &mdash; Admin</div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <form
                style={{
                  ...styles.chatInputRow,
                  ...(windowWidth <= 900 ? styles['@media (max-width: 900px)'].chatInputRow : {})
                }}
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(selectedTicket.ticketId);
                }}
              >
                <input
                  type="text"
                  value={chatInputs[selectedTicket.ticketId] || ''}
                  onChange={e => handleChatInputChange(selectedTicket.ticketId, e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    border: `1.5px solid ${COLORS.gray}`,
                    fontSize: 16,
                    outline: 'none'
                  }}
                  disabled={chatLoading[selectedTicket.ticketId]}
                />
                <button
                  type="submit"
                  disabled={chatLoading[selectedTicket.ticketId] || !(chatInputs[selectedTicket.ticketId] || '').trim()}
                  style={{
                    background: COLORS.blue,
                    color: COLORS.white,
                    border: 'none',
                    borderRadius: 8,
                    padding: '0 22px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: chatLoading[selectedTicket.ticketId] ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  {chatLoading[selectedTicket.ticketId] ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          ) : (
            // Show ticket list fullscreen
            <div style={{
              ...sidebarStyle.sidebar,
              width: '100vw',
              height: 'calc(100vh - 56px)',
              maxWidth: '100vw',
              borderRight: 'none',
              borderBottom: `1.5px solid ${COLORS.gray}`,
              overflowY: 'auto'
            }}>
              {sortedTickets.map(ticket => (
                <div
                  key={ticket.ticketId}
                  style={{
                    ...styles.ticketCard,
                    ...(ticket.ticketId === selectedTicketId ? styles.ticketCardActive : {}),
                    margin: 12,
                    borderLeft: `6px solid ${COLORS.blue}`,
                    borderRadius: 14
                  }}
                  onClick={() => handleTicketClick(ticket.ticketId)}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{fontWeight: 700, color: COLORS.blue}}>{ticket.ticketName}</span>
                    <span style={styles.badge(ticket.ticketStatus)}>{ticket.ticketStatus}</span>
                  </div>
                  <div style={{fontSize: 13, color: COLORS.darkBlue, marginBottom: 2}}>
                    {ticket.ticketDescription.length > 40
                      ? ticket.ticketDescription.slice(0, 40) + '...'
                      : ticket.ticketDescription}
                  </div>
                  <div style={{fontSize: 12, color: COLORS.blue}}>
                    {formatDate(ticket.dateCreated)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Desktop: split view
        <>
          <div style={{ ...mainPanelStyle.mainPanel, paddingBottom: 0, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column', flex: 2 }}>
            <div style={styles.sectionTitle}>Tickets for {employeeName}</div>
            {/* Add Ticket Modal */}
            {showAdd && (
              <div style={styles.modalOverlay}>
                <form
                  onSubmit={handleAddTicket}
                  style={styles.modalContent}
                >
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Employee Name</label>
                    <input
                      type="text"
                      value={employeeName}
                      disabled
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15,
                        background: COLORS.gray,
                        color: COLORS.darkBlue
                      }}
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Name</label>
                    <input
                      type="text"
                      name="ticketName"
                      value={form.ticketName}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15
                      }}
                      placeholder="e.g. VPN Problem"
                      autoFocus
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Description</label>
                    <textarea
                      name="ticketDescription"
                      value={form.ticketDescription}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15,
                        minHeight: 60,
                        resize: 'vertical'
                      }}
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Status</label>
                    <select
                      name="ticketStatus"
                      value={form.ticketStatus}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15
                      }}
                    >
                      <option>Pending Approval</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        background: COLORS.yellow,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 28px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: `0 2px 8px ${COLORS.yellow}22`,
                        transition: 'background 0.2s'
                      }}
                    >
                      {submitting ? 'Adding...' : 'Submit Ticket'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 16,
                      background: 'none',
                      border: 'none',
                      color: COLORS.red,
                      fontSize: 22,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    aria-label="Close"
                  >×</button>
                </form>
              </div>
            )}
            {selectedTicket && (
              <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100%'}}>
                <div style={styles.ticketHeader}>
                  <div style={styles.ticketTitle}>{selectedTicket.ticketName}</div>
                  <span style={styles.badge(selectedTicket.ticketStatus)}>{selectedTicket.ticketStatus}</span>
                </div>
                <div style={styles.ticketDesc}>{selectedTicket.ticketDescription}</div>
                <div style={styles.ticketMeta}>
                  <b>Created:</b> {formatDate(selectedTicket.dateCreated)}
                  {selectedTicket.dateUpdated && (
                    <span style={{marginLeft: 16}}><b>Updated:</b> {formatDate(selectedTicket.dateUpdated)}</span>
                  )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100%'}}>
                  <div
                    ref={chatBoxRef}
                    style={{
                      ...styles.chatBox,
                      flex: 1,
                      minHeight: 0,
                      marginBottom: 0
                    }}
                  >
                    {selectedTicket.allConversations
                      .slice()
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((conv, idx) => (
                        <div key={conv.id + '-' + idx} style={styles.chatRow}>
                          {conv.sender === 'EMPLOYEE' ? (
                            <div style={styles.chatBubbleEmp}>
                              {conv.message}
                              <div style={styles.chatMeta}>{formatDate(conv.date)} &mdash; You</div>
                            </div>
                          ) : (
                            <div style={styles.chatBubbleAdmin}>
                              {conv.message}
                              <div style={styles.chatMeta}>{formatDate(conv.date)} &mdash; Admin</div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <form
                    style={styles.chatInputRow}
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage(selectedTicket.ticketId);
                    }}
                  >
                    <input
                      type="text"
                      value={chatInputs[selectedTicket.ticketId] || ''}
                      onChange={e => handleChatInputChange(selectedTicket.ticketId, e.target.value)}
                      placeholder="Type a message..."
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        fontSize: 16,
                        outline: 'none'
                      }}
                      disabled={chatLoading[selectedTicket.ticketId]}
                    />
                    <button
                      type="submit"
                      disabled={chatLoading[selectedTicket.ticketId] || !(chatInputs[selectedTicket.ticketId] || '').trim()}
                      style={{
                        background: COLORS.blue,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: 8,
                        padding: '0 22px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: chatLoading[selectedTicket.ticketId] ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      {chatLoading[selectedTicket.ticketId] ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div style={{ ...sidebarStyle.sidebar, position: 'relative' }}>
            {sortedTickets.map(ticket => (
              <div
                key={ticket.ticketId}
                style={{
                  ...styles.ticketCard,
                  ...(ticket.ticketId === selectedTicketId ? styles.ticketCardActive : {})
                }}
                onClick={() => setSelectedTicketId(ticket.ticketId)}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontWeight: 700, color: COLORS.blue}}>{ticket.ticketName}</span>
                  <span style={styles.badge(ticket.ticketStatus)}>{ticket.ticketStatus}</span>
                </div>
                <div style={{fontSize: 13, color: COLORS.darkBlue, marginBottom: 2}}>
                  {ticket.ticketDescription.length > 40
                    ? ticket.ticketDescription.slice(0, 40) + '...'
                    : ticket.ticketDescription}
                </div>
                <div style={{fontSize: 12, color: COLORS.blue}}>
                  {formatDate(ticket.dateCreated)}
                </div>
              </div>
            ))}
            {/* Floating Add Ticket FAB for desktop, below the ticket list */}
            <button
              style={{
                ...styles.addTicketFab,
                ...(fabHover ? styles.addTicketFabHover : {}),
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 56,
                height: 56,
                fontSize: 30
              }}
              onMouseEnter={() => setFabHover(true)}
              onMouseLeave={() => setFabHover(false)}
              onClick={() => setShowAdd(true)}
              aria-label="Add Ticket"
            >
              +
            </button>
            {showAdd && (
              <div style={styles.modalOverlay}>
                <form
                  onSubmit={handleAddTicket}
                  style={styles.modalContent}
                >
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Employee Name</label>
                    <input
                      type="text"
                      value={employeeName}
                      disabled
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15,
                        background: COLORS.gray,
                        color: COLORS.darkBlue
                      }}
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Name</label>
                    <input
                      type="text"
                      name="ticketName"
                      value={form.ticketName}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15
                      }}
                      placeholder="e.g. VPN Problem"
                      autoFocus
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Ticket Description</label>
                    <textarea
                      name="ticketDescription"
                      value={form.ticketDescription}
                      onChange={handleFormChange}
                      required
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15,
                        minHeight: 60,
                        resize: 'vertical'
                      }}
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <div style={{marginBottom: 14}}>
                    <label style={{color: COLORS.blue, fontWeight: 600}}>Status</label>
                    <select
                      name="ticketStatus"
                      value={form.ticketStatus}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        border: `1.5px solid ${COLORS.gray}`,
                        marginTop: 6,
                        fontSize: 15
                      }}
                    >
                      <option>Pending Approval</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        background: COLORS.yellow,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 28px',
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                        boxShadow: `0 2px 8px ${COLORS.yellow}22`,
                        transition: 'background 0.2s'
                      }}
                    >
                      {submitting ? 'Adding...' : 'Submit Ticket'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 16,
                      background: 'none',
                      border: 'none',
                      color: COLORS.red,
                      fontSize: 22,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    aria-label="Close"
                  >×</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tickets;
