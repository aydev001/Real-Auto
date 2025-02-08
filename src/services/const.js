import { TbDiamondFilled } from "react-icons/tb";
import { GiCube } from "react-icons/gi";
import { BsCarFrontFill } from "react-icons/bs";
import { MdLocationCity } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";



export const btnData = [
    { id: 1, title: "Categories", icon: BsGridFill, path: "/" },
    { id: 2, title: "Brands", icon: TbDiamondFilled, path: "/brands" },
    { id: 3, title: "Models", icon: GiCube, path: "/models" },
    { id: 4, title: "Cities", icon: MdLocationCity, path: "/cities" },
    { id: 5, title: "Locations", icon: MdAddLocationAlt, path: "/locations" },
    { id: 6, title: "Cars", icon: BsCarFrontFill, path: "/cars" },
]


export const inputData = [
    {
        id: 1, label_title: "Color", input_name: "color", input_type: "text", place_title: "Enter the color"
    },
    {
        id: 2, label_title: "Year", input_name: "year", input_type: "number", place_title: "Enter the year"
    },
    {
        id: 3, label_title: "Max speed (km/h)", input_name: "max_speed", input_type: "number", place_title: "Enter the speed"
    },
    {
        id: 4, label_title: "Max people", input_name: "max_people", input_type: "number", place_title: "Enter the number"
    },
    {
        id: 5, label_title: "Seconds (100km/h)", input_name: "seconds", input_type: "number", place_title: "Enter the second"
    },
    {
        id: 6, label_title: "Transmission", input_name: "transmission", input_type: "number", place_title: "Enter the number"
    },
    {
        id: 7, label_title: "Motor", input_name: "motor", input_type: "number", place_title: "Enter the motor"
    },
    {
        id: 8, label_title: "Drive side", input_name: "drive_side", input_type: "text", place_title: "Enter the left/right"
    },
    {
        id: 9, label_title: "Petrol", input_name: "petrol", input_type: "text", place_title: "Enter the petrol"
    },
    {
        id: 10, label_title: "Deposit", input_name: "deposit", input_type: "number", place_title: "Enter the deposit"
    },
    {
        id: 11, label_title: "Limit per-day", input_name: "limitperday", input_type: "number", place_title: "Enter the limit"
    },
    {
        id: 12, label_title: "Premium protection", input_name: "premium_protection", input_type: "number", place_title: "Enter the number"
    },
    {
        id: 13, label_title: "Price in AED", input_name: "price_in_aed", input_type: "number", place_title: "Enter the price"
    },
    {
        id: 14, label_title: "Price in USD", input_name: "price_in_usd", input_type: "number", place_title: "Enter the price"
    },
    {
        id: 15, label_title: "Price in AED sale", input_name: "price_in_aed_sale", input_type: "number", place_title: "Enter the price"
    },
    {
        id: 16, label_title: "Price in USD sale", input_name: "price_in_usd_sale", input_type: "number", place_title: "Enter the price"
    }
]

export const selectData = [
    {
        id : 1, label_title : "Category", select_name : "category_id", title : "categories"
    },
    {
        id : 2, label_title : "Brand", select_name : "brand_id", title : "brands"
    },
    {
        id : 3, label_title : "Model", select_name : "model_id", title : "models"
    },
    {
        id : 4, label_title : "City", select_name : "city_id", title : "cities"
    },
    {
        id : 5, label_title : "Location", select_name : "location_id", title : "locations"
    },
    {
        id : 6, label_title : "Inclusive", select_name : "inclusive", title : "checkbox"
    }
]