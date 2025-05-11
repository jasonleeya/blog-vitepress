import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: import.meta.env.VITE_COS_SECRET_ID,
  SecretKey: import.meta.env.VITE_COS_SECRET_KEY,
});

export const getObject = (path: string): Promise<COS.GetObjectResult> => {
  return cos.getObject({
    Bucket: import.meta.env.VITE_COS_BUCKET,
    Region: import.meta.env.VITE_COS_REGION,
    Key: path
  })
}

export default cos
