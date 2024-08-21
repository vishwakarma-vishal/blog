import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });

    // Handle form data change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormdata((prevFormdata) => ({
            ...prevFormdata,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });

            const data = await response.json();
            console.log("response data->", data);

            if (response.ok) {
                // Dispatch login action with user data
                dispatch(login({ isLoggedIn: true, user: data.user }));
                toast.success("Login successful");
                navigate('/profile');
            } else {
                toast.error(`${data.message}`);
            }

        } catch (error) {
            toast.error("Something went wrong, try again later");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="w-auto sm:w-[400px] md:w-[450px] m-auto bg-white flex flex-col gap-4 items-center rounded p-6 sm:p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Log In</h2>
                <p className="text-sm text-gray-700">Enter the details</p>
            </div>

            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
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
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-800">
                        Password
                    </label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="border p-2 rounded text-sm outline-none w-full"
                        value={formdata.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <p className="text-sm text-gray-900 text-center">
                    Don't have an account
                    <Link
                        to="/signup"
                        className="text-green-500 hover:underline cursor-pointer ml-1">
                        Create one
                    </Link>
                </p>
                <button
                    type="submit"
                    className="inline-block w-full p-2 rounded text-white bg-green-500 hover:bg-green-600">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
