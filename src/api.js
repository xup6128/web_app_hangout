import axios from "axios";

const eventRequest = axios.create({
  baseURL: '/api/Event'
})
const memberRequest = axios.create({
  baseURL: '/api/Member'
})
const messageRequest = axios.create({
  baseURL: '/api/Message'
})
const commentRequest = axios.create({
  baseURL: '/api/Comment'
})

//Event
export const apiEventPost = data => eventRequest.post('', data);
export function apiEventGet(params) {
  return eventRequest.get('/' + params);
};
// export const apiEventList = () => eventRequest.get('/date=' + new Date().toISOString().slice(0, 19).replace(/T/i, " "));
export const apiEventList = () => eventRequest.get('/date=2021-06-23');


//Member
export const apiMemberLogin = data => memberRequest.post('/LogIn', data);
export const apiMemberCheck = data => memberRequest.post('/Check', data);
export const apiMemberSignUp = data => memberRequest.post('/SignUp', data);
export function apiMemberGet(params) {
  return memberRequest.get('/' + params);
}
export function apiMemberEventGet(params) {
  return memberRequest.get('/' + params + '/Event');
}

//Message
export const apiMessagePost = data => messageRequest.post('', data);
export function apiMessageGet(params) {
  return messageRequest.get('/' + params);
}
//apiMessagePut
export function apiMessagePut(message, member) {
  messageRequest.put(message + '/' + member, data);
}
export function apiMessageDel(params) {
  return messageRequest.delete('/' + params);
}
export function apiEventMessageGet(params) {
  return messageRequest.get('/EventId=' + params);
}

//Comment
export const apiCommentPost = data => commentRequest.post('', data);
export function apiCommentGet(params) {
  return commentRequest.get('/' + params);
}
export function apiEventCommentGet(params) {
  return commentRequest.get('/EventId=' + params);
}



