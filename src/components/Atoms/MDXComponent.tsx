import Image from 'next/image';
import Link from 'next/link';

import MdxImage from './image/mdxImage';
import UnderlineLink from './links/UnderlineLink';

export const components = {
  Image,
  MdxImage,
  Link,
  a: UnderlineLink,
};
