import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_BASE_URL ,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "User", 
        "Products", 
        "Customers", 
        "Transactions", 
        "Geography", 
        "Sales",
        "Balances",
        "Admins",
        "Performance",
        "Dashboard",
        "User Details",
    ],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
        getBalances: build.query({
            query: () => "tdData/balances",
            providesTags: ["Balances"]
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        }), 
        getDetails: build.query({
            query: () => "user/profile", // may need to adjust based on backend
            providesTags: ["User Details"]
        }), 
    })
})

export const { 
    useGetUserQuery, 
    useGetProductsQuery, 
    useGetCustomersQuery, 
    useGetTransactionsQuery, 
    useGetGeographyQuery, 
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useGetDetailsQuery,
    useGetBalancesQuery,
} = api;