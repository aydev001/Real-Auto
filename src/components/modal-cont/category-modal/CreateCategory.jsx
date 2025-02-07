import { BiImage } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../../services/toastService";
import { fetchCategories } from "../../../store/categorySlice/categorySlice";
import { closeModalAlert } from "../../../store/actionSlice/actionSlice";
import axiosInstance from "../../../api/axiosInstance";

const CreateCategory = () => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null); // Rasmni oldindan ko‘rsatish uchun state
    const [imageName, setImageName] = useState("Image not uploaded")
    const validationSchema = Yup.object({
        name_ru: Yup.string().required("Name-Ru is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        name_en: Yup.string().required("Name-En is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        images: Yup.mixed().required("Image is required") // `mixed()` ishlatish kerak
    });

    return (
        <div>
            <div className="flex justify-center items-center">
                {preview ? (
                    <img src={preview} alt="Preview" className="h-[180px] p-[5px] object-contain border border-neutral-600 rounded-sm" />
                ) :
                    (
                        <div className="w-[250px] h-[180px] text-gray-500 text-[20px] flex justify-center items-center border border-neutral-600 rounded-sm">
                            <BiImage />
                        </div>
                    )}
            </div>
            <Formik
                initialValues={{ name_ru: "", name_en: "", images: null }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);

                        // FormData yaratish (Fayl yuklash uchun)
                        const formData = new FormData();
                        formData.append("name_ru", values.name_ru);
                        formData.append("name_en", values.name_en);
                        formData.append("images", values.images);

                        // API-ga yuborish
                        await axiosInstance.post(`/categories/add`, formData)
                        setSubmitting(false);
                        resetForm();
                        dispatch(fetchCategories());
                        setPreview(null); // Rasmni tozalash
                        dispatch(closeModalAlert())
                        succsessToast(`Category created successfully`);
                    } catch (error) {
                        console.log(error);
                        setSubmitting(false);
                        errorToast(error.response?.data.message);
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
                            <label htmlFor="image">
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
                                id="image"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    const maxSizeMB = 1; // Maksimal fayl hajmi (MB)
                                    const maxSizeBytes = maxSizeMB * 1024 * 1024; // MB dan baytga o'tkazish

                                    // Fayl hajmini tekshirish
                                    if (file && file.size > maxSizeBytes) {
                                        setFieldValue("image", null); // Faylni tozalash
                                        setImageName("mb");
                                        setPreview(null);
                                        return; // Agar hajmi katta bo'lsa, davom etmang
                                    }

                                    setFieldValue("image", file);

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
                            <label className="text-[14px] font-semibold" htmlFor="name">Name-Ru</label>
                            <input
                                name="name_ru"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_ru}
                                type="text"
                                id="name"
                                placeholder="Enter the name-ru"
                                autoComplete="name"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.name_ru && touched.name_ru && <span className="text-[12px] text-orange-600 font-medium">{errors.name_ru}</span>}
                            </div>
                        </div>

                        {/* NAME INPUT */}
                        <div className="flex flex-col">
                            <label htmlFor="name">Name-En</label>
                            <input
                                name="name_en"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name_en}
                                type="text"
                                id="name"
                                placeholder="Enter the name-en"
                                autoComplete="name"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.name_en && touched.name_en && <span className="text-[12px] text-orange-600 font-medium">{errors.name_en}</span>}
                            </div>
                        </div>

                        <hr className="my-[5px]"/>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"} btn-form`}
                            >
                                <span>{isSubmitting ? "Creating..." : "Create"}</span>
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreateCategory;
