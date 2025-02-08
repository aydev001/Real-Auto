import { BiImage } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../../services/toastService";
import { fetchCategories } from "../../../store/categorySlice/categorySlice";
import { closeModalAlert } from "../../../store/actionSlice/actionSlice";
import axiosInstance from "../../../api/axiosInstance";
import sending from "../../../assets/sending.json"
import { Player } from "@lottiefiles/react-lottie-player";

const UpdateCategory = () => {
    const dispatch = useDispatch();
    const { selectItemId } = useSelector(state => state.actions)
    const { categories } = useSelector(state => state.categories)

    const selectCategory = categories.find(item => item.id === selectItemId)

    const [preview, setPreview] = useState(`https://realauto.limsa.uz/api/uploads/images/${selectCategory?.image_src}`); // Rasmni oldindan ko‘rsatish uchun state
    const [imageName, setImageName] = useState(selectCategory?.image_src)

    const validationSchema = Yup.object({
        name_ru: Yup.string().required("Name-Ru is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        name_en: Yup.string().required("Name-En is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        images: Yup.mixed() // `mixed()` ishlatish kerak
    });

    return (
        <div>
            <div className="flex justify-center items-center">
                {preview ? (
                    <img src={preview} alt="Preview" className="h-[180px] min-w-[200px] p-[5px] object-contain border border-neutral-600 rounded-sm" />
                ) :
                    (
                        <div className="w-[250px] h-[180px] text-gray-500 text-[20px] flex justify-center items-center border border-neutral-600 rounded-sm">
                            <BiImage />
                        </div>
                    )}
            </div>
            <Formik
                initialValues={{ name_ru: selectCategory.name_ru, name_en: selectCategory.name_en, images: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);

                        // FormData yaratish (Fayl yuklash uchun)
                        const formData = new FormData();
                        formData.append("name_ru", values.name_ru);
                        formData.append("name_en", values.name_en);
                        if (values.images) {
                            formData.append("images", values.images);
                        }

                        // API-ga yuborish
                        await axiosInstance.put(`/categories/${selectItemId}`, formData)
                        setSubmitting(false);
                        resetForm();
                        dispatch(fetchCategories());
                        setPreview(null); // Rasmni tozalash
                        dispatch(closeModalAlert())
                        succsessToast(`Category updated successfully`);
                    } catch (error) {
                        console.log(error);
                        setSubmitting(false);
                        errorToast("Category updated error");
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className="form-data">
                        {/* IMAGE INPUT */}
                        <div className="flex flex-col">
                            <label htmlFor="images">
                                <div>Image</div>
                                <div className="upload-input">
                                    <div className="btn-upload">
                                        Upload image
                                    </div>
                                    <div className="text-[12px]">
                                        {imageName === "mb" ? <span className="text-orange-600">Maximum image size 1 MB</span> : <span>{imageName}</span>}
                                    </div>
                                </div>
                            </label>

                            <input
                                name="images"
                                type="file"
                                accept="image/png, image/jpeg"
                                id="images"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    const maxSizeMB = 1; // Maksimal fayl hajmi (MB)
                                    const maxSizeBytes = maxSizeMB * 1024 * 1024; // MB dan baytga o'tkazish

                                    // Fayl hajmini tekshirish
                                    if (file && file.size > maxSizeBytes) {
                                        setFieldValue("images", null); // Faylni tozalash
                                        setImageName("mb");
                                        setPreview(null);
                                        return; // Agar hajmi katta bo'lsa, davom etmang
                                    }

                                    setFieldValue("images", file);

                                    // Rasmni oldindan ko‘rsatish
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setPreview(reader.result);
                                            setImageName(file.name);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.images && touched.images && (
                                    <span className="text-[12px] text-orange-600 font-medium">{errors.images}</span>
                                )}
                            </div>
                        </div>


                        {/* NAME INPUT */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold" htmlFor="name-ru">Name-Ru</label>
                            <input
                                name="name_ru"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_ru}
                                type="text"
                                id="name-ru"
                                placeholder="Enter the name-ru"
                                autoComplete="name"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.name_ru && touched.name_ru && <span className="text-[12px] text-orange-600 font-medium">{errors.name_ru}</span>}
                            </div>
                        </div>

                        {/* NAME INPUT */}
                        <div className="flex flex-col">
                            <label htmlFor="name-en">Name-En</label>
                            <input
                                name="name_en"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_en}
                                type="text"
                                id="name-en"
                                placeholder="Enter the name-en"
                                autoComplete="name"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.name_en && touched.name_en && <span className="text-[12px] text-orange-600 font-medium">{errors.name_en}</span>}
                            </div>
                        </div>

                        <hr className="my-[5px]" />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"} btn-form`}
                            >
                                {isSubmitting ?
                                    <span className="inline-block max-h-[32px] max-w-[50px]">
                                        <Player
                                            src={sending}
                                            loop
                                            autoplay
                                        />
                                    </span> :
                                    <span>
                                        Save
                                    </span>}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateCategory;
