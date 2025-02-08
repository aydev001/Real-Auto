import { BiImage } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../../services/toastService";
import { closeModalAlert } from "../../../store/actionSlice/actionSlice";
import axiosInstance from "../../../api/axiosInstance";
import sending from "../../../assets/sending.json"
import { Player } from "@lottiefiles/react-lottie-player";
import { fetchLocations } from "../../../store/locationSlice/locationSlice";

const UpdateLocation = () => {
    const { selectItemId } = useSelector(state => state.actions)
    const { locations } = useSelector(state => state.locations)
    const selectCity = locations.find(item => item.id === selectItemId)

    const dispatch = useDispatch();
    const [preview, setPreview] = useState(`https://realauto.limsa.uz/api/uploads/images/${selectCity?.image_src}`); // Rasmni oldindan ko‘rsatish uchun state
    const [imageName, setImageName] = useState(selectCity?.image_src)





    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        text: Yup.string().required("Text is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
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
                initialValues={{ name: selectCity.name, text: selectCity.text, images: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);

                        // FormData yaratish (Fayl yuklash uchun)
                        const formData = new FormData();
                        formData.append("name", values.name);
                        formData.append("text", values.text);
                        if (values.images) {
                            formData.append("images", values.images);
                        }

                        // API-ga yuborish
                        await axiosInstance.put(`/locations/${selectItemId}`, formData)
                        setSubmitting(false);
                        resetForm();
                        dispatch(fetchLocations());
                        setPreview(null); // Rasmni tozalash
                        dispatch(closeModalAlert())
                        succsessToast(`Location updated successfully`);
                    } catch (error) {
                        console.log(error);
                        setSubmitting(false);
                        errorToast("Location updated error");

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
                            <label className="text-[14px] font-semibold" htmlFor="name">Name</label>
                            <input
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                type="text"
                                id="name"
                                placeholder="Enter the name"
                                autoComplete="name"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.name && touched.name && <span className="text-[12px] text-orange-600 font-medium">{errors.name}</span>}
                            </div>
                        </div>

                        {/* TEXT INPUT */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold" htmlFor="text">Text</label>
                            <input
                                name="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.text}
                                type="text"
                                id="text"
                                placeholder="Enter the text"
                                autoComplete="text"
                            />
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.text && touched.text && <span className="text-[12px] text-orange-600 font-medium">{errors.text}</span>}
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

export default UpdateLocation;
