import req from './Axios'

//Event


export const apiEventPost = (data) => {
    return req("post", "/Event", data)
}
export const apiEventGet = (params) =>{
    return req("get", `/Event/${params}`)
}
// export const apiEventList = () =>{
//     return req("get", `/Event/date=${new Date().toISOString().slice(0, 19).replace(/T/i, " ")}`)
// }
export const apiEventList = () =>{
    return req("get", "/Event/date=2021-06-23")
}