import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalAlert: false,
    modalContent : "",
    selectCategoryId: null,
    favourite: JSON.parse(localStorage.getItem("favourite-clickShop")) || [],
    basket: JSON.parse(localStorage.getItem("basket-clickShop")) || [],
    isSidebar : false,
    selectItemId : null
}
const actionSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        openModalAlert: (state, action) => {
            state.modalContent = action.payload
            state.isModalAlert = true
        },
        closeModalAlert: (state) => {
            state.isModalAlert = false
            state.modalContent = ""
        },
        setSelectCategory: (state, action) => {
            state.selectCategoryId = action.payload
        },
        setSelectItemId: (state, action) => {
            state.selectItemId = action.payload
        },
        toggleSidebar: (state) => {
            state.isSidebar = !state.isSidebar
        },
        setFavourite: (state, action) => {
            if (state.favourite.find(item => item.id === action.payload.id)) {
                const favouriteItems = state.favourite.filter(item => item.id !== action.payload.id)
                state.favourite = favouriteItems
                localStorage.setItem("favourite-clickShop", JSON.stringify(favouriteItems))
            } else {
                const favouriteItems = [...state.favourite, action.payload]
                state.favourite = favouriteItems
                localStorage.setItem("favourite-clickShop", JSON.stringify(favouriteItems))
            }
        },
        setBasket: (state, action) => {
            if (state.basket.find(item => item.id === action.payload.id)) {
                const basketItems = state.basket.map(baskItem => {
                    if (baskItem.id === action.payload.id) {
                        return { ...baskItem, basketCount: baskItem.basketCount + 1 }
                    } else {
                        return baskItem
                    }
                })
                state.basket = basketItems
                localStorage.setItem("basket-clickShop", JSON.stringify(basketItems))
            } else {
                const { id, name, image, price } = action.payload
                const basketItems = [...state.basket, { id, name, image, price, basketCount: 1 }]
                state.basket = basketItems
                localStorage.setItem("basket-clickShop", JSON.stringify(basketItems))
            }
        },
        incrementItemBasket: (state, action) => {
            const basketItems = state.basket.map(baskItem => {
                if (baskItem.id === action.payload.id) {
                    return { ...baskItem, basketCount: baskItem.basketCount > 0 ? baskItem.basketCount - 1 : 0 }
                } else {
                    return baskItem
                }
            })
            state.basket = basketItems.filter(item => item.basketCount !== 0)
            localStorage.setItem("basket-clickShop", JSON.stringify(basketItems.filter(item => item.basketCount !== 0)))
        },
        removeItemBasket: (state, action) => {
            const basketItems = state.basket.filter(item => item.id !== action.payload.id)
            state.basket = basketItems
            localStorage.setItem("basket-clickShop", JSON.stringify(basketItems))
        },
        removeAllItemBasket: (state) => {
            state.basket = []
            localStorage.setItem("basket-clickShop", JSON.stringify([]))
        }
    },
})

export const { setSelectCategory, setFavourite, setBasket, incrementItemBasket, removeItemBasket, openModalAlert, closeModalAlert, removeAllItemBasket, toggleSidebar, setSelectItemId } = actionSlice.actions

export default actionSlice