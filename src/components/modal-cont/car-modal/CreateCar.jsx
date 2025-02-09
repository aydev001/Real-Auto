import { BiPlusCircle } from "react-icons/bi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { errorToast, succsessToast } from "../../../services/toastService";
import { closeModalAlert } from "../../../store/actionSlice/actionSlice";
import axiosInstance from "../../../api/axiosInstance";
import sending from "../../../assets/sending.json"
import { Player } from "@lottiefiles/react-lottie-player";
import { inputData, selectData } from "../../../services/const";
import { fetchCars } from "../../../store/carSlice/carSlice";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from "framer-motion";

const CreateCar = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [preview, setPreview] = useState([]); // Rasmni oldindan ko‘rsatish uchun state
  const [fileValidate, setFileVaildate] = useState("")
  const [imageFiles, setImageFiles] = useState([])

  const { categories } = useSelector(state => state.categories)
  const { brands } = useSelector(state => state.brands)
  const { models } = useSelector(state => state.models)
  const { cities } = useSelector(state => state.cities)
  const { locations } = useSelector(state => state.locations)


  const yupSchema = useCallback(() => {
    const schemaData = {}
    inputData.forEach(item => {
      item.input_type === "text" ?
        schemaData[item.input_name] = Yup.string().required(`${item.label_title} is required`).max(30, "Maximum 30 characters")
        :
        schemaData[item.input_name] = Yup.number().required(`${item.label_title} is required`).max(10000000, "Maximum 10 000 000")
    })
    selectData.forEach(item => {
      schemaData[item.select_name] = Yup.string().required(`${item.label_title} is required`).min(3, "Minimum 3 characters").max(100, "Maximum 100 characters")
    })
    schemaData["images"] = Yup.number().required("Images is required").min(2, "Minimum 3 pictures")
    return schemaData
  }, [])

  const allInitialValues = useCallback(() => {
    const initialData = {}
    inputData.forEach(item => {
      initialData[item.input_name] = ""
    })
    selectData.forEach(item => {
      initialData[item.select_name] = ""
    })
    initialData["images"] = ""
    return initialData
  }, [])

  const goToSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0); // Birinchi slaytga o'tish
    }
  };


  const validationSchema = Yup.object(yupSchema());

  return (
    <div>
      <Formik
        initialValues={allInitialValues()}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);

            // FormData yaratish (Fayl yuklash uchun)
            const formData = new FormData();
            inputData.forEach(item => {
              formData.append(item.input_name, values[item.input_name])
            })
            selectData.forEach(item => {
              formData.append(item.select_name, values[item.select_name])
            })
            const [ cover, ...images ] = imageFiles
            formData.append("cover", cover)
            console.log(images)
            images.forEach(item => {
              formData.append("images", item)
            })
            // API-ga yuborish
            await axiosInstance.post(`/cars`, formData)
            setSubmitting(false);
            resetForm();
            dispatch(fetchCars());
            setPreview(null); // Rasmni tozalash
            dispatch(closeModalAlert())
            succsessToast(`Car created successfully`);
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            errorToast("Car created error");

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {
                inputData.map(item => (
                  <div key={item.id} className="flex flex-col" >
                    <label className="text-[14px] font-semibold" htmlFor={item.input_name}>{item.label_title}</label>
                    <input
                      name={item.input_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[item.input_name]}
                      type={item.input_type}
                      id={item.input_name}
                      placeholder={item.place_title}
                      autoComplete={item.input_name}
                    />
                    <div className="min-h-[10px] leading-[12px]">
                      {errors[item.input_name] && touched[item.input_name] && <span className="text-[12px] text-orange-600 font-medium">{errors[item.input_name]}</span>}
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="flex justify-between gap-2 flex-col-reverse md:flex-row">
              <div className="flex flex-col w-full md:w-[25%]">
                <p className="text-[14px] font-medium">Images</p>
                <div className="border-[2px] relative min-h-[110px] max-h-[110px] bg-zinc-800 border-neutral-600 overflow-hidden hover:border-neutral-500 h-full rounded-md">
                  {preview.length > 0 ? (
                    <>
                      <Swiper
                        ref={swiperRef}
                        modules={[Navigation]}
                        spaceBetween={1}
                        slidesPerView={1}
                        navigation={{
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev"
                        }}
                      >

                        {
                          preview.map((item, index) => (
                            <SwiperSlide key={index} className="min-h-[110px] max-h-[110px]">
                              <img src={item} alt="preview-image" className="min-h-[110px] max-h-[110px] w-full object-cover" />
                            </SwiperSlide>
                          ))
                        }
                      </Swiper>
                      <button type="button" className="swiper-button-next hover:bg-opacity-40 absolute top-0 bottom-0 w-[20px] text-[20px] flex justify-center items-center right-0 bg-black z-10 bg-opacity-20">
                        <MdKeyboardArrowRight />
                      </button>
                      <button type="button" className="swiper-button-prev hover:bg-opacity-40 absolute top-0 bottom-0 w-[20px] text-[20px] flex justify-center items-center left-0 bg-black z-10 bg-opacity-20">
                        <MdKeyboardArrowLeft />
                      </button>
                    </>
                  ) :
                    (
                      <div className="min-h-[110px] max-h-[110px] text-[20px] flex justify-center items-center">

                      </div>
                    )}
                  <label htmlFor="images" className="absolute top-[50%] left-[50%] text-gray-200 active:scale-95 translate-x-[-50%] translate-y-[-50%] w-[40px] h-[40px] rounded-full hover:bg-opacity-40 cursor-pointer text-[20px] flex justify-center items-center bg-black z-10 bg-opacity-20">
                    <BiPlusCircle />
                  </label>
                  {fileValidate &&
                    <motion.div
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute top-[5%] left-[5%] right-[5%] text-[11px] font-semibold text-white active:scale-95 translate-x-[50%]  min-w-max rounded-full flex justify-center items-center bg-black z-10 bg-opacity-50">
                      {fileValidate}
                    </motion.div>}
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
                        setFileVaildate("Maximum image size 1MB")
                        return; // Agar hajmi katta bo'lsa, davom etmang
                      }



                      // Rasmni oldindan ko‘rsatish
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setPreview(prev => [reader.result, ...prev]);
                          setImageFiles(prev => [...prev, file])
                          setFileVaildate("")
                          goToSlide()
                        };
                        reader.readAsDataURL(file);
                      }

                      setFieldValue("images", imageFiles.length)
                    }}
                  />
                </div>
                <div className="min-h-[10px] leading-[12px]">
                  {errors["images"] && <span className="text-[12px] text-orange-600 font-medium">{errors["images"]}</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-[75%]">
                {
                  selectData.map(item => (
                    <div key={item.id} className="flex flex-col" >
                      <label className="text-[14px] font-semibold" htmlFor={item.select_name}>{item.label_title}</label>
                      <select
                        name={item.select_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[item.select_name]}
                        type="text"
                        id={item.select_name}
                        autoComplete={item.select_name}
                      >
                        <option>---</option>
                        {item.title === "categories" &&
                          categories.map(item => (
                            <option key={item.id} value={item.id}>{item.name_ru}</option>
                          ))}
                        {item.title === "brands" &&
                          brands.map(item => (
                            <option key={item.id} value={item.id}>{item.title}</option>
                          ))}
                        {item.title === "models" &&
                          models.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        {item.title === "cities" &&
                          cities.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        {item.title === "locations" &&
                          locations.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        {item.title === "checkbox" &&
                          <>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                          </>
                        }
                      </select>
                      <div className="min-h-[10px] leading-[12px]">
                        {errors[item.select_name] && touched[item.select_name] && <span className="text-[12px] text-orange-600 font-medium">{errors[item.select_name]}</span>}
                      </div>
                    </div>
                  ))
                }
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
                    Create
                  </span>}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div >
  );
};

export default CreateCar;
