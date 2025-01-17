import React,  { useEffect } from "react";
import './AddCategoryForm.scss';


export interface CategoryFormModel {
    name?: string;
    description?: string;
    image?: any;
}

export interface CategoryStatus {
    isLoading: boolean;
    isLoaded: boolean;
    isRejected: boolean;
    error: any;
}

export interface AddCategoryFormModel {
    categoryFormData: CategoryFormModel;
    onSubmitForm: (categoryName: CategoryFormModel, fromBtn?: boolean) => void;
    onChangeData: (data: any) => void;
    onChangeImageData: (event:  React.ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
    isSuccess?: boolean;
    imagePreview: string | ArrayBuffer | null;
    contegoryStatus: CategoryStatus;
}

export const defaultValue = {
    name: '',
    description: '',
    image: ''
}

const AddCategoryForm: React.FC<AddCategoryFormModel> = ({categoryFormData, onSubmitForm, onChangeData, onChangeImageData, onResetForm, isSuccess, imagePreview, contegoryStatus}) => {

    const [categoryForm, setCategoryForm] = React.useState<CategoryFormModel>( defaultValue as CategoryFormModel);
    useEffect(() => {
        if (isSuccess) {
            console.log('isSuccess', isSuccess);
            console.log('resetForm', resetForm);

            setCategoryForm(defaultValue as CategoryFormModel);
            onResetForm();
            console.log('categoryForm', categoryForm);
            console.log('categoryFormData', categoryFormData);

        }
    }, [isSuccess, onResetForm]);
    
    // const [imagePreview, setImagePreview] = React.useState<string | ArrayBuffer | null>(null);
    // const onResetForm = () => {
    //     setCategoryForm(defaultValue as CategoryFormModel);
    // };

    // const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log({categoryForm});
    // };

    // const onChangeData = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = event.target;
    //     setCategoryForm((currentCategoryForm) => {
    //         return {...currentCategoryForm, [name]: value};
    //     });
    // };
    const handleChangeImageData = (event:  React.ChangeEvent<HTMLInputElement>) => {

        // Set state for image
        const { name, value } = event.target;
        console.log({name, value});
        setCategoryForm((currentCategoryForm) => {
            return {...currentCategoryForm, [name]: value};
        });
        console.log(event.target);
        // Set state for image preview

        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string; 
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 200;
                    const MAX_HEIGHT = 200;
                    let width = img.width;
                    let height = img.height;
                    console.log(img.naturalWidth, img.naturalHeight);
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                          height *= MAX_WIDTH / width;
                          width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                          width *= MAX_HEIGHT / height;
                          height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        const dataUrl = canvas.toDataURL("image/jpeg");
                        setCategoryForm((currentCategoryForm) => {
                            return {...currentCategoryForm, [name]: dataUrl};
                        });
                    }
                      
                };
            }
            reader.readAsDataURL(file);
        }
        onChangeData(categoryFormData);
    };


    
 
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitForm(categoryForm);
    };

    const resetForm = () => {   
        onResetForm();
    };

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const categoryFormData: CategoryFormModel = { ...categoryForm, [name]: value };

        setCategoryForm(categoryFormData);
        onChangeData(categoryFormData);
    };

    const handleChangeI = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const categoryFormData: CategoryFormModel = { ...categoryForm, [name]: value };
        console.log('handleChangeI');
        setCategoryForm(categoryFormData);
        onChangeData(categoryFormData);
    };


    
    return (
        <form onReset={resetForm} onSubmit={submitForm} className="add-category-form">
            <h3 className="add-category-form__title">Add category</h3>
            <fieldset>
                <label htmlFor="name">Category name</label>
                <input onChange={handleChange} type="text" id="name" name="name" value={categoryFormData.name} required />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Category description</label>
                <textarea onChange={handleChange} name="description" id="description"  value={categoryFormData.description} rows={5}></textarea>
                {/* <input type="text" id="categoryDescription" name="categoryDescription" required /> */}
            </fieldset>
            <fieldset>
                <label htmlFor="image">Category image</label>
                <input onChange={handleChangeImageData} type="file" id="image" name="image" />
                {categoryForm.image && <img src={categoryForm.image as string} alt="Category image preview" />}
            </fieldset>
            <fieldset className="add-category-form__buttons">
                <button type="reset">Reset</button>
                <button type="submit">Save</button>
            </fieldset>
        </form>
    );
};


export default AddCategoryForm;