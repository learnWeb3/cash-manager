import { createReducer } from '@reduxjs/toolkit';
import { fetchAnalytics } from '../actions/AdminAction';

interface AdminState {
    ticketAnalytics: {
        productsByCategories: {
            "_id": string,
            "count": number,
            "category": {
                "_id": string,
                "label": string,
                "createdAt": string,
                "updatedAt": string,
                "__v": number
            }
        }[]
        periodTotalRevenue: {
            sum: number
        }[],
        daylyPeriodRevenue: {
            _id: string,
            sum: number
        }[],
        productsRankedBySalesVolume: {
            "unit": string,
            "category": string,
            "label": string,
            "deleted": boolean,
            "createdAt": string,
            "updatedAt": string,
            "__v": number,
            "sum": number
        }[],
        productsRankedBySalesValue: {
            "unit": string,
            "category": string,
            "label": string,
            "deleted": boolean,
            "createdAt": string,
            "updatedAt": string,
            "__v": number,
            "sum": number
        }[],
        productsRankedByGrossProfitContribution: {
            "_id": string,
            "unit": string,
            "category": string,
            "label": string,
            "deleted": boolean,
            "createdAt": string,
            "updatedAt": string,
            "__v": number,
            "averageSalePrice": number,
            "total": number,
            "pnl": number,
            "quantity": number,
            "unitCost": number,
            "inventories": {
                "toTake": number,
                "_id": string,
                "product": string,
                "inventory": string,
                "quantity": number,
                "price": number,
                "createdAt": string,
                "updatedAt": string,
                "__v": number,
                "unitCost": number
            }[]
        }[]
    }
}

const initialState: AdminState = {
    ticketAnalytics: {
        productsByCategories: [],
        periodTotalRevenue: [{
            sum: 0
        }],
        daylyPeriodRevenue: [],
        productsRankedBySalesVolume: [],
        productsRankedBySalesValue: [],
        productsRankedByGrossProfitContribution: []
    }
};

const AnalyticsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(fetchAnalytics, (state, action) => {
            state.ticketAnalytics = action.payload
        })
);

export default AnalyticsReducer;