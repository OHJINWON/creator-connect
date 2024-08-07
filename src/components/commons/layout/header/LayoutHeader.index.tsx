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
  IQueryFetchUserArgs,
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
  
  useEffect(()=> {
    const initializeNaverLogin = async () => {
        try {
          await loadNaverScript();
          const { naver } = window as any;
          if (!naver) return;
  
          const naverLogin = new naver.LoginWithNaverId({
            clientId: `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
            callbackUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
            isPopup: false,
            state: Math.random().toString(36).substring(2),
            loginButton: { color: "green", type: 3, height: 60 },
          });
  
          naverLogin.init();
          window.naverLogin = naverLogin;
  
          if (window.location.hash.includes("access_token")) {
            handleNaverCallback();
          }
        } catch (error) {
          console.log("Failed to load Naver script:", error);
        }
      };
  
      initializeNaverLogin();
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail)
    }
  },[])
  
  const loadNaverScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById("naver-login-script")) {
        return resolve(); // Script is already loaded
      }

      const naverScript = document.createElement("script");
      naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
      naverScript.type = "text/javascript";
      naverScript.async = true;
      naverScript.id = "naver-login-script"; // Add an ID to check if the script is already loaded
      naverScript.onload = () => resolve();
      naverScript.onerror = () => reject(new Error("Failed to load Naver script"));
      document.body.appendChild(naverScript);
    });
  };

  const handleNaverCallback = async () => {
    try {
      const { naver } = window as any;
      if (!naver) return;

      window.naverLogin.getLoginStatus(async (status: any) => {
        if (status) {
          const user = window.naverLogin.user;
          setName(user.name);
          sessionStorage.setItem("name", user.name);
          sessionStorage.setItem("email", user.email);
          const { data } = await fetchUser({
            variables: {
              email: user.email
            }
          });

          console.log("data", data);

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

          router.push("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNaverLogin = async () => {
    if (document && document?.querySelector("#naverIdLogin")?.firstChild && window !== undefined) {
      const loginBtn: any = document.getElementById("naverIdLogin")?.firstChild;
      loginBtn.click();
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
