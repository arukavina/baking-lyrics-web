import React, { Component } from 'react'

import './GeneratedSong.css'
import face from '../../static/images/face.png'

export default () => {
  return(
    <div className='body'>
      <h2 className='title'> Lorem Ipsum</h2>
      <div className='contParraf'>
        <div className='parraf'>
          <p className='song'>
            Lorem Ipsum is simply dummy text
            of the printing and typesetting 
            industry. Lorem Ipsum has been the 
            industry's standard dummy text ever 
            since the 1500s, when an unknown 
            printer took a galley of type.
          </p>
        </div>
        <div className='parraf'>
          <p className='song'>
            Lorem Ipsum is simply dummy text 
            of the printing and typesetting 
            industry. Lorem Ipsum has been the 
            industry's standard dummy text ever 
            since the 1500s, when an unknown 
            printer took a galley of type.
          </p>
        </div>
        <div className='parraf'>
          <p className='song'>
          Lorem Ipsum is simply dummy text 
          of the printing and typesetting 
          industry. Lorem Ipsum has been the 
          industry's standard dummy text ever 
          since the 1500s, when an unknown 
          printer took a galley of type.
          </p>
        </div>
      </div>
      <button className='button'>Copy</button>
      <a href='' className='face' ><img className='imgFace' src={face}/></a>
    </div>
  )
}