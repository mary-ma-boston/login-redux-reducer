import React, {useContext} from 'react';

import AuthContext from "../store/auth-context";

const Navigation = () => {
    const ctx = useContext(AuthContext);
    return (
        <nav>
            <ul>
                {ctx.isLogin && (<li><a href='/'>Users</a></li>)}
                {ctx.isLogin && (<li><a href='/'>Admin</a></li>)}
                {ctx.isLogin && (<li><button onClick={ctx.logout}>Logout</button></li>)}
            </ul>
        </nav>
    )
}

export default Navigation;