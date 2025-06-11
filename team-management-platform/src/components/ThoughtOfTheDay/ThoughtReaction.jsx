import React, { useState } from 'react';

const ThoughtReaction = ({ thoughtId, initialLikes, onReact }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasReacted, setHasReacted] = useState(false);

    const handleReaction = () => {
        if (!hasReacted) {
            setLikes(likes + 1);
            setHasReacted(true);
            onReact(thoughtId);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <button 
                onClick={handleReaction} 
                style={{ 
                    backgroundColor: hasReacted ? '#ccc' : '#007bff', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    padding: '5px 10px', 
                    cursor: 'pointer' 
                }}
                disabled={hasReacted}
            >
                {hasReacted ? 'Liked' : 'Like'}
            </button>
            <span style={{ marginLeft: '10px' }}>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </div>
    );
};

export default ThoughtReaction;