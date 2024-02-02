
// export default function News({ results }) {

import Layout from "../../../components/Layout"
import { handler } from "../../api"
import squareDetails from './squareDetails.json';
import ContainerNoDivision from "./containerNoDivision";
import SquareList from "./SquareList";
import SquareMenu from "./SquareMenu";

export default function rtest({ }) {

    return (
        <ContainerNoDivision>
                <SquareMenu/>
        </ContainerNoDivision>
    );
}