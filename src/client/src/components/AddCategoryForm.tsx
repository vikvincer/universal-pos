import React from "react";
import './AddCategoryForm.scss';

export interface CategoryFormModel {
    categoryName: string;
    categoryDescription?: string;
    categoryImage?: any;
}

const AddCategoryForm: React.FC = () => {

    const defaultValue = {
        categoryName: '',
        categoryDescription: '',
        categoryImage: undefined
    }

    const [categoryForm, setCategoryForm] = React.useState<CategoryFormModel>( defaultValue as CategoryFormModel);
    const [imagePreview, setImagePreview] = React.useState<string | ArrayBuffer | null>(null);
    const onResetForm = () => {
        setCategoryForm(defaultValue as CategoryFormModel);
    };

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({categoryForm});
    };

    const onChangeData = (event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategoryForm((currentCategoryForm) => {
            return {...currentCategoryForm, [name]: value};
        });
    };
    const onChangeImageData = (event:  React.ChangeEvent<HTMLInputElement>) => {
        // Set state for image
        const { name, value } = event.target;
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

    };
    return (
        <form onReset={onResetForm} onSubmit={onSubmitForm} className="add-category-form">
            <h3 className="add-category-form__title">Add category</h3>
            <fieldset>
                <label htmlFor="categoryName">Category name</label>
                <input onChange={onChangeData} type="text" id="categoryName" name="categoryName" required />
            </fieldset>
            <fieldset>
                <label htmlFor="categoryDescription">Category description</label>
                <textarea onChange={onChangeData} name="categoryDescription" id="categoryDescription" rows={5}></textarea>
                {/* <input type="text" id="categoryDescription" name="categoryDescription" required /> */}
            </fieldset>
            <fieldset>
                <label htmlFor="categoryImage">Category image</label>
                <input onChange={onChangeImageData} type="file" id="categoryImage" name="categoryImage"/>
                {categoryForm.categoryImage && <img src={categoryForm.categoryImage as string} alt="Category image preview" />}
            </fieldset>
            <fieldset className="add-category-form__buttons">
                <button type="reset">Reset</button>
                <button type="submit">Save</button>
            </fieldset>
        </form>
    );
};


export default AddCategoryForm;