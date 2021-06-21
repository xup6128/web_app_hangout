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
export const apiEventPost = data => eventRequest.post('', data);
export function apiEventGet(params){
  return  eventRequest.get('/'+params);
};
//apiEventPut
export const apiEventList = () => eventRequest.get('/date='+new Date().toISOString().slice(0,19).replace(/T/i, " "));

//Member

//Message
export const apiMessagePost = data => messageRequest.post('', data);
export function apiMessageGet(params){
  return  messageRequest.get('/'+params);
}
//apiMessagePut
export function apiMessagePut(message, member){
  messageRequest.put(message+'/'+member, data);
} 
export function apiMessageDel(params){
  return  messageRequest.delete('/'+params);
}
export function apiEventMessageGet(params){
  return  messageRequest.get('/EventId='+params);
}

//Comment
export const apiCommentPost = data => commentRequest.post('', data);
export function apiCommentGet(params){
  return  commentRequest.get('/'+params);
}
export function apiEventCommentGet(params){
  return  commentRequest.get('/EventId='+params);
}



