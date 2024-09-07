import Image from 'next/image';
import Link from 'next/link';

import UnderlineLink from './links/UnderlineLink';

export const components = {
  Image,
  Link,
  a: UnderlineLink,
};
