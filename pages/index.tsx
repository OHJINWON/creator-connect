import { useRouter } from "next/router";
import { useEffect } from "react";
import BoardWritePage from "./board/write";
import BoardListPage from "./board/list";

export default function Home() {


  return <>
    
    <BoardListPage/>
  </>;
}