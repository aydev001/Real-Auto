import { BiImage } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../services/toastService";
import axiosInstance from "../../api/axiosInstance";
import { closeModalAlert } from "../../store/actionSlice/actionSlice";
import { fetchProducts } from "../../store/productSlice/productSlice";

const AdminCreateProduct = ({ baseData }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(baseData ? baseData.image : null); // Rasmni oldindan ko‘rsatish uchun state
  const [imageName, setImageName] = useState(baseData ? baseData.name + ".jpg" : "Image not uploaded")

  const { categories } = useSelector(state => state.categories)

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Minimum 3 characters").max(30, "Maximum 30 characters"),
    description: Yup.string().required("Description is required").min(3, "Minimum 3 characters").max(700, "Maximum 700 characters"),
    price: Yup.number().required("Price is required").max(10000000, "Max price 10 000 000"),
    rate: Yup.number().required("Rating is required").max(5, "Max rate 5"),
    categoryId: Yup.string().required("Category is required"),
    image: baseData ? Yup.mixed() : Yup.mixed().required("Image is required") // `mixed()` ishlatish kerak
  });

  const initialValues = baseData ?
    {
      name: baseData.name,
      description: baseData.description,
      price: baseData.price,
      rate: baseData.rate,
      categoryId: baseData.categoryId,
      image: baseData.image
    }
    :
    {
      name: "",
      description: "",
      price: "",
      rate: "",
      categoryId: "",
      image: ""
    }

  return (
    <div className={`${baseData ? "p-0" : "p-[7px]"}`}>
      <div className="flex justify-center items-center">
        {preview ? (
          <img src={preview} alt="Preview" className="h-[180px] p-[5px] object-contain border rounded-sm" />
        ) :
          (
            <div className="w-[250px] h-[180px] text-gray-500 text-[20px] flex justify-center items-center border rounded-sm">
              <BiImage />
            </div>
          )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);

            // FormData yaratish (Fayl yuklash uchun)
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("rate", values.rate);
            formData.append("categoryId", values.categoryId);
            formData.append("image", values.image);

            // API-ga yuborish
            {
              baseData ?
                await axiosInstance.put(`/products/edit/${baseData.id}`, formData)
                :
                await axiosInstance.post(`/products/add`, formData)
            };
            setSubmitting(false);
            resetForm();
            dispatch(fetchProducts());
            setPreview(null); // Rasmni tozalash
            setImageName("")
            dispatch(closeModalAlert())
            succsessToast(`Product ${baseData ? "updated" : "created"} successfully`);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-[5px] text-gray-800">
            {/* IMAGE INPUT */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold group" htmlFor="image">
                <div>Image</div>
                <div className="border-[2px] text-[14px] flex justify-start items-center gap-1 font-medium duration-100 hover:border-indigo-100 group-focus:border-indigo-500 rounded-sm overflow-hidden">
                  <div className="px-[15px] min-w-max py-[3px] bg-indigo-100 duration-75 text-[14px] font-medium flex justify-center items-center cursor-pointer hover:bg-indigo-300 active:scale-95">
                    Upload image
                  </div>
                  <div className="text-[12px]">
                    {imageName==="mb"? <span className="text-red-500">Maximum image size 1 MB</span> : <span>{imageName}</span> }
                  </div>
                </div>
              </label>

              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                className="outline-none border-[2px] text-[14px] font-medium duration-100 hidden placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[3px] py-[3px]"
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
                {errors.image && touched.image && (
                  <span className="text-[12px] text-red-500 font-medium">{errors.image}</span>
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
                className="outline-none border-[2px] text-[14px] font-medium duration-100 placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[7px] py-[3px]"
                type="text"
                id="name"
                placeholder="Enter the name"
                autoComplete="name"
              />
              <div className="min-h-[10px] leading-[12px]">
                {errors.name && touched.name && <span className="text-[12px] text-red-500 font-medium">{errors.name}</span>}
              </div>
            </div>

            {/* DESCRIPTION INPUT */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold" htmlFor="description">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="outline-none w-full text-[14px] resize-none font-medium border-[2px] duration-100 placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[7px] py-[3px]"
                rows={5}
                id="description"
                placeholder="Enter the description"
                autoComplete="current-description"
              />
              <div className="min-h-[10px] leading-[12px]">
                {errors.description && touched.description && <span className="text-[12px] text-red-500 font-medium">{errors.description}</span>}
              </div>
            </div>

            {/* PRICE INPUT */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold" htmlFor="price">Price</label>
              <input
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="outline-none border-[2px] text-[14px] font-medium duration-100 placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[7px] py-[3px]"
                type="number"
                id="price"
                placeholder="Enter the price"
                autoComplete="price"
              />
              <div className="min-h-[10px] leading-[12px]">
                {errors.price && touched.price && <span className="text-[12px] text-red-500 font-medium">{errors.price}</span>}
              </div>
            </div>

            {/* RATE INPUT */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold" htmlFor="rate">Rating</label>
              <input
                name="rate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rate}
                className="outline-none border-[2px] text-[14px] font-medium duration-100 placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[7px] py-[3px]"
                type="number"
                id="rate"
                placeholder="Enter the rating"
                autoComplete="rate"
              />
              <div className="min-h-[10px] leading-[12px]">
                {errors.rate && touched.rate && <span className="text-[12px] text-red-500 font-medium">{errors.rate}</span>}
              </div>
            </div>

            {/* CATEGORY INPUT */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold" htmlFor="categoryId">Categories</label>
              <select
                name="categoryId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categoryId}
                className="outline-none border-[2px] text-[14px] font-medium duration-100 placeholder:text-[14px] hover:border-indigo-100 focus:border-indigo-500 rounded-sm px-[7px] py-[3px]"
                type="text"
                id="categoryId"
                placeholder="Enter the categoryId"
                autoComplete="categoryId"
              >
                <option value="">---</option>
                {categories.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <div className="min-h-[10px] leading-[12px]">
                {errors.categoryId && touched.categoryId && <span className="text-[12px] text-red-500 font-medium">{errors.categoryId}</span>}
              </div>
            </div>

            <hr />
            {baseData ?
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"} flex justify-center text-[14px] items-center gap-1 bg-blue-600 hover:bg-blue-700 active:scale-95 duration-150 text-white font-medium px-[15px] py-[4px] rounded-sm`}
                >
                  <span>{isSubmitting ? "Save..." : "Save"}</span>
                </button>
              </div>
              : <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${isSubmitting ? "cursor-wait" : "cursor-pointer"} flex justify-center text-[14px] items-center gap-1 bg-blue-600 hover:bg-blue-700 active:scale-95 duration-150 text-white font-medium px-[15px] py-[4px] rounded-sm`}
                >
                  <span>{isSubmitting ? "Creating..." : "+ Create"}</span>
                </button>
              </div>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminCreateProduct;
