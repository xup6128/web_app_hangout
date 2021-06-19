import axios from "axios";

const eventRequest = axios.create({
  baseURL: 'http://35.229.140.28/api/Event'
})

const userRequest = axios.create({
  baseURL: 'http://35.229.140.28/api/Member'
})

const messageRequest = axios.create({
  baseURL: 'http://35.229.140.28/api/Message'
})

const commentRequest = axios.create({
  baseURL: 'http://35.229.140.28/api/Comment'
})

//Event
export const apiEventList = data => eventRequest.get('/date='+new Date().toISOString().slice(0,19).replace(/T/i, " "), data);


export const apiMessage = () => messageRequest.get('/2');


