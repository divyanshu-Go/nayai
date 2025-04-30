// context/AppProvider.js
"use client";

import { UserProvider } from "./UserContext";
import { ArticleProvider } from "./ArticleContext";
import { LawyerProvider } from "./LawyerContext";

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <ArticleProvider>
        <LawyerProvider>{children}</LawyerProvider>
      </ArticleProvider>
    </UserProvider>
  );
};

export default AppProvider;
