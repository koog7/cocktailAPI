import axios, { AxiosHeaders } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

export const addInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config) => {
        const token = store.getState().User.user?.token;

        const headers = config.headers as AxiosHeaders;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    });
};

export default axiosApi;