import {Plus, Truck, User} from "lucide-react"
import {Link, useNavigate} from "react-router-dom";
import {toggleEntryForm} from "../store/slices/entryFormSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {toggleAdminProfile} from "../store/slices/adminProfileSlice.js";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profileData: { profilePic, name } } = useSelector((state) => state.adminProfile);

    return (
        <nav className="flex flex-col bg-[#636ae8] h-[100vh] w-[25rem] p-10 gap-16">
            <h1 className="text-2xl font-extrabold text-white cursor-pointer" onClick={() => navigate("/") }>Truck Entry</h1>
            <div className='relative flex flex-col gap-5 h-full'>
                <button type='button'
                        className='flex items-center justify-center w-full gap-5 text-[#636ae8] bg-white rounded px-4 py-3 font-medium text-md cursor-pointer'
                        onClick={() => {
                            dispatch(toggleEntryForm())
                        }}>Add Entry<Plus size={18}/>
                </button>
                <ul className="flex flex-col gap-3 text-gray-300 text-xl">
                    <li className="flex items-center gap-2 hover:text-white">
                        <Truck size={20}/>
                        <Link to="/truck-entries">Truck Entries</Link>
                    </li>
                    <li className="flex items-center gap-2 hover:text-white">
                        <User size={20}/>
                        <Link to="/driver-details">Driver Details</Link>
                    </li>
                </ul>
                <div
                    className='absolute bottom-0 flex cursor-pointer bg-white justify-between w-full rounded px-5 py-3 items-center'
                    onClick={() => dispatch(toggleAdminProfile())}
                >
                    <div className="flex flex-col">
                        <span className="font-medium">{name || "Admin"}</span>
                        <a
                            className="cursor-pointer text-xs text-[#636ae8]"
                        >
                            View profile
                        </a>
                    </div>
                    <img
                        src={profilePic || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}
                        className="w-10 h-10 object-cover rounded-full"
                        alt="profile-pic"
                    />
                </div>

            </div>
        </nav>
    );
}

export default Navbar;