import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectPassword, setEmail, setPassword } from "../redux/features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../services/authService";

const Login = () => {

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await authServices.login({ email, password });

            if (response.status === 200) {
                alert(response.data.message);

                // clear form
                dispatch(setEmail(""));
                dispatch(setPassword(""));

                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold text-center">Login</h1>

            <form className="mt-8 space-y-6 max-w-sm mx-auto"
                onSubmit={handleLogin}
            >
                <input type="email" name="email" id="email" placeholder="Email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={email} onChange={(e) => dispatch(setEmail(e.target.value))}

                />

                <input type="password" name="password" id="password" placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={password} onChange={(e) => dispatch(setPassword(e.target.value))}
                />

                <input type="submit" value="Login" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
            </form>

            <div className="text-center mt-4">
                <Link to="/register" className="text-indigo-600 hover:underline">Don't have an account? Register</Link>
            </div>
        </div>
    )
}

export default Login;