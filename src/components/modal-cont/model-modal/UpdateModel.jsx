import { BiImage } from "react-icons/bi";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../../services/toastService";
import { closeModalAlert } from "../../../store/actionSlice/actionSlice";
import axiosInstance from "../../../api/axiosInstance";
import sending from "../../../assets/sending.json"
import { Player } from "@lottiefiles/react-lottie-player";
import { fetchModels } from "../../../store/modelSlice/modelSlice";

const UpdateModel = () => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null); // Rasmni oldindan ko‘rsatish uchun state
    const { brands } = useSelector(state => state.brands)
    const { models } = useSelector(state => state.models)
    const { selectItemId } = useSelector(state => state.actions)

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
        brand_id: Yup.string().required("Brand is required")
    });

    const selectModel = models.find(item => item.id === selectItemId)

    const selectImage = useCallback((id) => {
        const brand = brands?.find(item => item.id === id)

        if(brand) {
            setPreview(`https://realauto.limsa.uz/api/uploads/images/${brand?.image_src}`)
        }else {
            setPreview(null)
        }
    }, [])

    useEffect(() => {
        selectImage(selectModel?.brand_id)
    }, [])

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
                initialValues={{ name: selectModel.name, brand_id: selectModel.brand_id }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);

                        // FormData yaratish (Fayl yuklash uchun)
                        const formData = new FormData();
                        formData.append("name", values.name);
                        formData.append("brand_id", values.brand_id);

                        // API-ga yuborish
                        await axiosInstance.put(`/models/${selectItemId}`, formData)
                        setSubmitting(false);
                        resetForm();
                        dispatch(fetchModels());
                        setPreview(null); // Rasmni tozalash
                        dispatch(closeModalAlert())
                        succsessToast(`Model updated successfully`);
                    } catch (error) {
                        console.log(error);
                        setSubmitting(false);
                        errorToast("Model updated error");

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

                        {/* SELECT INPUT */}
                        <div className="flex flex-col">
                            <label className="text-[14px] font-semibold" htmlFor="brand_id">Brands</label>
                            <select
                                name="brand_id"
                                onChange={(e) => {
                                    handleChange(e)
                                    selectImage(e.target.value)
                                }}
                                onBlur={handleBlur}
                                value={values.brand_id}
                                type="text"
                                id="brand_id"
                                placeholder="Select the brand"
                                autoComplete="brand_id"
                            >
                                <option value="">---</option>
                                {brands?.map(item => (
                                    <option key={item.id} value={item.id}>{item.title}</option>
                                ))}
                            </select>
                            <div className="min-h-[10px] leading-[12px]">
                                {errors.brand_id && touched.brand_id && <span className="text-[12px] text-orange-600 font-medium">{errors.brand_id}</span>}
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

export default UpdateModel;
