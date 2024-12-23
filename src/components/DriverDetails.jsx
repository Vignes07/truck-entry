import LoadingSpinner from "./LoadingSpinner.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleDriverForm, setDriverData } from "../store/slices/driverFormSlice.js";
import Button from "./Button.jsx";
import { auth, db } from "../firebase/firebase.js";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

function DriverDetails() {
    const dispatch = useDispatch();

    const { driverData } = useSelector((state) => state.driverForm);
    const { isLoading } = useSelector((state) => state.loading);

    const handleDelete = async (driver) => {
        const user = auth.currentUser;
        if (!user) {
            console.error("No user is logged in.");
            return;
        }

        const driverDoc = doc(db, "driver-entries", user.uid);
        try {
            await updateDoc(driverDoc, {
                entries: arrayRemove(driver),
            });

            const updatedDrivers = driverData.filter((d) => d !== driver);
            dispatch(setDriverData(updatedDrivers));
        } catch (error) {
            console.error("Error deleting driver:", error.message);
        }
    };

    return (
        <div className="flex flex-col gap-2 m-10">
            {isLoading && <LoadingSpinner />}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#636ae8]">Driver details</h1>
                <Button type="button" name="Add Driver" onClick={() => dispatch(toggleDriverForm())} />
            </div>
            <div className="relative overflow-x-auto rounded-md">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-white uppercase bg-[#636ae8]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Profile Pic
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                            License
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {driverData
                        ?.slice()
                        .reverse()
                        .map((driver, i) => (
                            <tr
                                key={i}
                                className="dark:bg-gray-200 even:dark:bg-gray-300 border-b dark:border-gray-300 text-black font-medium"
                            >
                                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        className="object-cover rounded-full w-10 h-10 whitespace-nowrap"
                                        src={
                                            driver.profilePic ||
                                            "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                                        }
                                        alt={"profile-pic"}
                                    />
                                </th>
                                <td className="px-6 py-4">{driver.name}</td>
                                <td className="px-6 py-4">{driver.age}</td>
                                <td className="px-6 py-4">{driver.license}</td>
                                <td className="px-6 py-4">{driver.address}</td>
                                <td className="px-6 py-4">{driver.phoneNo}</td>
                                <td className="px-6 py-4">
                                    <button
                                        className="font-medium text-red-500 hover:underline"
                                        onClick={() => handleDelete(driver)}
                                    >
                                        Delete
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

export default DriverDetails;
