import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from "../redux/features/auth/registerSlice";
import authServices from "../services/authService";

const Register = () => {

    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();


        try {
            const response = await authServices.register({ name, email, password });

            if (response.status === 201) {
                alert(response.data.message);

                // clear form
                dispatch(setName(''));
                dispatch(setEmail(''));
                dispatch(setPassword(''));

                setTimeout(() => {
                    navigate('/login');
                }, 500);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold text-center">Register</h1>

            <form className="mt-8 space-y-6 max-w-sm mx-auto"
                onSubmit={handleRegister}
            >
                <input type="text" name="name" id="name" placeholder="Name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                />

                <input type="email" name="email" id="email" placeholder="Email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />

                <input type="password" name="password" id="password" placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                />

                <input type="submit" value="Register" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
            </form>

            <div className="text-center mt-4">
                <Link to="/login" className="text-indigo-600 hover:underline">Already have an account? Login</Link>
            </div>
        </div>
    )
}

export default Register;