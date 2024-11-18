import { Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { routes } from "./routes/index";
import PrivateRoute from "./privateRoute";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import SocketContext from "./context/socketContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Socket from "./utils/socket";
import { ENV } from "./config/config";
import { getCartItems, getProductCategoriesImages } from "../src/redux/actions/product";

const App = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(undefined);
  useEffect(() => {
    if (!socket) {
      const connectedSocket = Socket.connectSocket();
      setSocket(connectedSocket);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [ENV.WEBSOCKET_URL]);

  useEffect(() => {
    ENV.getUserKeys("_id")?._id && dispatch(getCartItems());
    dispatch(getProductCategoriesImages());
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        {routes.map((route, i) => {
          return (
            <Route
              path={route.path}
              key={i}
              element={
                <PrivateRoute access={route.access}>
                  <route.layout>
                    <route.component />
                  </route.layout>
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </SocketContext.Provider>
  );
};
export default App;
