import { useState, useEffect } from "react";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeader.styles";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMyUser,
  IQuery,
} from "../../../../commons/types/generated/types";
import { CREATE_USER, FETCH_USER } from "./Header.queries";

declare global {
  interface Window {
    naver: any;
  }
}

export default function LayoutHeader() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  const [createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER);
  const [fetchUser] = useLazyQuery<Pick<IQuery, "fetchUser">, IMyUser>(FETCH_USER);

  useEffect(() => {
    const loadNaverScript = () => {
      return new Promise<void>((resolve, reject) => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        naverScript.async = true;
        naverScript.onload = () => resolve();
        naverScript.onerror = () => reject(new Error("Failed to load Naver script"));
        document.body.appendChild(naverScript);
      });
    };

    const checkLoginStatus = () => {
      const { naver } = window;
      if (!naver) return;

      const naverLogin = new naver.LoginWithNaverId({
        clientId: `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
        isPopup: false,
        loginButton: { color: "green", type: 3, height: 60 },
      });

      naverLogin.init();
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const user = naverLogin.user;
          setName(user.name);

          // URL 정리
          // if (window.location.hash.includes('access_token')) {
          //   window.history.replaceState({}, document.title, window.location.pathname);
          // }
        }
      });
    };

    loadNaverScript().then(checkLoginStatus).catch(console.error);
  }, []);

  const handleNaverLogin = async () => {
    try {
      const { naver } = window;
      if (!naver) return;

      const state = Math.random().toString(36).substring(2);
      document.cookie = `naverState=${state}; path=/; max-age=3600`;

      const naverLogin = new naver.LoginWithNaverId({
        clientId: `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
        isPopup: false,
        state,
        loginButton: { color: "green", type: 3, height: 60 },
      });

      naverLogin.init();
      naverLogin.authorize();

      naverLogin.getLoginStatus(async (status: any) => {
        if (status) {
          const user = naverLogin.user;
          setName(user.name);

          console.log("User logged in:", user);

          // 사용자 존재 여부 확인
          const { data } = await fetchUser({
            variables: {
              email: user.email,
            },
          });

          console.log("Fetched user data:", data);

          // 사용자 존재하지 않으면 생성
          if (!data?.fetchUser) {
            await createUser({
              variables: {
                createUserInput: {
                  name: user.name,
                  email: user.email,
                  age: user.age,
                  birthday: user.birthday,
                  birthyear: user.birthyear,
                  gender: user.gender,
                  id: user.id,
                  mobile: user.mobile,
                  profile_image: user.profile_image,
                  createdAt: new Date().toISOString(),
                },
              },
            });
            console.log("User created in DB");
          }

          // 백엔드로 사용자 정보 전송
          // const response = await fetch("/api/auth/naver/callback", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(user),
          // });

          // if (!response.ok) {
          //   throw new Error("Failed to send user data to the backend");
          // }

          // console.log("User data sent to backend");

          // router.push("/");
        }
      });
    } catch (err) {
      console.error("Error during Naver login process:", err);
    }
  };

  const handleLogout = () => {
    window.location.href = "https://nid.naver.com/nidlogin.logout";
    localStorage.removeItem("name");
    setName(null);
    router.push("/");
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo>💎 LIVE</InnerLogo>
        <div>
          {name ? (
            <>
              <InnerButton>{name}</InnerButton>
              <InnerButton onClick={handleLogout}>로그아웃</InnerButton>
            </>
          ) : (
            <>
              <div id="naverIdLogin" style={{ position: "absolute", top: "-100000px" }} />
              <InnerButton onClick={handleNaverLogin}>로그인</InnerButton>
            </>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
