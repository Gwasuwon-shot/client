// import axios from "axios";
// import { NAVER_BASE_URL, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, STATE_STRING } from "../../core/Login/naverPath";

// export const getNaverAuthToken = async () => {
//   console.log(":on");
//   const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
//   console.log(AUTHORIZE_CODE);
//   const GRANT_TYPE = "authorization_code";
//   const POST_URL = `grant_type=${GRANT_TYPE}&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${AUTHORIZE_CODE}&state=${STATE_STRING}`;

//   if (AUTHORIZE_CODE) {
//     const response = await axios.post(`${NAVER_BASE_URL}/token?${POST_URL}`, {
//       headers: { "X-Naver-Client-Id": NAVER_CLIENT_ID, "X-Naver-Client-Secret": NAVER_CLIENT_SECRET },
//     });
//     console.log(response);
//     return response.data;
//   }
// };
