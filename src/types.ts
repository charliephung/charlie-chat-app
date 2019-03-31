import { DocumentReference } from "@firebase/firestore-types";

export type IUser = {
  displayName: string;
  photoURL: string;
  uid: string;
};

export type IMessage = {
  text: string;
  createdAt: Date;
  user: DocumentReference;
};

export type IChannel = {
  id: string;
};
