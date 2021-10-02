import { createContext } from "react";
import { pythonUrl } from "./constants";
import axios from "axios";

export const IngreContext = createContext();

const IngreContextProvider = ({ children }) => {
//   const getIngre = async () => {
//     try {
//       const res = await axios.get(`${pythonUrl}/predict`);
//       //   if (res.data.success) {
//       //     console.log(res.data);
//       //     return res.data;
//       //   }

//       console.log(res.data);
//     } catch (error) {
//       //return error.response.data;
//       console.log(error.message);
//     }
//   };
//   const ingreContextData = {
//     getIngre,
//   };
//   return (
//     <IngreContext.Provider value={ingreContextData}>
//       {children}
//     </IngreContext.Provider>
//   );
};

export default IngreContextProvider;
