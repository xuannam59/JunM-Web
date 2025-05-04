import { IUser } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: IUser
}

const DEFAULT_USER = {
    user_id: "",
    email: "",
    username: "",
    full_name: "",
    role: "",
    avatar: "",
    number_phone: "",
    google_id: "",
    listeningHistories: []
}

const initialState: IAuthState = {
    isLoading: false,
    isAuthenticated: false,
    user: DEFAULT_USER
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        doLogin: (state, action: PayloadAction<{ user: IAuthState["user"], access_token: string }>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            window.localStorage.setItem("access_token", action.payload.access_token);
        },
        doGetAccount: (state, action: PayloadAction<IAuthState["user"]>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogout: (state) => {
            state.isAuthenticated = false;
            state.user = DEFAULT_USER;
            window.localStorage.removeItem("access_token");
        }
    }
});

export const authReducer = authSlice.reducer
export const { doLogin, doGetAccount, doLogout } = authSlice.actions;