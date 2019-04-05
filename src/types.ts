import { DocumentReference, Timestamp } from "@firebase/firestore-types";

export type IUser = {
  displayName: string;
  photoURL: string;
  uid: string;
};

export type IMessage = {
  text: string;
  createdAt: Timestamp;
  user: DocumentReference;
};

export type IChannel = {
  id: string;
  topic: string;
};
