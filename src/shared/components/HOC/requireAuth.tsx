import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { NavigationRoutes } from '../../../routes/routeConstants/appRoutes';
import RestrictAccess from "../RestrictedAccess";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const Authentication = (props: any) => {
        const {allowedRoles} = props
        const { authenticated } = AuthContext();
        const location = useLocation();
        const navigate = useNavigate();
        useEffect(() => {
            if (!authenticated && location.pathname !== NavigationRoutes.LOGIN) {
                return navigate(NavigationRoutes.LOGIN);
            }
        }, [props]);

        if(allowedRoles?.length) {
            const { user } = props;
            return allowedRoles.includes(user.role) ? children : <RestrictAccess />;
        }
        return children;
    } 

    return <Authentication/>;
};

export const isAuthenticated = (component: JSX.Element) => {
    return RequireAuth({children: component});
};


export default isAuthenticated;