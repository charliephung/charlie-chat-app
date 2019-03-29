import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

interface IDoc {
  text: string;
  id: string;
  createdAt: Date;
}
const useCollection = (
  path: string,
  orderBy?: undefined | "createdAt"
): IDoc[] => {
  const [docs, setDocs] = useState([] as IDoc[]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) collection.orderBy(orderBy);

    return collection.onSnapshot(ss => {
      const docs: IDoc[] = [];
      ss.forEach(doc => {
        const { text, createdAt } = doc.data();
        docs.push({
          text,
          createdAt,
          id: doc.id
        });
      });
      setDocs(docs);
    });
  }, []);

  return docs;
};

export default useCollection;
