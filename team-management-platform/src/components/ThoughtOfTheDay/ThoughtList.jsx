import React from 'react';

const ThoughtList = ({ thoughts }) => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ color: '#333' }}>Thoughts of the Day</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {thoughts.map((thought, index) => (
                    <li key={index} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <p style={{ margin: '0', fontSize: '16px', color: '#555' }}>{thought.message}</p>
                        <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '14px', color: '#888' }}>Posted by: {thought.author}</span>
                            <span style={{ fontSize: '14px', color: '#888' }}>Likes: {thought.likes}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThoughtList;