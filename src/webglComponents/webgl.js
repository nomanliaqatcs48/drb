import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useCallback, useState } from "react";
import { useGetCollectionData } from "../utils/firebase/firebaseFuncs";
import { ref, child, get, set, push } from "firebase/database";
import { database } from "../utils/firebase/firebase";
import ReactHtmlParser from "react-html-parser";
// import htmlFile from "../../public/DRB-Build/index.html";
import axios from "axios";
const UnityComponent = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "/DRB-Build/Build/DRB.loader.js",
      dataUrl: "/DRB-Build/Build/DRB.data",
      frameworkUrl: "/DRB-Build/Build/DRB.framework.js",
      codeUrl: "/DRB-Build/Build/DRB.wasm",
      streamingAssetsUrl: "DRB-Build/StreamingAssets",
    });
  // console.log(unityProvider, "unityProvider=>");

  const updatedCollection = useGetCollectionData();
  console.log(updatedCollection, "updatedCollection=>");
  const handleDrbActions = (name, callback, onError) => {
    console.log("event received===>", name, callback);
    sendMessage(name, callback, JSON.stringify(updatedCollection));
  };

  const listenForDrbCollectionChange = (name, callback, onError) => {
    const dbRef = ref(database);
    get(child(dbRef, "drb-actions"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data, "data==>");
          const dataArray = Object.values(data);
          sendMessage(name, callback, JSON.stringify(dataArray));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(()=>{

  // },[updatedCollection])

  useEffect(() => {
    addEventListener("GetDrbActions", handleDrbActions);
    return () => {
      removeEventListener("GetDrbActions", handleDrbActions);
    };
  }, [updatedCollection]);

  useEffect(() => {
    addEventListener(
      "ListionForValueChangeDrbActions",
      listenForDrbCollectionChange
    );
    return () => {
      removeEventListener(
        "ListionForValueChangeDrbActions",
        listenForDrbCollectionChange
      );
    };
  }, [updatedCollection]);
  useEffect(() => {
    const fetchHTMLContent = async () => {
      try {
        const response = await axios.get("/DRB-Build/index.html");
        setHtmlContent(response.data);
        console.log(response, "respoinse=>");
      } catch (error) {
        console.error("Error loading HTML file:", error);
      }
    };
    fetchHTMLContent();
  }, []);

  return (
    // <Unity
    //   unityProvider={unityProvider}
    //   style={{ width: "100%", height: "100vh" }}
    // />

    !htmlContent ? "Loading" : <>{ReactHtmlParser(htmlContent)}</>
  );
};
export default UnityComponent;
