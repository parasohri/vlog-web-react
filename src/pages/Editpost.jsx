import React from 'react'
import { useState,useEffect } from 'react'
import Container from'../component/container/Container.jsx'
import {Postform} from '../component/Postform/Postform.jsx'
import appwriteService from'../appwrite/config.js'
import { useNavigate,  useParams } from 'react-router-dom';
function Editpost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : null
}



export default Editpost
