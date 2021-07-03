import axios from "axios";
import cookies from 'vue-cookies'

const eventRequest = axios.create({
  baseURL: '/api/Event'
})
const memberRequest = axios.create({
  baseURL: '/api/Member'
})
const followMemberRequest = axios.create({
  baseURL: '/api/Member/Follow'
})
const messageRequest = axios.create({
  baseURL: '/api/Event/Message'
})
const participantRequest = axios.create({
  baseURL: '/api/Event/participant'
})
const favoriteRequest = axios.create({
  baseURL: '/api/Member/Favorite'
})
const commentRequest = axios.create({
  baseURL: '/api/Member/Comment'
})
const relationshipRequest = axios.create({
  baseURL: '/api/Event/Relationship'
})
const inviteRequest = axios.create({
  baseURL: '/api/Event/Invite'
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
export const apiMemberGetInviteEvent = () => memberRequest.get(`/${cookies.get("MemberId")}/InviteEvent`);
export function apiMemberPhotoPut( data ){
  return memberRequest.put(`/${cookies.get("MemberId")}/0`, data)
} 

//Follow Member
export const apiFollowMemberPost = data => followMemberRequest.post("", data);
export function apiFollowMemberDelete(memberId,objectId){
  return  followMemberRequest.delete(`/${memberId}/${objectId}`, {
    "memberId": memberId,
    "objectId": objectId
  })
}
export const apiFollowGet = () => memberRequest.get(`/Follow/MemberId=${cookies.get("MemberId")}`);


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

//participant
export const apiparticipantPost = data => participantRequest.post("", data);
export function apiparticipantPutConfirm(params){
  return participantRequest.put("/"+params.participantId,{
    "eventId": params.eventId,
    "participanter": params.participanter,
    "status": "1"
  })
}
export function apiparticipantPutComment(params){
  return participantRequest.put("/"+params.participantId,{
    "eventId": params.eventId,
    "participanter": params.memberId,
    "status": "2"
  })
}
export function apiEventGetparticipant(params){
  return participantRequest.get("/Event ="+params)
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
export const apiCommentPost = data => commentRequest.post("", data);
export function apiCommentGet(memberId) {
  return commentRequest.get(`/ObjectId=${memberId}`);
}

//Relationship
export function apiRelationshipPost(EventId){
  return relationshipRequest.post(`/${EventId}`, {
    "EventId": EventId
  });
}
export function apiRelationshipGet(MemberId){
  return relationshipRequest.get(`/MemberId =${MemberId}`)
}

//Invite
export const apiInvitePost = data => inviteRequest.post("", data)
export function apiInviteDelete(EventId){
  return inviteRequest.delete(`/${cookies.get("MemberId")}/${EventId}`)
}
