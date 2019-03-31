import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

const useCollection = <T>(path: string): T => {
  const [doc, setDoc] = useState<any | null>();

  useEffect(() => {
    return db.doc(path).onSnapshot(ss => {
      setDoc({
        ...ss.data(),
        id: ss.id
      });
    });
  }, [path]);

  return doc;
};

export default useCollection;
