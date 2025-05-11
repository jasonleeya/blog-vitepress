/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FILE_BASE_URL: string
  readonly VITE_COS_SECRET_ID: string
  readonly VITE_COS_SECRET_KEY: string
  readonly VITE_COS_BUCKET: string
  readonly VITE_COS_REGION: string
}
