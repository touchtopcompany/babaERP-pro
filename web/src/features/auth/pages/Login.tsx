import { useLogin } from "../api/auth.api";

const Login = () => {

    const loginMutation = useLogin()


    loginMutation.mutateAsync(data)

    return (
        <div>

            <button></button>
            
        </div>
    );
};

export default Login;