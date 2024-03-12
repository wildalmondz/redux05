import reportData from "./fullData";
import ReportComponent from "./ReportComponent";

export default function ProductTest({ }) {
    return (
        <>
            <div>
                <ReportComponent data={reportData}/>
            </div>
        </>
    );
}