'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'

const EditPrompt = () => {

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const {data:session} = useSession();
    const router = useRouter();

    const searchParams = useSearchParams()
    const postId = searchParams.get('id')

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/prompt/${postId}`)
            const data = await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag,
            })
        }

        if(postId) getPostDetails()
    },[postId])


    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if(!postId) return alert("No Post ID found")

        try {
            const response = await fetch(`/api/prompt/${postId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag,
                }),
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt