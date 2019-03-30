import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

const useCollection = (
  path: string,
  orderBy?: undefined | "createdAt"
): any[] => {
  const [docs, setDocs] = useState([] as any[]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) collection.orderBy(orderBy);

    return collection.onSnapshot(ss => {
      const docs: any[] = [];
      ss.forEach(doc => {
        const data = doc.data();
        docs.push(data);
      });
      setDocs(docs);
    });
  }, []);

  return docs;
};

export default useCollection;
