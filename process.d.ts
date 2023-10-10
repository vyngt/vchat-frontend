declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_URL_INTERNAL: string;
    NEXTAUTH_SECRET: string;
    BACKEND_URL: string;
    ACCESS_TOKEN_DURATION: string;
  }
}
