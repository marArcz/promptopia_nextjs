import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const handleTagClick = () => {

  }
  return (
    <section className=' w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc'>{desc}</p>
      <div className=" mt-16 prompt_layout">
        {
          data.map((post) => (
            <PromptCard
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Profile
