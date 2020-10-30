import { graphQlClient, mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'cart';

const initialState = {
    cart_id: null,
    cart_detail: null,
};

// First, create the thunk
// const createEmptyCart = createAsyncThunk(
//     `${KEY_CONSTANT}/createEmptyCart`,
//     async () => {
//         const client = useApolloClient();

//         const response = await client.mutate({
//             mutation: mutation.CREATE_EMPTY_CART,
//         });
//         return response;
//     },
// );

const updateCartProduct = createAsyncThunk(
    `${KEY_CONSTANT}/updateCartProduct`,
    async (input, client) => {

        const response = await client.mutate({
            mutation: mutation.UPDATE_CART_PRODUCT,
            variables: input,
        });
        return response;
    },
);

const cartSlice = createSlice({
    name: KEY_CONSTANT,
    initialState: initialState,
    reducers: {
        setCartId: (state, action) => {
            const { createEmptyCart } = action.payload;
            state.cart_id = createEmptyCart
        },
    },
    extraReducers: {

        // Update Cart Product
        [updateCartProduct.pending]: (state, action) => {
            Logger.info(action, 'updateCartProduct pending');
        },

        [updateCartProduct.fulfilled]: (state, action) => {
            Logger.info(action, 'updateCartProduct fulfilled');
        },

        [updateCartProduct.rejected]: (state, action) => {
            Logger.info(action, 'updateCartProduct rejected');
        },

        // [createEmptyCart.fulfilled]: (state, action) => {
        //     const { data } = action.payload;
        //     const { createEmptyCart } = data;
        //     if (createEmptyCart) state.cart_id = createEmptyCart;

        //     Logger.info(action, 'createEmptyCart fulfilled');
        // },

        // [createEmptyCart.rejected]: (state, action) => {
        //     Logger.info(action, 'createEmptyCart rejected');
        // },
        // [createEmptyCart.rejected]: (state, action) => {
        //     Logger.info(action, 'createEmptyCart rejected');
        // },

    },
});

const { actions, reducer } = cartSlice;
module.exports = {
    reducer,
    actions: { updateCartProduct, ...actions },
};
