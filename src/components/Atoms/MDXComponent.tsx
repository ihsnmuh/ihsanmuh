import Image from 'next/image';
import Link from 'next/link';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import MdxImage from './Image/mdxImage';
import UnderlineLink from './Links/UnderlineLink';

export const components = {
  Image,
  MdxImage,
  LiteYouTubeEmbed,
  Link,
  a: UnderlineLink,
};
