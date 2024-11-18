import { ref, child, get, set, push } from "firebase/database";
import { database } from "./firebase";
import { useState,useEffect } from "react";
export const getCollection = () => {
  const dbRef = ref(database);
  get(child(dbRef, `drb-actions`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val(), "data==>");
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

//////
export const useGetCollectionData = () => {
    const [collectionData, setCollectionData] = useState(null);
  
    useEffect(() => {
      const dbRef = ref(database);
      get(child(dbRef, 'drb-actions'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data, 'data==>');
            const dataArray = Object.values(data);
            setCollectionData(dataArray);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    return collectionData;
  };
  
export const insertRecord = async ({
  id,
  address,
  type,
  status,
  galleryId
}) => {
  try {
    const newChildRef = push(ref(database));
    const randomId = newChildRef.key;
    await set(ref(database, `drb-actions/${randomId}`), {
      address,
      type,
      status,
      galleryId
    });
    return true
  } catch (err) {
    return false;
  }
};
