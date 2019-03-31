import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

const useCollection = <T>(path: string, orderBy?: "createdAt"): T[] => {
  const [docs, setDocs] = useState<any | []>([]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      // @ts-ignore
      collection = collection.orderBy(orderBy);
    }

    return collection.onSnapshot(ss => {
      const docs: any[] = [];
      ss.forEach(doc => {
        docs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setDocs(docs);
    });
  }, [path, orderBy]);

  return docs;
};

export default useCollection;
