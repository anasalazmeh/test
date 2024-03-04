
import axios from "axios";

import { useEffect, useState } from "react";
interface dataResult {
  countGame: number;
}
const Result =  () => {
  const [data,setdata]=useState<number>(0)
  const fatchResult = async()=>{
    let result =await axios.get<dataResult>(`${window.location.origin}/api`);
    setdata(result.data.countGame)
  }
  fatchResult()
  return <div className="flex justify-end items-end"> النتيجة :{data}</div>;
};
export default Result;
