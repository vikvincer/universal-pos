import React from 'react';
import Sidebar, { SideBarModel } from '../../components/SideBar';
import './AdminPage.scss';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { faPlus, faUserPlus, faHouseUser, faFileLines } from '@fortawesome/free-solid-svg-icons';

import AdminPageDashboard from './AdminPageDashboard';
import AdminPageUsersManagement from './AdminPageUserManagement';
import AdminPageProductManagement from './AdminPageProductManagement';


const AdminPage: React.FC = () => {
    const history = useHistory();
    const routerMatch = useRouteMatch();

    const sideBarProps: SideBarModel = {
        title: {
            label: 'Admin',
            onClick: () => history.push(`${routerMatch.url}`)
        },
        user: 'Admin',
        events: [
            {
                id: '1',
                label: 'Dashboard',
                icon: faHouseUser,
                onClick: () => history.push(`${routerMatch.url}`),
                path: `${routerMatch.url}`
            },
            {
                id: '2',
                label: 'Menu',
                icon: faPlus,
                onClick: () => history.push(`${routerMatch.url}/products`),
                path: `${routerMatch.url}/products`
            },
            {
                id: '3',
                label: 'Users',
                icon: faUserPlus,
                onClick: () => history.push(`${routerMatch.url}/users`),
                path: `${routerMatch.url}/users`
            },
            {
                id: '4',
                label: 'Transactions',
                icon: faFileLines,
                onClick: () => history.push(`${routerMatch.url}/transactions`),
                path: `${routerMatch.url}/transactions`
            },
        ]
    };
    

    return (
        <div className='admin-page'>
            <div className='admin-page__sidebar'>
                <Sidebar {...sideBarProps}/>
            </div>

            <div className='admin-page__content'>
                <Switch>
                <Route exact path={`${routerMatch.path}`}>
                    <AdminPageDashboard />
                </Route>
                <Route path={`${routerMatch.path}/products`}>
                    <AdminPageProductManagement />
                </Route>
                <Route path={`${routerMatch.path}/users`}>
                    <AdminPageUsersManagement />
                </Route>
                    <Route path={`${routerMatch.path}/transactions`}>
                    <AdminPageUsersManagement />
                </Route>
                </Switch>
            </div>
        </div>
    );

};

export default AdminPage;
