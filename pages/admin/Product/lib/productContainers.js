
import { connect } from 'react-redux';
// one of these is likely loading from another location? search!
import ProductDashboard from "../ProductDashboard.jsx";
import ProductSummary from "../ProductSummary.jsx";
import ProductPageList from "../ProductPageList.jsx";
import ProductReport from "../ProductReport.jsx";

import {
    checkAuth,
    checkForVideo,
    checkForProduct,
    checkForProductDetails,
    fetchOwnerReport,
    updateCompany,
    updateProduct,
    createProduct,
    setMessage,
    fetchPlayerName
} from '../../../../../actions.js';

import Product from "../Product.jsx";

export const ProductId = connect(
    state =>
        ({
            messagetext: state.message.text,
            player: state.player.playername,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchAuthStatus() {
                dispatch(checkAuth());
            },
            onFetchPlayerName() {
                dispatch(fetchPlayerName());
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        })
)(Product);

export const Products = connect(state =>
        ({
            products: state.productList.products,
        }),
    dispatch =>
        ({
            onFetchProductId(productId) {
                dispatch(checkForProductDetails(productId));
            },
        }),
)(ProductPageList);

export const ProductDashboardId = connect(
    state =>
        ({
            videos: state.videosList.videos,
            products: state.productList.products,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetch() {
                dispatch(checkForVideo());
            },
            onFetchProduct(productName) {
                dispatch(checkForProduct(productName));
            },
            onFetchProductDetails(productId) {
                dispatch(checkForProductDetails(productId));
            },
        }),
)(ProductDashboard);


export const ProductReportId = connect(
    state =>
        ({
            productDetails: state.productDetails.productDetails,
        }),
    dispatch =>
        ({
            onFetchOwnerReport() {
                dispatch(fetchOwnerReport());
            },
            onUpdateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status) {
                dispatch(updateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status));
            },
            onCreateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status) {
                dispatch(createProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status));
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        }),
)(ProductReport);

export const ProductSummaryId = connect(
    state =>
        ({
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchOwnerReport() {
                dispatch(fetchOwnerReport());
            },
            onUpdateCompany(id, name, type, company, slug, email, phone, address, city, state, postal) {
                dispatch(updateCompany(id, name, type, company, slug, email, phone, address, city, state, postal));
            },
        }),
)(ProductSummary);