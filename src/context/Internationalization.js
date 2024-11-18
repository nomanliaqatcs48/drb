import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import messages_en from "../assets/data/locales/en.json";
import messages_ar from "../assets/data/locales/ar.json";
import { getUser } from "../redux/actions/user";

const menu_messages = {
  en: messages_en,
  sa: messages_ar,
};

const Context = React.createContext();

function IntlProviderWrapper({children}) {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user);
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState("en");
  

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (userInfo?.lang) {
      setLocale(userInfo?.lang);
      setMessages(menu_messages[userInfo?.lang]);
    }
  }, [userInfo]);

  return (
    <Context.Provider
      value={{
        state: { locale, messages },
        switchLanguage: (language) => {
          setLocale(language);
          setMessages(menu_messages[language]);
        },
      }}
    >
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages || ''}
        defaultLocale={
          userInfo?.lang === "en" ? "en" : "sa"
        }
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
}

export { IntlProviderWrapper, Context as IntlContext };
