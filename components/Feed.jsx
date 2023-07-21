'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data = [], handleTagClick }) => {
    return (
        <div className=" mt-16 prompt_layout">
            {
                data.map((post) => (
                    <PromptCard
                        key={post.id}
                        post={post}
                        handleTagClick={() => handleTagClick(post)}
                    />
                ))
            }
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
        setTimeout(() => filterPosts(), 500)
    }

    const filterPosts = () => {
        const regex = new RegExp(searchText, "i")

        const filteredPosts = posts.filter(
            (post) =>
                regex.test(post.creator.username) ||
                regex.test(post.prompt) ||
                regex.test(post.tag)
        )

        setSearchResult(filteredPosts)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
        }

        fetchPosts()
    }, [])

    const searchTag = (post) => {
        setSearchText(post.tag)
        setTimeout(() => filterPosts(), 500)
    }

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={searchText === "" ? posts : searchResult}
                handleTagClick={searchTag}
            />
        </section>
    )
}

export default Feed
