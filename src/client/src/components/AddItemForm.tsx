import React from "react";
import "./AddItemForm.scss";

export interface ItemFormModel {
    itemName: string;
    itemDescription?: string;
    itemPrice: number;
    itemImage?: any;
    itemCategory: string;
    barcode?: string;
}

const AddItemForm: React.FC = () => {
    const [itemForm, setItemForm] = React.useState<ItemFormModel>({
        itemName: "",
        itemDescription: "",
        itemPrice: 0,
        itemImage: undefined,
        itemCategory: "",
        barcode: "",
    } as ItemFormModel);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(itemForm);
    };

    const onResetForm = () => {
        setItemForm({
            itemName: "",
            itemDescription: "",
            itemPrice: 0,
            itemImage: undefined,
            itemCategory: "",
        });
    };

    const onChangeData = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
    ) => {
    const { name, value } = e.target;
    setItemForm((currentItemForm) => {
        return { ...currentItemForm, [name]: value };
    });
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
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
                setItemForm((currentItemForm) => {
                    return { ...currentItemForm, itemImage: dataUrl };
                });
            }
        };
        };
        reader.readAsDataURL(file);
    }
    };

    return (
    <form onReset={onResetForm} onSubmit={onSubmitForm} className="add-item-form">
        <h3 className="add-item-form__title">Add item</h3>
        <fieldset>
            <label htmlFor="itemCategory">Item category</label>
            <select name="itemCategory" id="itemCategory" onChange={onChangeData} required>
                <option value="">-- Select category --</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
            </select>
        </fieldset>
        <fieldset>
            <label htmlFor="itemName">Item name</label>
            <input type="text" id="itemName" name="itemName" onChange={onChangeData} required/>
            </fieldset>
        <fieldset>
            <label htmlFor="itemDescription">Item description</label>
            <textarea
                name="itemDescription"
                id="itemDescription"
                rows={5}
                onChange={onChangeData}
            ></textarea>
            {/* <input type="text" id="categoryDescription" name="categoryDescription" required /> */}
        </fieldset>
        <fieldset>
            <label htmlFor="itemPrice">Item price</label>
            <input type="number" id="itemPrice" name="itemPrice" onChange={onChangeData} required/>
        </fieldset>
        <fieldset>
            <label htmlFor="itemImage">Item image</label>
            <input type="file" id="itemImage" name="itemImage" onChange={onImageChange}/>
            {itemForm.itemImage && (
            <img src={itemForm.itemImage} alt="Preview" className="preview" />
            )}
        </fieldset>
        <fieldset className="add-item-form__buttons">
            <button type="reset">Reset</button>
            <button type="submit">Save</button>
        </fieldset>
    </form>
    );
};

export default AddItemForm;
