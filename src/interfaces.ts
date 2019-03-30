import { DocumentReference } from "@firebase/firestore-types";

export interface IUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface IMessage {
  text: string;
  createdAt: Date;
  user: DocumentReference;
}

export interface IChannel {
  id: string;
}
