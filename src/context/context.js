import React from "react";

const GlobalContext = React.createContext();//tạo global State nhà kho
export const GlobalProvider = GlobalContext.Provider;
export default GlobalContext;