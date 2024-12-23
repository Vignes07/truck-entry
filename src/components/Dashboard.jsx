import { Truck } from "lucide-react"

function Dashboard() {
    return (
        <div className="px-40 py-10">
            <div className="flex justify-between items-center w-full gap-10">
                <div className="flex items-center p-10 justify-around w-96 h-40 rounded bg-white drop-shadow-md">
                    <Truck size={50} className="text-gray-700"/>
                    <div className="flex flex-col items-center w-fulltext-black">
                        <span className="text-3xl text-gray-700 font-bold">50</span>
                        <span className="text-gray-500 font-medium">Total Trucks</span>
                    </div>
                </div>
                <div className="flex items-center p-10 justify-around w-96 h-40 rounded bg-white drop-shadow-md">
                    <Truck size={50} className="text-gray-700"/>
                    <div className="flex flex-col items-center w-fulltext-black">
                        <span className="text-3xl text-gray-700 font-bold">50</span>
                        <span className="text-gray-500 font-medium">Total Trucks</span>
                    </div>
                </div>
                <div className="flex items-center p-10 justify-around w-96 h-40 rounded bg-white drop-shadow-md">
                    <Truck size={50} className="text-gray-700"/>
                    <div className="flex flex-col items-center w-fulltext-black">
                        <span className="text-3xl text-gray-700 font-bold">50</span>
                        <span className="text-gray-500 font-medium">Total Trucks</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;