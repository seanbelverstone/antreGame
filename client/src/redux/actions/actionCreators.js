export const resetStore = () => {
    return {
        type: 'RESET_STORE'
    }
}

export const updateCharacter = (options) => {
    const {
        inventory,
        stats,
        levels,
        time
    } = options;
    return {
        type: "UPDATE_CHARACTER",
        inventory,
        stats,
        levels,
        time
    }
}