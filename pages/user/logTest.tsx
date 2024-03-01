"use client";

import {AppDispatch, store, useAppSelector} from "@/redux/store";
import LogIn from "./log-in";

export default function Login() {

  const username = useAppSelector((state) => state.authReducer.value.username);
  const isModerator = useAppSelector((state) => state.authReducer.value.isModerator);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between" >
          <LogIn />
          <h1> Username: {username}</h1>
          {isModerator && <h1> This User is a Moderator</h1>}
      </main>
  )
}
