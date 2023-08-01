import React, {useContext} from 'react';
import AuthContext from '../store/auth-context';

const Home = () => {
    const ctx = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome back!</h1>
            <button onClick={ctx.logout}>Logout</button>
        </div>
    )
}

export default Home;