// import React, { useState, useEffect, Fragment } from 'react'
// import axios from 'axios'

// const PhotosBrowser = () => {
//     const [photos, setPhotos] = useState([])
//     const [currentPage, setCurrentPage] = useState(1)
//     const itemsPerPage = 20
//     const [totalItems, setTotalItems] = useState(0)

//     useEffect(() => {
//         const fetchPhotos = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${itemsPerPage}`
//                 )
//                 setPhotos(response.data)
//                 setTotalItems(parseInt(response.headers['x-total-count'], 10))
//             } catch (error) {
//                 console.error('Error fetching photos:', error)
//             }
//         }

//         fetchPhotos()
//     }, [currentPage])

//     const totalPages = Math.ceil(totalItems / itemsPerPage)

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage((prevPage) => prevPage + 1)
//         }
//     }

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1)
//         }
//     }

//     return (
//         <div>
//             <div>
//                 {photos?.map((item, index) => (
//                     <Fragment key={item.id}>
//                         <img
//                             style={{
//                                 display: 'block',
//                                 width: '5rem',
//                                 height: '5rem',
//                             }}
//                             src={item.url}
//                             alt={item.title}
//                         />
//                         <div>{item.title}</div>
//                         {index !== itemsPerPage - 1 && <br />}
//                     </Fragment>
//                 ))}
//             </div>
//             <div style={{ marginTop: '1rem' }}>
//                 <button
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 &nbsp; &nbsp;
//                 <span>
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 &nbsp; &nbsp;
//                 <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default PhotosBrowser

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PhotosItem from './PhotosItem'

const PhotosBrowser = () => {
    const [photos, setPhotos] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20
    const [totalItems, setTotalItems] = useState(0)
    const [newPhotoTitle, setNewPhotoTitle] = useState('')
    const [newPhotoUrl, setNewPhotoUrl] = useState('')

    const apiBaseUrl = 'http://localhost:5000'

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/photos?_page=${currentPage}&_per_page=${itemsPerPage}`
            )
            const { items, data } = response.data
            setTotalItems(items)
            setPhotos(data)
        } catch (error) {
            console.error('Error fetching photos:', error)
        }
    }

    useEffect(() => {
        fetchPhotos()
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

    const handleCreatePhoto = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}/photos`, {
                title: newPhotoTitle,
                url: newPhotoUrl,
            })
            if (photos.length < 20) {
                setPhotos((prevPhotos) => [...prevPhotos, response.data])
            }
            setTotalItems((prevCount) => prevCount + 1)
            setNewPhotoTitle('')
            setNewPhotoUrl('')
        } catch (error) {
            console.error('Error creating photo:', error)
        }
    }

    const handleUpdatePhoto = async (id, newTitle, newUrl) => {
        try {
            const response = await axios.put(`${apiBaseUrl}/photos/${id}`, {
                title: newTitle,
                url: newUrl,
            })
            setPhotos((prevPhotos) =>
                prevPhotos.map((photo) =>
                    photo.id === id ? response.data : photo
                )
            )
        } catch (error) {
            console.error('Error updating photo:', error)
        }
    }

    const handleDeletePhoto = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}/photos/${id}`)
            setPhotos((prevPhotos) =>
                prevPhotos.filter((photo) => photo.id !== id)
            )
            setTotalItems((prevCount) => prevCount - 1)
            fetchPhotos()
        } catch (error) {
            console.error('Error deleting photo:', error)
        }
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <div>
                <input
                    type="text"
                    placeholder="New photo title"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                />
                &nbsp;
                <input
                    type="text"
                    placeholder="New photo Url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                />
                &nbsp;
                <button
                    onClick={handleCreatePhoto}
                    disabled={
                        newPhotoTitle.length === 0 || newPhotoUrl.length === 0
                    }
                >
                    Create Photo
                </button>
            </div>
            <div style={{ marginTop: '2rem' }}>
                {photos?.map((item) => (
                    <PhotosItem
                        key={item.id}
                        item={item}
                        handleUpdatePhoto={handleUpdatePhoto}
                        handleDeletePhoto={handleDeletePhoto}
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
                        photos.length < itemsPerPage
                    }
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default PhotosBrowser
