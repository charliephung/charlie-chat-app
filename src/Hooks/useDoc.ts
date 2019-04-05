import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { DocumentSnapshot } from "@firebase/firestore-types";

const useCollection = <T>(path: string): T => {
  const [doc, setDoc] = useState<any | null>();

  useEffect(() => {
    return db.doc(path).onSnapshot((ss: DocumentSnapshot) => {
      setDoc({
        ...ss.data(),
        id: ss.id
      });
    });
  }, [path]);

  return doc;
};

export default useCollection;
