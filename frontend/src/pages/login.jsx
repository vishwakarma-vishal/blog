import { Link } from "react-router-dom";

const Login = () => {
    return (
            <div className="w-auto sm:w-[400px] md:w-[450px] m-auto bg-white w-[400px] m-auto flex flex-col gap-4 items-center rounded p-6 sm:p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Log In</h2>
                    <p className="text-sm text-gray-700">Enter the details</p>
                </div>

                <form className="space-y-4 w-full">
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">Email</label><br />
                        <input type="email" id="email" placeholder="Enter your email address" className="border p-2 rounded text-sm w-full outline-none w-full" required></input>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="pass" className="text-sm font-semibold text-gray-800">Password</label><br />
                        <input type="password" id="pass" placeholder="Enter your password" className="border p-2 rounded text-sm outline-none w-full" required></input>
                    </div>
                    <p className="text-sm text-gray-900 text-center">
                        Don't have an account
                        <Link to="/signup" className="text-green-500 hover:underline cursor-pointer ml-1">
                            Create one
                        </Link></p>
                    <button className="inline-block w-full p-2 rounded text-white bg-green-500 hover:bg-green-600">Log In</button>
                </form>
            </div>
    )
}

export default Login;