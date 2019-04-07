import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

type operator = "<" | "<=" | "==" | ">" | ">=";

const useCollection = <T>(
  path: string,
  orderBy?: string,
  where?: [string, operator, any]
): T[] => {
  const [docs, setDocs] = useState<any | []>([]);
  let diffProps = [path];

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      // @ts-ignore
      collection = collection.orderBy(orderBy);
      diffProps = diffProps.concat(orderBy);
    }
    if (where) {
      // @ts-ignore
      collection = collection.where(...where);
      diffProps = diffProps.concat(...where);
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
  }, diffProps);

  return docs;
};

export default useCollection;
