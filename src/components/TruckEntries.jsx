import {useDispatch, useSelector} from "react-redux";
import { setSelectedEntry } from "../store/slices/entryFormSlice.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

function TruckEntries() {
    const dispatch = useDispatch();
    const { formData } = useSelector((state) => state.entryForm);
    const { isLoading } = useSelector((state) => state.loading);

    const handleView = (entry) => {
        dispatch(setSelectedEntry(entry));
    };

    return (
        <div className="flex flex-col gap-2 m-10">
            {isLoading && <LoadingSpinner />}
            <h1 className="text-2xl font-bold text-[#636ae8]">Truck Entries</h1>
            <div className="relative overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-white uppercase bg-[#636ae8]">
                    <tr>
                        <th scope="col" className="px-6 py-3">Consignment No</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">From</th>
                        <th scope="col" className="px-6 py-3">To</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formData?.slice().reverse().map((entry, i) => (
                        <tr
                            key={i}
                            className="dark:bg-gray-200 even:dark:bg-gray-300 border-b dark:border-gray-300 text-black font-medium"
                        >
                            <th scope="row" className="px-6 py-4 whitespace-nowrap">{entry.consignmentNo}</th>
                            <td className="px-6 py-4">{entry.date}</td>
                            <td className="px-6 py-4">{entry.from}</td>
                            <td className="px-6 py-4">{entry.to}</td>
                            <td className="px-6 py-4">{entry.amount}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleView(entry)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TruckEntries;
