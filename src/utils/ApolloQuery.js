import gql from "graphql-tag";

export const GET_NOTICES = gql`
query Notices($source:String!, $sort:String! ,$offset:Int!,$size:Int!){
 notices(source: $source, sort: $sort,offset: $offset, size: $size) {
   id
   title
   createdDatetime
   contentText
   contentHtml
   hit
   url
   likeCount
   like
   view
   attaches {
		id
   }
 }
}
`;
export const RETRIEVE_NOTICE = gql`
query Notice($id:UUID!){
  notice(id: $id) {
    id
    title
    contentText
    contentHtml 
    hit
    url
    likeCount
    like
    createdDatetime
    view
  }
}
`;
export const LIKE_NOTICE = gql`
mutation LikeNotice($id:UUID!){
  likeNotice(
    id : $id
  ){
    id
  }
}
`;

export const GET_NOTICE_SUBSCRIPTION = gql`
 query {
    suitedNoticeSources {
      name
      source
    }
}
`;

export const GET_ALL_NOTICE_SOURCE = gql`
 query {
  noticeSources {source name}
}
`;

export const PUT_SUITED_NOTICE = gql`
mutation SetSuitedNotice($sources:[String]!){
  setSuitedNotice(
    sources: $sources
  ){
      source
      name
  }
  }
`;
export const SEARCH_NOTICE = gql`
query Notices($offset: Int!, $size: Int!,$keyword:String!) {
  notices(source: "all", sort: "-created_datetime", offset: $offset, size: $size,search:$keyword) {
    id
    title
    contentText
  }
}
`;

export const GET_KEYWORDS = gql`
query{
  archivedKeywords {
    id
    word
  }
}
`;
export const CREATE_KEYWORD = gql`
mutation CreateKeyword($word:String!){
  createKeyword(
    word: $word
  ){
    id
    word
  }
}
`;

export const DELETE_KEYWORD = gql`
mutation DeleteKeyword($id:Int!){
  deleteKeyword(
    id: $id
  ) {
    id
  }
}

`;
export const GET_ACTIVITIES = gql`
query Activities($source:String!,$sort:String!,$offset:Int!,$size:Int!){
  activities(source:$source, sort:$sort, offset: $offset, size: $size)
  {
    id
    title
    contentHtml
    contentText
    thumbnailUrl
    like
    likeCount
    hit
    view
  }
}
`;
export const RETRIEVE_ACTIVITY = gql`
query Activity($id:UUID!){
  activity(id:$id){
    id
    title
    contentHtml
    contentText
    endDatetime
    posterUrl
    hit
    likeCount
    like
    view
  }
}
`;
export const LIKE_ACTIVITY = gql`
mutation LikeActivity($id:UUID!){
  likeActivity(
    id : $id
  ){
    id
  }
}
`;

export const SEARCH_ACTIVITY = gql`
query Activities($offset: Int!, $size: Int!,$keyword:String!) {
  activities(source: "all", sort: "-created_datetime", offset: $offset, size: $size,search:$keyword) {
    id
    title
    contentText
    thumbnailUrl
  }
}
`;

export const GET_QUESTIONS = gql`
query Questions($filter:String!,$offset:Int!,$size:Int!){
	  questions(filter: $filter, offset: $offset, size: $size) {
    id
    content
    answerNum
  } 
}
`;
export const CREATE_QUESTION = gql`
mutation CreateQuestion($input:String!){
  createQuestion(
    content:$input
  ) {
    id
    content
    answerNum
  } 
}`;

export const RETRIEVE_QUESTION = gql`
query Question($id:UUID!){
  question(id: $id) {
    answerList {
      id
      content
      createdDatetime
    }
  }
}
`;
export const CREATE_ANSWER = gql`
mutation CreateAnswer($id:UUID!,$content:String!){
  createAnswer(
    questionId: $id
    content: $content
  ) {
    id
    content
  }
}
`;

export const SIGN_IN = gql`
mutation SingIn($username:String!,$password:String!){
  tokenAuth(username: $username, password: $password) {
    token
  }
}
`;
export const REFRESH_FCM_TOKEN = gql`
mutation UpdateUser($fcmToken: String!) {
  updateFcmToken(fcmToken: $fcmToken) {
    user {
      id fcmToken
    }
  }
}
`;

export const SIGN_UP = gql`
mutation CreateUser($username:String!,$password:String!){
  createUser(username: $username, password: $password) {
    user {
      id
    }
  }
}
`;
export const GET_ARCHIVES = gql`
query ArchivedContents($action:String!,$size:Int!,$offset:Int!){
  archivedContents(action: $action,size: $size, offset: $offset){
    id
    type
    title
    contentText
  }
}
`;
export const GET_ARCHIVE_WIDGET = gql`
query ArchivedWidget($action:String!){
    archivedContents(action: $action, size: 5, offset: 0) {
    id
    type
    title
    contentText
  }
}
`;
export const GET_SUBJECTS = gql`query{
  subjects{
    id
    tutor
    lectureName
    alarm
  }
}`;

export const GET_SUBJECT_CONTENTS = gql`
query SubjectContents($id:UUID!){
  subjectContents(id:$id){
    id
    type
    title
    createdDatetime
    startDatetime
    endDatetime
  }
}
`;

export const RETRIEVE_SUBJECT_CONTENT = gql`
query SubjectContent($id:UUID!){
  subjectContent(id:$id){
    id
    type
    title
    content
    writer
    createdDatetime
    startDatetime
    endDatetime
    subjectcontentattachSet {
      name
      url
    }
  }
}
`;

export const GET_ALL_SUBJECT_CONTENT = gql`
query AllSubjectContents($size:Int,$offset:Int){
  allSubjectContents(size:$size,offset:$offset){
    title
    id
  }
}
`;


export const SET_USER_SUBJECT = gql`
mutation SetUserSubject($id:String!){
  setUserSubject(id:$id){
    subjectInfo {
      id
    	lectureName
    }
  }
}
`;


export const SET_ALARM_SUBJECT = gql`
mutation SetAlarmSubject($id:UUID!){
  setAlarmSubject(subjectId:$id){
    id
    tutor
    lectureName
    alarm
  }
}
`;


export const PAGINATION_LENGTH = 15;

