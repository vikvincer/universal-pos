import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import ContentHeader, { ContentHeaderModel } from "../../components/ContentHeader";
import "./AdminPageProductManagement.scss";
import AddCategoryForm, { CategoryFormModel, defaultValue as CategoryDefaultValue, CategoryStatus } from "../../components/AddCategoryForm";
import AddItemForm from "../../components/AddItemForm";
import { categoryService } from '../../services/category.service';


const AdminPageProductManagement: React.FC = () => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const userService = categoryService('http://localhost:4000/api/item/');

    const [isSuccess, setIsSuccess] = useState(false);


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

    /// Category panel
    const [categoryFormData, setCategoryFormData] = useState<CategoryFormModel>(CategoryDefaultValue as CategoryFormModel);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [contegoryStatus, setContegoryStatus] = useState<CategoryStatus>({
        isLoading: false,
        isLoaded: true,
        isRejected: false,
        error: null
    });
    const categoryPanel = {
        handelOnSubmitForm: (data: any) => {
            console.log('handelOnSubmitForm', data);
            setIsSuccess(false);
            setCategoryFormData(data);
       
            userService.addCategory(data).then((res) => {
                console.log('res', res);
                setCategoryFormData(CategoryDefaultValue as CategoryFormModel);
                setCategoryFormData(() => CategoryDefaultValue as CategoryFormModel);

                setIsSuccess(true);
                console.log('userService.addCategory', categoryFormData);
            }, error => {   
                console.log('error', error);
            }).finally(() => {
                setIsSuccess(false);
                setCategoryFormData(() => CategoryDefaultValue as CategoryFormModel);
            });
        },
        handelOnChangeData: (data: any) => {
            setCategoryFormData((previewData) => ({ ...previewData, ...data }));
        },
        handelResetForm: () => {
            console.log('handelResetForm');
            setCategoryFormData(() => CategoryDefaultValue as CategoryFormModel);
            console.log('handelResetForm after');
        },
        onChangeImageData: () => {
            setCategoryFormData(CategoryDefaultValue as CategoryFormModel);
        },
    };


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
                        <AddCategoryForm 
                            categoryFormData={categoryFormData}
                            onSubmitForm={categoryPanel.handelOnSubmitForm}
                            onChangeData={categoryPanel.handelOnChangeData}
                            onResetForm={categoryPanel.handelResetForm}
                            onChangeImageData={categoryPanel.onChangeImageData}
                            imagePreview={imagePreview}
                            contegoryStatus={contegoryStatus}
                            isSuccess={isSuccess}
                        />
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
