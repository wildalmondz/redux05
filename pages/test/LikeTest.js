// LikeTest.js
import { useState, useEffect } from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import axios from 'axios';

const LikeButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    fontSize: 'small',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.primary.main,
}));

const LikeTest = () => {
    const testId = 59;

    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    // Check if the user has already liked on component mount
    useEffect(() => {
        const hasLikedStorage = localStorage.getItem(`hasLiked_${testId}`);

        if (hasLikedStorage) {
            const { hasLiked: storedHasLiked } = JSON.parse(hasLikedStorage);
            setHasLiked(storedHasLiked);
        }
    }, [testId]);

    const handleLike = async () => {
        if (!hasLiked) {  // also check for localStorage has_liked is true here
            setLikes(likes + 1);
            setHasLiked(true);

            // Store the information that the user has liked for the specific testId in localStorage
            localStorage.setItem(`hasLiked_${testId}`, JSON.stringify({ hasLiked: true }));

            try {
                await axios.post(`http://localhost:4500/blog/setlike/${testId}`);
            } catch (error) {
                console.error('Error updating likes:', error.message);
            }
        }
        else if (hasLiked) {
            alert('You have already liked this item');
        }
    };

    return (
        <>
            <div>
                <LikeButton onClick={handleLike} aria-label="like">
                    <FavoriteIcon />
                    {likes}
                </LikeButton>
            </div>
        </>
    );
};

export default LikeTest;
