import React from 'react'
import Container from'../component/container/Container.jsx'
import {Postform} from'../component/Postform/Postform.jsx'
function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <Postform/>
        </Container>
      
    </div>
  )
}

export default AddPost
