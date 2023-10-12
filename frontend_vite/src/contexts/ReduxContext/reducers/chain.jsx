import { createSlice } from '@reduxjs/toolkit';
import { convertToString, convertToInteger } from './tools';

const initialState = {
    chainId: 0,
    explorerUrl: '',
    rpcUrl: ''
};

const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        updateChainId: (state, action) => {
            state.chainId = convertToInteger(action.payload);
        },

        updateExplorerUrl: (state, action) => {
            state.explorerUrl = convertToString(action.payload);
        },

        updateRpcUrl: (state, action) => {
            state.rpcUrl = convertToSTring(action.payload);
        }
    }
});

export const { updateChainId, updateExplorerUrl, updateRpcUrl } = chainSlice.actions;

export default chainSlice.reducer;
