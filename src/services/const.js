import { TbDiamondFilled } from "react-icons/tb"; 
import { GiCube } from "react-icons/gi"; 
import { BsCarFrontFill } from "react-icons/bs"; 
import { MdLocationCity } from "react-icons/md"; 
import { MdAddLocationAlt } from "react-icons/md"; 
import { BsGridFill } from "react-icons/bs"; 



export const btnData = [
    { id: 1, title: "Categories", icon: BsGridFill , path: "/" },
    { id: 2, title: "Brands", icon:  TbDiamondFilled, path: "/brands" },
    { id: 3, title: "Models", icon:  GiCube, path: "/models" },
    { id: 4, title: "Cities", icon: MdLocationCity, path: "/cities" },
    { id: 5, title: "Locations", icon: MdAddLocationAlt, path: "/locations" },
    { id: 6, title: "Cars", icon: BsCarFrontFill, path: "/cars" },
]