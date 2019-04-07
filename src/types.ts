import { DocumentReference, Timestamp } from "@firebase/firestore-types";

export type TUser = {
  displayName: string;
  photoURL: string;
  uid: string;
};

export type TMessage = {
  text: string;
  createdAt: Timestamp;
  user: DocumentReference;
};

export type TChannel = {
  id: string;
  topic: string;
};

export type TMember = {
  displayName: string;
  id: string;
};
