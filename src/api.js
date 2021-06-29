import axios from "axios";
import cookies from 'vue-cookies'

const eventRequest = axios.create({
  baseURL: '/api/Event'
})
const memberRequest = axios.create({
  baseURL: '/api/Member'
})
const messageRequest = axios.create({
  baseURL: '/api/Event/Message'
})
const partitionRequest = axios.create({
  baseURL: '/api/Event/Partition'
})
const favoriteRequest = axios.create({
  baseURL: '/api/Member/Favorite'
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
export const apiMemberPut = data => memberRequest.put(`/${cookies.get('MemberId')}`, data);
export function apiMemberEventGet(params) {
  return memberRequest.get('/' + params + '/Event');
}
export function apiMemberGet(params) {
  return memberRequest.get('/' + params);
};
export const apiMemberGetHostEvent = () => memberRequest.get(`/${cookies.get("MemberId")}/HostEvent`);
export const apiMemberGetJoinEvent = () => memberRequest.get(`/${cookies.get("MemberId")}/JoinEvent`);


//Message
export const apiMessagePost = data => messageRequest.post('', data);
export function apiMessageGet(params) {
  return messageRequest.get('/' + params);
}
//apiMessagePut
export function apiMessagePut(message, data) {
  return messageRequest.put(`${message}/${cookies.get("MemberId")}`, data);
}
export function apiMessageDel(message) {
  return messageRequest.delete(`${message}/${cookies.get("MemberId")}`);
}
export function apiEventMessageGet(params) {
  return messageRequest.get('/EventId=' + params);
}

//Partition
export const apiPartitionPost = data => partitionRequest.post("", data);
export function apiPartitionPutConfirm(params){
  return partitionRequest.put("/"+params.participantId,{
    "eventId": params.eventId,
    "participanter": params.participanter,
    "status": "1"
  })
}
export function apiEventGetPartition(params){
  return partitionRequest.get("/Event ="+params)
}

//Favorite
export const apiFavoritePost = data => favoriteRequest.post("", data);
// export const apiFavoriteDel = data => favoriteRequest.delete("", data);
export function apiFavoriteDel(memberId,eventId){
  return favoriteRequest.delete(`/${memberId}/${eventId}`, {
    "memberId": memberId,
    "eventId": eventId
  });
}
export const apiFavoriteEventGet = () => favoriteRequest.get(`/MemberId=${cookies.get("MemberId")}`);

//Comment
export const apiCommentPost = data => commentRequest.post('', data);
export function apiCommentGet(params) {
  return commentRequest.get('/' + params);
}
export function apiEventCommentGet(params) {
  return commentRequest.get('/EventId=' + params);
}


