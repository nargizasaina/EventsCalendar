export const saveToLocalStorage = state => {
    try{
        const serializedSate = JSON.stringify(state);
        localStorage.setItem('state', serializedSate);
    } catch (e) {
        console.error(e);
    }
};

export const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) return undefined;

        return JSON.parse(serializedState);
    } catch (e){
        console.error(e);
        return undefined;
    }
};