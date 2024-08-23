import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";

const Signup = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Initialize from data
    const [formdata, setFormdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [confirmPass, setConfirmPass] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    // display warning if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Sign up first, to create a post.");
        }
    }, []);

    // Handle changes for form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "confirmPass") {
            setConfirmPass(value);

            if (formdata.password && value !== formdata.password) {
                setWarningMessage("Passwords do not match!");
            } else {
                setWarningMessage("");
            }
        } else {
            setFormdata((prevFormdata) => ({
                ...prevFormdata,
                [name]: value,
            }));

            if (name === "password" && confirmPass) {
                if (value !== confirmPass) {
                    setWarningMessage("Passwords do not match!");
                } else {
                    setWarningMessage("");
                }
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prevent form submission if there's a warning
        if (warningMessage) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(login({ isLoggedIn: true, user: data.user }));
                toast.success("Account created successfully");
                navigate('/profile');
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (error) {
            toast.error("Something went wrong, try again later");
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="w-auto sm:w-[450px] md:w-[500px] m-auto bg-white rounded px-2 sm:px-4 py-8 space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Sign Up</h2>
                <p className="text-sm text-gray-700">Create a new account</p>
            </div>

            <div className="flex justify-center">
                <form className="space-y-4 w-[90%]" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label
                                htmlFor="firstname"
                                className="text-sm font-semibold text-gray-800">
                                First Name
                            </label><br />
                            <input
                                type="text"
                                id="firstname"
                                name="firstName"
                                minLength={3}
                                placeholder="Enter your first name"
                                className="border p-2 rounded text-sm outline-none w-full"
                                value={formdata.firstName}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <div className="space-y-1">
                            <label
                                htmlFor="lastname"
                                className="text-sm font-semibold text-gray-800">
                                Last Name
                            </label><br />
                            <input
                                type="text"
                                id="lastname"
                                name="lastName"
                                minLength={3}
                                placeholder="Enter your last name"
                                className="border p-2 rounded text-sm outline-none w-full"
                                value={formdata.lastName}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-gray-800">
                            Email
                        </label><br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="border p-2 rounded text-sm w-full outline-none"
                            value={formdata.email}
                            onChange={handleChange}
                            required>
                        </input>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label
                                htmlFor="pass"
                                className="text-sm font-semibold text-gray-800">
                                Password
                            </label><br />
                            <input
                                type="password"
                                id="pass"
                                name="password"
                                minLength={5}
                                placeholder="Enter your password"
                                className="border p-2 rounded text-sm outline-none w-full"
                                value={formdata.password}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <div className="space-y-1">
                            <label
                                htmlFor="confirmPass"
                                className="text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label><br />
                            <input
                                type="password"
                                id="confirmPass"
                                name="confirmPass"
                                placeholder="Confirm password"
                                className="border p-2 rounded text-sm outline-none w-full"
                                value={confirmPass}
                                onChange={handleChange}
                                required>
                            </input>
                            {warningMessage && (
                                <p className="text-red-500 text-xs mt-1">{warningMessage}</p>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-900 text-center">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-green-500 hover:underline cursor-pointer ml-1">
                            Login here
                        </Link>
                    </p>
                    <button
                        type="submit"
                        className="inline-block w-full p-2 rounded text-white bg-green-500 hover:bg-green-600">
                        Create account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
