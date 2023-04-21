import React from 'react';
import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';



export interface SideBarModel {
    title?: {
        label: string;
        onClick?: () => void;
    };
    user?: string;
    events: Array<{
        id?: string;
        label?: string;
        icon: any;
        path?: string;
        onClick?: () => void;
    }>;
}

const SideBar: React.FC<SideBarModel> = (props) => {
    const currentUrl = useLocation();
    
    const eventList = props.events.map((event, index) => {
        console.log({event});
        console.log('currentUrl.pathname', currentUrl.pathname)
        let isActive = false
        if (currentUrl.pathname === '/admin' && event.path === '/admin') {
            isActive = currentUrl.pathname === event.path;
        } else {
            if (index !== 0) {
                isActive = currentUrl.pathname.includes(`${event.path}`);
            }
          
        }
       
        const activeClass = isActive ? 'active' : '';
        return (
            <li key={index} className={`sidebar__menu__item ${activeClass}`} onClick={event.onClick}>
                <span className='sidebar__menu__item__icon'><FontAwesomeIcon icon={event.icon} style={{ fontSize: '10px' }} /></span>
                <span>{event.label}</span>
           </li>
        )
    });

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <h3 onClick={props.title?.onClick}>{props.title?.label}</h3>
            </div>
            <div className='sidebar__menu'>
                <ul>{eventList}</ul>
            </div>
        </div>
    );
};


export default SideBar;