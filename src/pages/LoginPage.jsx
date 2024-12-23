import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import Popup from "../components/Popup.jsx";
import { useDispatch } from "react-redux";
import { updateLogin } from "../store/slices/authSlice.js";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage({ login, isLogin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            document.cookie = `authToken=${token}; path=/; Secure; HttpOnly; SameSite=Strict;`;
            navigate("/");
        } catch (error) {
            setError(error.message);
            console.error("Login failed:", error);
        }
    };

    const content = (
        <div className="drop-shadow-2xl h-fit w-max bg-white rounded z-999 overflow-auto p-10">
            <h1 className="text-2xl font-extrabold text-[#636ae8]">Admin Profile</h1>
            <div className="flex flex-col justify-between items-center gap-4 m-2">
                <form className="flex flex-col justify-between items-center gap-3" onSubmit={handleLogin}>
                    <InputField
                        label="Email"
                        type="text"
                        name="email"
                        value={login.email || ""}
                        onChange={(value) => dispatch(updateLogin({ key: "email", value }))}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={login.password || ""}
                        onChange={(value) => dispatch(updateLogin({ key: "password", value }))}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" name="Login" styles="ml-0 w-full" />
                </form>
            </div>
        </div>
    );

    return <Popup isFormOpen={isLogin} content={content} />;
}

LoginPage.propTypes = {
    isLogin: PropTypes.bool,
    login: PropTypes.object,
};

export default LoginPage;