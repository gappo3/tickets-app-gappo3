"use client";

import axios from "axios";
import { useMemo } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export default function usePublicAxios() {
    const instance = useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: baseUrl || undefined,
            headers: {
                "Content-Type": "application/json",
            },
        });

        axiosInstance.interceptors.response.use(
            (res) => res,
            (err) => {
                console.error("Can't connect to API", err);
                return Promise.reject(err);
            }
        );

        return axiosInstance;
    }, []);

    return instance;
}