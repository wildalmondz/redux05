/*
import {connect} from "react-redux";
import ExperienceDashboard from "../ExperienceDashboard.jsx";
import WAExperience from "../WAExperience.jsx";
import GamePageList from "../GamePageList.jsx";
import SquarePageList from "../SquarePageList.jsx";
import SquaresReport from "../SquaresReport.jsx";
import TournamentPageList from "../TournamentPageList.jsx";
import TourneyReport from "../TourneyReport.jsx";

import {
    adminGame,
    adminSquare,
    adminTournament,
    adminTournaments,
    checkAuth,
    checkForCompany,
    checkForCompanyDetails,
    clearAdminGame,
    clearAdminSquare,
    clearAdminTournament,
    createProduct,
    createTourney,
    fetchOwnerReport,
    setMessage,
    updateProduct,
    updateTourney,
} from "../../../../../actions.js";

export const AdminGames = connect(state =>
        ({
            tournamentgames: state.admintournament.tournamentgames,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchCompanyId(companyId) {
                dispatch(checkForCompanyDetails(companyId));
            },
            onFetchAdminTournaments(companyId) {
                dispatch(adminTournaments(companyId));
            },
            onFetchAdminGame(gameId) {
                dispatch(adminGame(gameId));
            },
            onClearAdminGame() {
                dispatch(clearAdminGame());
            },
        }),
)(GamePageList);

export const AdminSquares = connect(state =>
        ({
            tournamentsquares: state.admintournament.tournamentsquares,
            companyDetails: state.companyDetails.companyDetails,
            adminsquare: state.adminsquare.adminsquare,
        }),
    dispatch =>
        ({
            onFetchAdminSquare(squareId) {
                dispatch(adminSquare(squareId));
            },
            onClearAdminSquare() {
                dispatch(clearAdminSquare());
            },
        }),
)(SquarePageList);

export const AdminTournaments = connect(state =>
        ({
            admintournaments: state.admintournaments.admintournaments,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchCompanyId(companyId) {
                dispatch(checkForCompanyDetails(companyId));
            },
            onFetchAdminTournaments(companyId) {
                dispatch(adminTournaments(companyId));
            },
            onFetchAdminTournament(tournamentId) {
                dispatch(adminTournament(tournamentId));
            },
            onClearAdminTournament() {
                dispatch(clearAdminTournament());
                dispatch(clearAdminGame());
                dispatch(clearAdminSquare());
            },
        }),
)(TournamentPageList);

export const ExperienceId = connect(
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
                dispatch(checkAuth());
                dispatch(fetchPlayerName());
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        })
)(WAExperience);

export const ExperienceDashboardId = connect(
    state =>
        ({
            companies: state.player.companies,
            companyDetails: state.companyDetails.companyDetails,
        }),
    dispatch =>
        ({
            onFetchTournamentDetails() {
                dispatch(checkForTournament());
            },
            onFetchCompany(companyName) {
                dispatch(checkForCompany(companyName));
            },
            onFetchCompanyDetails(companyId) {
                dispatch(checkForCompanyDetails(companyId));
            },
            onFetchAdminTournaments(companyId) {
                dispatch(adminTournaments(companyId));
            },
        }),
)(ExperienceDashboard);

export const SquaresReportId = connect(
    state =>
        ({
            companyDetails: state.companyDetails.companyDetails,
            admintournament: state.admintournament.admintournament,
            adminsquare: state.adminsquare.adminsquare,
        }),
    dispatch =>
        ({
            onFetchOwnerReport() {
                dispatch(fetchOwnerReport());
            },
            onUpdateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status) {
                dispatch(updateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status));
            },
            onCreateProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status, tournament_id) {
                dispatch(createProduct(square_id, event_id, image_id, square_name, square_description, square_division, square_rank, square_url, child_id, square_status, image_path, reserve_url, map_url, video_url, isAd, ad_status, tournament_id));
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        }),
)(SquaresReport);

export const TourneyReportId = connect(
    state =>
        ({
            companyDetails: state.companyDetails.companyDetails,
            admintournament: state.admintournament.admintournament,
        }),
    dispatch =>
        ({
            onFetchOwnerReport() {
                dispatch(fetchOwnerReport());
            },
            onUpdateTourney(tournament_id, tournament_name, tournament_description, tournament_restriction, almond_count, tournament_status, square_count, expires,  expired_status, id) {
                dispatch(updateTourney(tournament_id, tournament_name, tournament_description, tournament_restriction, almond_count, tournament_status, square_count, expires,  expired_status, id));
            },
            onCreateTourney(tournament_id, tournament_name, tournament_description, tournament_restriction, almond_count, tournament_status, square_count, expires,  expired_status, id) {
                dispatch(createTourney(tournament_id, tournament_name, tournament_description, tournament_restriction, almond_count, tournament_status, square_count, expires, expired_status, id));
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        }),
)(TourneyReport);

 */