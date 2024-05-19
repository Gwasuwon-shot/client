export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
export const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
export const STATE_STRING = "test";
export const NAVER_BASE_URL = import.meta.env.VITE_NAVER_BASE_URL;
export const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

export const NAVER_AUTH_URL = `${NAVER_BASE_URL}/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;
