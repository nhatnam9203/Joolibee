import stores from "./store.json";
const initStores = Object.values(stores)
const districts = initStores.map((item, index) => {
    return {
        label: item.region,
        value: index,
        key: item.city
    }
})

export default districts