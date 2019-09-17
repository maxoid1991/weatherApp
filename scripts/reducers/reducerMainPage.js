const info = {
    'city' : []
};


const MainPageReducer = (data = info, action) => {

    switch (action.type) {
        case "addCity" : 
            return {
                ...data,
                city : [...data.city, action.newcity]
            }
    } 

    return data;
}

export { MainPageReducer };