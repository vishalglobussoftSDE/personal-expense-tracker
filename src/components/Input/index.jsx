import React from 'react'
import './style.css'
export const Input = ({ label, state, setState , placeholder, type }) => {
    return (
        <div className='input-wrapper'>
            <p className='lable-input'>{label}</p>
            <input 
            type={type}
            value={state} 
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)} 
            className="custom-input" 
            />
            
        </div>
    )
}
