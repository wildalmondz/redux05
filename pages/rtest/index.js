import reportData from "./fullData";
import ReportComponent from "./ReportComponent";
import CustomTable from "./CustomTable";

export default function rtest({ }) {
    return (
        <>
            <div>                <CustomTable data={reportData[0].participation}/>
                <ReportComponent data={reportData}/>


            </div>
        </>
    );
}