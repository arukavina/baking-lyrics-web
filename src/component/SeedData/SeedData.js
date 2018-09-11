import React from 'react'
import logoled from '../../static/images/logo-led.png'
import logoRed from '../../static/images/logoRed.png'
import './SeedData.css'

export default ({ handleSubmit }) => {
  return(
    <div className="backgound">
      <div className="header">
        <img className="logoRed" src={logoRed} />
        <div className="buttonsContainer" />
      </div>
      <form className="main" onSubmit={handleSubmit}>
        <img className='led' src={logoled}/>
        <div className='contArea'>
          <textarea className='textArea' placeholder='Seed'/>
          <div className='titleSection'>
            <input className='titleInp' placeholder='Title' type='text' />
            <label><input className='checkbox' type='checkbox' />Generate Automatically</label>
          </div>
            <button type="submit" className='generateButton'>GENERATE</button>
        </div>
      </form>
    </div>
  );
}
