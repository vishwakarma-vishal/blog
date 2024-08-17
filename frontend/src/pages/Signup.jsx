import { Link } from "react-router-dom";

const Signup = () => {
    return (
            <div className="w-auto sm:w-[450px] md:w-[500px] m-auto bg-white rounded px-2 sm:px-4 py-8 space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <p className="text-sm text-gray-700">Create a new account</p>
                </div>
                <div className="flex justify-center">
                    <form className="space-y-4 w-[90%]">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="firstname" className="text-sm font-semibold text-gray-800">First Name</label><br />
                                <input type="text" id="firstname" placeholder="Enter your first name" className="border p-2 rounded text-sm outline-none w-full" required></input>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="lastname" className="text-sm font-semibold text-gray-800">Last Name</label><br />
                                <input type="text" id="lastname" placeholder="Enter your last name" className="border p-2 rounded text-sm outline-none w-full" required></input>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-800">Email</label><br />
                            <input type="email" id="email" placeholder="Enter your email address" className="border p-2 rounded text-sm w-full outline-none" required></input>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label htmlFor="pass" className="text-sm font-semibold text-gray-800">Password</label><br />
                                <input type="password" id="pass" placeholder="Enter your password" className="border p-2 rounded text-sm outline-none w-full" required></input>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="confirmPass" className="text-sm font-semibold text-gray-800">Confirm Password</label><br />
                                <input type="password" id="confirmPass" placeholder="Confirm password" className="border p-2 rounded text-sm outline-none w-full" required></input>
                            </div>
                        </div>
                        <p className="text-sm text-gray-900 text-center">
                            Already have an account
                            <Link to="/login" className="text-green-500 hover:underline cursor-pointer ml-1">
                                Login here</Link></p>
                        <button className="inline-block w-full p-2 rounded text-white bg-green-500 hover:bg-green-600">Create account</button>
                    </form>
                </div>
            </div>
    )
}

export default Signup;