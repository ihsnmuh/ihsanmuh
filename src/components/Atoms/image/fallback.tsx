import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type NextImageProps = {
  fallbackSrc?: string;
} & ImageProps;


  export default function ImageFallback({ src, fallbackSrc, alt, ...rest }: NextImageProps) {

    const [imgSrc, setImgSrc] = useState(src);
  
    // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
    const triplet = (e1:number, e2:number, e3:number) => keyStr.charAt(e1 >> 2)
  + keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4))
  + keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6))
  + keyStr.charAt(e3 & 63);
  
    const rgbDataURL = (r:number, g:number, b:number) => `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  
    useEffect(() => {
      setImgSrc(src); 
    }, [src]);
  
    return (
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            setImgSrc(fallbackSrc ? fallbackSrc : "/image/broken-image.svg" );
          }
        }}
        placeholder="blur"
        blurDataURL={rgbDataURL(242, 242, 242)}
        onError={() => {
          setImgSrc(fallbackSrc ? fallbackSrc : "/image/broken-image.svg" );
        }}
      />
    );
  
  }