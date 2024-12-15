import { configureStore } from '@reduxjs/toolkit';
import { projectApi } from './api/projectService';
import { categoryApi } from './api/categoryService';
import { messagesApi } from './api/messagesApi';
import { testimonialsApi } from "./api/testimonialsApi";
import { skillsApi } from './api/skillsApi';


const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [testimonialsApi.reducerPath]: testimonialsApi.reducer,
        [skillsApi.reducerPath]: skillsApi.reducer,

    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            projectApi.middleware,
            categoryApi.middleware,
            messagesApi.middleware,
            testimonialsApi.middleware,
            skillsApi.middleware,
        )
});

// Define the RootState and AppDispatch types setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;