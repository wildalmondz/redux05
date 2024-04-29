import { connect } from 'react-redux';
import AddPost from '../AddPost.jsx';

import {
    checkAuth,
    checkForBlog,
    createBlog,
    fetchPlayerId,
    setMessage,
    updateCompany,
} from '../../../../../actions.js';

export const AddPostId = connect(
    state =>
        ({
            messagetext: state.message.text,
            player: state.player.playername,
            playerId: state.playerId.playerId,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchAuthStatus() {
                dispatch(checkAuth());
            },
            onFetchPlayerId() {
                dispatch(checkAuth());
                dispatch(fetchPlayerId());
            },
            onUpdateBlog(id, name, type, company, slug, email, phone, address, city, state, postal) {
                dispatch(updateCompany(id, name, type, company, slug, email, phone, address, city, state, postal));
            },
            onCreateBlog(companyId, title, blog, author, status, image) {
                dispatch(createBlog(companyId, title, blog, author, status, image));
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
            onFetchUpdatedBlogs(type, slugName) {
                dispatch(checkForBlog(type, slugName));
            },
        }),
)(AddPost);