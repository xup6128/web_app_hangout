import axios from "axios";
import cookies from 'vue-cookies'

const webApi = 'http://35.229.140.28/api'


const eventRequest = axios.create({
  baseURL: `${webApi}/Event`
  // baseURL: '/api/Event'
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const memberRequest = axios.create({
  baseURL: `${webApi}/Member`
  // baseURL: `/api/Member`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})

const followMemberRequest = axios.create({
  baseURL: `${webApi}/Member/Follow`
  // baseURL: `/api//Member/Follow`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const messageRequest = axios.create({
  baseURL: `${webApi}/Event/Message`
  // baseURL: `/api//Event/Message`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const participantRequest = axios.create({
  baseURL: `${webApi}/Event/participant`
  // baseURL: `/api//Event/participant`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const favoriteRequest = axios.create({
  baseURL: `${webApi}/Member/Favorite`
  // baseURL: `/api//Member/Favorite`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const commentRequest = axios.create({
  baseURL: `${webApi}/Member/Comment`
  // baseURL: `/api//Member/Comment`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const relationshipRequest = axios.create({
  baseURL: `${webApi}/Event/Relationship`
  // baseURL: `/api//Event/Relationship`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const inviteRequest = axios.create({
  baseURL: `${webApi}/Event/Invite`
  // baseURL: `/api//Event/Invite`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})
const noticeRequest = axios.create({
  baseURL: `${webApi}/Notice`
  // baseURL: `/api/Notice`
  // headers: { 'Content-Type': 'application/json' },
  // timeout: 20000
})

//Event
export const apiEventPost = data => eventRequest.post('', data);
export function apiEventGet(params) {
  return eventRequest.get('/' + params);
};
export const apiEventList = () => eventRequest.get('/date=' + new Date().toISOString().slice(0, 19).replace(/T/i, " "));
// export const apiEventList = () => eventRequest.get('/date=2021-06-23');



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
export function apiMemberCoverPut(data) {
  return memberRequest.put(`/Cover/${cookies.get("MemberId")}`, data)
}
export function apiMemberPhotoPut(data) {
  return memberRequest.put(`/Photo/${cookies.get("MemberId")}`, data)
}
export const apiMemberForget = data => memberRequest.put(`/ForgetPassword`, data);

//Follow Member
export const apiFollowMemberPost = data => followMemberRequest.post("", data);
export function apiFollowMemberDelete(memberId, objectId) {
  return followMemberRequest.delete(`/${memberId}/${objectId}`, {
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
export function apiparticipantPutConfirm(params) {
  return participantRequest.put("/" + params.participantId, {
    "eventId": params.eventId,
    "participanter": params.participanter,
    "status": "1"
  })
}
export function apiparticipantPutComment(params) {
  return participantRequest.put("/" + params.participantId, {
    "eventId": params.eventId,
    "participanter": params.memberId,
    "status": "2"
  })
}
export function apiEventGetparticipant(params) {
  return participantRequest.get("/Event =" + params)
}

//Favorite
export const apiFavoritePost = data => favoriteRequest.post("", data);
// export const apiFavoriteDel = data => favoriteRequest.delete("", data);
export function apiFavoriteDel(memberId, eventId) {
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
export function apiRelationshipPost(EventId) {
  return relationshipRequest.post(`/${EventId}`, {
    "EventId": EventId
  });
}
export function apiRelationshipGet(MemberId) {
  return relationshipRequest.get(`/MemberId =${MemberId}`)
}

//Invite
export const apiInvitePost = data => inviteRequest.post("", data)
export function apiInviteDelete(EventId) {
  return inviteRequest.delete(`/${cookies.get("MemberId")}/${EventId}`)
}

//Notice
export const apiNoticeGet = () => {
  return noticeRequest.get(`/${cookies.get("MemberId")}`)
}
export function apiNoticePut(id){
  return noticeRequest.put(`/${id}`, {
    "status": "1"
  })
}