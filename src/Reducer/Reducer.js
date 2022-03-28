let localStorageList = JSON.parse(localStorage.getItem('list'))
if (!localStorageList) {
    localStorageList = [
        { FirstName: 'Brano', LastName: 'Asaya', ID: '1234567' },
    ]
}

export const initialTable = {
    list: localStorageList,
    isOpen: false,
    index: 0,
    alert: ''
}


export function Reducer(state, action) {
    switch (action.type) {
        case "delete":
            return { ...state, list: action.data, alert: "successfully deleted" };

        case "update":
            return { ...state, list: action.data, isOpen: false, alert: "successfully updated" };

        case "open":
            return { ...state, index: action.data, isOpen: true };

        case "close":
            return { ...state, isOpen: false };
        case "alert":
            return { ...state, alert: action.data };
        case "add":
            return { ...state, list: action.data, alert: "successfully added" };
        default:
            throw new Error();
    }
}

