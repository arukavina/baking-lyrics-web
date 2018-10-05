import React from 'react'
import logoRed from '../../static/images/logoRed.png'
import './SeedData.css'

export default ({ handleSubmit }) => {
  return(
    <div className="SeedDataContainer">
      <div className="header">
        <img className="logoRed" src={logoRed} alt="baking logo" />
      </div>
      <div className="formContainer">
        <div className="form">
          <div className="headerContainer">
            <spam className="headerSubTitle">
              CREATE RANDOM LYRICS LIKE
            </spam>
            <spam className="headerTitle">
              AC DC
            </spam>
          </div>
          <div className="inputContainer">
            <input className='input' placeholder='Seed'/>
            <input className='input' placeholder='Title' type='text' />
          </div>
          <spam className="form"></spam>
          <form className="main" onSubmit={handleSubmit}>
            <div className='contArea'>
                <button type="submit" className='generateButton'>GENERATE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
