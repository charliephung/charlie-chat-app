import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { DocumentData } from "@firebase/firestore-types";

const cache: any = {};
const pendingCache: any = {};

const useCollection = <T>(path: string): T => {
  const [doc, setDoc] = useState<any | null>();

  useEffect(() => {
    if (doc) return;

    let stillMounted = true;

    const pending: Promise<DocumentData> | undefined = pendingCache[path];
    const promise: Promise<DocumentData> =
      pending || (pendingCache[path] = db.doc(path).get());

    promise.then(data => {
      if (stillMounted) {
        const user = {
          ...data.data(),
          id: data.id
        };
        setDoc(user);
        cache[path] = user;
      }
    });
    return () => {
      stillMounted = false;
    };
  }, [path]);

  return doc;
};

export default useCollection;
