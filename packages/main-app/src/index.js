import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import ComponentApp1 from 'component-app-1'
import ComponentApp2 from 'component-app-2'

const MainApp = () => (
    <div style={{ margin: '0 1rem' }}>
        <Router>
            <div>
                <h1 style={{ textAlign: 'center', margin: 0 }}>Main App</h1>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 0 1rem 0',
                    }}
                >
                    <h3 style={{ margin: 0 }}>
                        <Link to="/component-1">Albums Browser</Link>
                    </h3>
                    &nbsp;
                    <span>{'|'}</span>
                    &nbsp;
                    <h3 style={{ margin: 0 }}>
                        <Link to="/component-2">Photos Browser</Link>
                    </h3>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/component-1" element={<ComponentApp1 />} />
                    <Route path="/component-2" element={<ComponentApp2 />} />
                </Routes>
            </div>
        </Router>
    </div>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<MainApp />)
