import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const initialState = {
    id: 0
}
const TabAdmin = createSlice({
    name: "TabAdmin",
    initialState,
    reducers: {
        ChangeTab(state, action){
            state.id = action.payload;
        },
    }
})
export const { ChangeTab } = TabAdmin.actions;

export default TabAdmin.reducer;