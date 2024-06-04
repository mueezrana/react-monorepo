import React, { useState } from 'react'

const PhotosItem = ({ item, handleUpdatePhoto, handleDeletePhoto }) => {
    const [title, setTitle] = useState(item.title)
    const [url, setUrl] = useState(item.url)
    return (
        <div style={{ marginBottom: '1rem' }}>
            <img
                style={{
                    display: 'block',
                    width: '5rem',
                    height: '5rem',
                    objectFit: 'cover',
                    border: '1px solid black',
                }}
                src={item.url}
            />
            <div>{item.title}</div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            &nbsp;
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            &nbsp;
            <button
                onClick={() => handleUpdatePhoto(item.id, title, url)}
                disabled={title === item.title && url === item.url}
            >
                Update
            </button>
            &nbsp;
            <button onClick={() => handleDeletePhoto(item.id)}>Delete</button>
        </div>
    )
}

export default PhotosItem
