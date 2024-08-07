import { useState } from "react";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
} from "./LayoutHeader.styles";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMyUser,
  IQuery,
} from "../../../../commons/types/generated/types";
import { CREATE_USER, FETCH_USER } from "./Header.queries";
import { getDate } from "../../../../commons/libraries/utils";

export default function LayoutHeader() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);


  const [createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER);
  const [fetchUser] = useLazyQuery<Pick<IQuery, "fetchUser">, IMyUser>(FETCH_USER)

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

  const handleNaverLogin = async () => {
    if (document && document?.querySelector("#naverIdLogin")?.firstChild && window !== undefined) {
      const loginBtn: any = document.getElementById("naverIdLogin")?.firstChild
      loginBtn.click();
    }
    try {
      await loadNaverScript();
      const { naver } = window as any;
      if (!naver) return;

      const state = Math.random().toString(36).substring(2);
      document.cookie = `naverState=${state}; path=/; max-age=3600`;

      const naverLogin = new naver.LoginWithNaverId({
        clientId: `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
        isPopup: false,
        state,
        loginButton: { color: "green", type: 2, height: 20 },
      });

      naverLogin.init();
      naverLogin.getLoginStatus(async (status: any) => {
        if (status) {
          const user = naverLogin.user;
          setName(user.name);

          // 사용자 존재 여부 확인

          const {data} = await fetchUser({
            variables: {
              email: user.email
            }
          })

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
                  createdAt: new Date().toISOString
                },
              },
            });
          }
          // 백엔드로 사용자 정보 전송
          await fetch("/api/auth/naver/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          router.push("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    window.location.href = "https://nid.naver.com/nidlogin.logout";
    localStorage.removeItem("name");
    setName(null);
    router.push("http://localhost:3000/");
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
               <div id="naverIdLogin" style={{position: "absolute", top: "-100000px"}}/> {/* 네이버 로그인 버튼을 이 div에 렌더링 */}
              <InnerButton onClick={handleNaverLogin}>로그인</InnerButton>
            </>
          )}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
