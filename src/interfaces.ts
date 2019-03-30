import { DocumentReference } from "@firebase/firestore-types";

export interface IUser  {
  displayName: string;
  photoURL: string;
  uid: string;
} 

export interface IMessage {
  text: string;
  createdAt: Date;
  user: DocumentReference;
}
export interface IDoc {
  text: string;
  id: string;
  createdAt: Date;
}

export interface IChannel {
  id: string;
}
