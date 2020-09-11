export const createResetState = (state, action, initialState) => {
    if (action.payload && action.payload.resetFunction) {
        return action.payload.resetFunction(state);
    } else {
        return initialState
    }
}
