import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import ContentHeader, { ContentHeaderModel } from "../../components/ContentHeader";
import "./AdminPageProductManagement.scss";
import AddCategoryForm from "../../components/AddCategoryForm";
import AddItemForm from "../../components/AddItemForm";


const AdminPageProductManagement: React.FC = () => {
    const routeMatch = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
          console.log("URL has changed", history.location.pathname);
          if (history.location.pathname == `/admin/products`) {
            setActiveControlIndex(0);
          }
        });
    
        // Return a cleanup function to stop listening for changes when the component unmounts
        return () => {
          unlisten();
        };
      }, [history]);
    const [contentHeaderProps, setContentHeaderProps] = useState<Array<ContentHeaderModel>>([
        { title: "Manage menu", link: `${routeMatch.path}`, event: () =>  onChangeControlIndex(0,  `${routeMatch.path}`)},
        // { title: "Add dish", link: `${match.path}/add-dish` },
    ]);



    const [activeControlIndex, setActiveControlIndex] = useState(0);
    const onChangeControlIndex = (index: number, link: string) => {
        history.push(link)
        setActiveControlIndex(index);
        setActiveControlIndex(() => index);
        // Can use function to update state
        // setActiveControlIndex((prevState) => {
        //     return [...prevState, { title: "Add dish", link: `${match.path}/add-dish` }];
        // });
    }

    const controlsElement = [
        { title: "Menu list", link: `${routeMatch.path}` },
        { title: "Add category", link: `${routeMatch.path}/add-category` },
        { title: "Add item", link: `${routeMatch.path}/add-item` },
    ].map((item, index) => {
        return (
            <span key={index} onClick={() => onChangeControlIndex(index, item.link)} className={`${activeControlIndex === index ? 'activeControl' : ''}`} >{item.title}</span>
        );
    });

    return (
        <>
            <ContentHeader contentHeaderProps={contentHeaderProps} />
            <div className="admin-product-mgmt__controls">
                {controlsElement}
            </div>
            <div className="admin-product-mgmt__content">
                <Switch>
                    <Route exact path={`${routeMatch.path}`}>
                        <h1>Menu list</h1>
                    </Route>
                    <Route path={`${routeMatch.path}/add-category`}>
                        <AddCategoryForm />
                    </Route>
                    <Route path={`${routeMatch.path}/add-item`}>
                        <AddItemForm />
                    </Route>
                </Switch>
            </div>
        </>
    );
};

export default AdminPageProductManagement;
