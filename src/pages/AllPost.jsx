import React, { useState, useEffect } from 'react';
import Container from '../component/container/Container.jsx';
import { Postcard } from '../component/Postcard.jsx';
import appwriteService from '../appwrite/config.js';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from Appwrite
        appwriteService.getposts().then((data) => {
            console.log("Fetched posts: ", data);  // Log the entire response to check the structure
            if (data && Array.isArray(data.documents)) {
                setPosts(data.documents);  // Access posts inside the 'documents' array
            } else {
                console.error("Error: Data does not contain 'documents' array", data);
            }
        }).catch((error) => {
            console.error("Error fetching posts: ", error);
        });
    }, []);

    return (
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <Postcard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl font-semibold text-gray-600 w-full">
                            No posts found.
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
