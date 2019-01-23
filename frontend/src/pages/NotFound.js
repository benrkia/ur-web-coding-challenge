import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={notFoundStyle}>
      <h1>404 | This page doesn't exist</h1>
      <Link style={goBackStyle} to='/'>Go back</Link>
    </div>
  )
}

const notFoundStyle = {
    position: 'absolute',
    right: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
}

const goBackStyle = {
    fontSize: '1.5em',
    padding: '10px',
    color: '#607D8B',
}