// context/AppProvider.js
"use client";

import { UserProvider } from "./UserContext";
import { ArticleProvider } from "./ArticleContext";
import { LawyerProvider } from "./LawyerContext";
import { SchemeProvider } from "./SchemeContext";

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <SchemeProvider>
      <ArticleProvider>
        <LawyerProvider>{children}</LawyerProvider>
      </ArticleProvider>
      </SchemeProvider>
    </UserProvider>
  );
};

export default AppProvider;
