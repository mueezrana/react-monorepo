import React, { useState } from 'react'

const AlbumItem = ({ item, handleUpdateAlbum, handleDeleteAlbum }) => {
    const [value, setValue] = useState(item.title)
    return (
        <div style={{ marginBottom: '0.25rem' }}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            &nbsp;
            <button
                onClick={() => handleUpdateAlbum(item.id, value)}
                disabled={value === item.title}
            >
                Update
            </button>
            &nbsp;
            <button onClick={() => handleDeleteAlbum(item.id)}>Delete</button>
        </div>
    )
}

export default AlbumItem
