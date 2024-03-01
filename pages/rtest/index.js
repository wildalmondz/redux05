import reportData from "./fullData";
import ReportComponent from "./ReportComponent";

export default function rtest({ }) {
    return (
        <>
            <div>
                <ReportComponent data={reportData}/>
            </div>
        </>
    );
}