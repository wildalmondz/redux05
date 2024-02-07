import {connect} from "react-redux";
import {
    checkAuth,
    checkForCompanyDetails,
    createCompany,
    fetchOwnerReport, fetchPlayerName,
    setMessage,
    updateCompany
} from "../../../../../actions.js";
import Company from '../Company.jsx';
import CompanyPageList from '../CompanyPageList.jsx';
import CompanyReport from "../CompanyReport.jsx";
import CompanySummary from "../CompanySummary.jsx";

export const CompanyId = connect(
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
)(Company);


export const Companies = connect(state =>
        ({
            companies: state.companyList.companies,
        }),
    dispatch =>
        ({
            onFetchCompanyId(companyId) {
                dispatch(checkForCompanyDetails(companyId));
            },
        }),
)(CompanyPageList);

export const CompanyReportId = connect(
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
            onCreateCompany(id, name, type, company, slug, email, phone, address, city, state, postal) {
                dispatch(createCompany(id, name, type, company, slug, email, phone, address, city, state, postal));
            },
            onMessage(message) {
                dispatch(setMessage(message));
            },
        }),
)(CompanyReport);

export const CompanySummaryId = connect(
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
)(CompanySummary);