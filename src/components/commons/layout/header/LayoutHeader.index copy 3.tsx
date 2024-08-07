import { useEffect, useState } from "react";
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
    naverLogin: any;
  }
}

export default function LayoutHeader() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const [createUser] = useMutation<Pick<IMutation, "createUser">, IMutationCreateUserArgs>(CREATE_USER);
  const [fetchUser] = useLazyQuery<Pick<IQuery, "fetchUser">, IMyUser>(FETCH_USER);

  useEffect(() => {
    const loadNaverScript = () => {
      return new Promise<void>((resolve, reject) => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        naverScript.async = true;
        naverScript.onload = () => {
          const { naver } = window as any;
          if (!naver) return reject(new Error("Naver SDK load failed"));
          resolve();
        };
        naverScript.onerror = () => reject(new Error("Failed to load Naver script"));
        document.body.appendChild(naverScript);
      });
    };

    loadNaverScript().then(() => {
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
      window.naverLogin = naverLogin; // naverLogin 객체를 전역으로 저장
    }).catch((error) => console.log(error));

    // if (window.location.hash.includes('access_token')) {
    //   window.history.replaceState({}, document.title, window.location.pathname);
    // }
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail)
    }
    console.log("name", storedName)
  }, []);

  const handleNaverLogin = async () => {
    if (document && document?.querySelector("#naverIdLogin")?.firstChild && window !== undefined) {
      const loginBtn: any = document.getElementById("naverIdLogin")?.firstChild
      loginBtn.click();
    }
    try {
      const { naver } = window as any;
      if (!naver) return;

      window.naverLogin.getLoginStatus(async (status: any) => {
        if (status) {
          const user = window.naverLogin.user;
          setName(user.name);
          sessionStorage.setItem("name", user.name)
          sessionStorage.setItem("email", user.email)
          console.log("user",user)

          // 사용자 존재 여부 확인
          const { data } = await fetchUser({
            variables: {
              email: user.email
            }
          });

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
                  createdAt: new Date().toISOString()
                },
              },
            });
          }

          router.push("/"); // 로그인 완료 후 원래 페이지로 리다이렉트
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    window.location.href = "https://nid.naver.com/nidlogin.logout";
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
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
