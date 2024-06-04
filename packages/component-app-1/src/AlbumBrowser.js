import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AlbumItem from './AlbumItem'

const AlbumBrowser = () => {
    const [albums, setAlbums] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20
    const [totalItems, setTotalItems] = useState(0)
    const [newAlbumTitle, setNewAlbumTitle] = useState('')

    const apiBaseUrl = 'http://localhost:5000'

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/albums?_page=${currentPage}&_per_page=${itemsPerPage}`
            )
            const { items, data } = response.data
            setTotalItems(items)
            setAlbums(data)
        } catch (error) {
            console.error('Error fetching albums:', error)
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [currentPage])

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }

    const handleCreateAlbum = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/albums`, {
                title: newAlbumTitle,
            })
            if (albums.length < 20) {
                setAlbums((prevAlbums) => [...prevAlbums, response.data])
            }
            setTotalItems((prevCount) => prevCount + 1)
            setNewAlbumTitle('')
        } catch (error) {
            console.error('Error creating album:', error)
        }
    }

    const handleUpdateAlbum = async (id, newTitle) => {
        try {
            const response = await axios.put(`${apiBaseUrl}/albums/${id}`, {
                title: newTitle,
            })
            setAlbums((prevAlbums) =>
                prevAlbums.map((album) =>
                    album.id === id ? response.data : album
                )
            )
        } catch (error) {
            console.error('Error updating album:', error)
        }
    }

    const handleDeleteAlbum = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}/albums/${id}`)
            setAlbums((prevAlbums) =>
                prevAlbums.filter((album) => album.id !== id)
            )
            setTotalItems((prevCount) => prevCount - 1)
            fetchAlbums()
        } catch (error) {
            console.error('Error deleting album:', error)
        }
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <div>
                <input
                    type="text"
                    placeholder="New album title"
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                />
                &nbsp;
                <button
                    onClick={handleCreateAlbum}
                    disabled={newAlbumTitle.length === 0}
                >
                    Create Album
                </button>
            </div>
            <div style={{ marginTop: '2rem' }}>
                {albums?.map((item) => (
                    <AlbumItem
                        key={item.id}
                        item={item}
                        handleUpdateAlbum={handleUpdateAlbum}
                        handleDeleteAlbum={handleDeleteAlbum}
                    />
                ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                &nbsp; &nbsp;
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                &nbsp; &nbsp;
                <button
                    onClick={handleNextPage}
                    disabled={
                        currentPage === totalPages ||
                        albums.length < itemsPerPage
                    }
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AlbumBrowser
