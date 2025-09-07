import React from 'react';
import { confirmable } from 'react-confirm';

function ConfirmDialog({ show, proceed, message }) {
  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <p>{message}</p>
        <button style={buttonStyle} onClick={() => proceed(true)}>Yes</button>
        <button style={buttonStyle} onClick={() => proceed(false)}>Cancel</button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const dialogStyle = {
  background: '#202020',
  padding: '30px',
  borderRadius: '12px',
  color: '#fff',
  textAlign: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#4f46e5',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default confirmable(ConfirmDialog);
