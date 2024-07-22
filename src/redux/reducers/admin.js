import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAdmin: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
       AdminTrue: (state) => {
            state.isAdmin = true;
        },
        AdminFalse: (state) => {
            state.isAdmin = false;
        },
    },

});

export default adminSlice;
export const { AdminTrue, AdminFalse} = adminSlice.actions;