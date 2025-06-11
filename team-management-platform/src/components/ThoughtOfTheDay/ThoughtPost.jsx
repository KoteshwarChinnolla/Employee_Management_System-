import React, { useState } from 'react';

const ThoughtPost = () => {
    const [thought, setThought] = useState('');

    const handlePost = () => {
        // Logic to post the thought (e.g., API call)
        console.log('Posted Thought:', thought);
        setThought('');
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
            <h3>Post Your Thought of the Day</h3>
            <textarea
                style={{ width: '100%', height: '100px', marginBottom: '10px' }}
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Share your thought..."
            />
            <button
                onClick={handlePost}
                style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Post
            </button>
        </div>
    );
};

export default ThoughtPost;