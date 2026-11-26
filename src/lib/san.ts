/**
 * San: illustrated portrait mascot of Muhammad Ihsan.
 *
 * Built on the 1240x1240 vector anatomy of `avatar-base.svg` with
 * bold rounded ink strokes, two-part moustache, chin stubble ticks,
 * 4 haircuts, 16 moods, and a theme-aware accent background.
 */

export const SAN_PALETTE = {
  ink: '#191919',
  paper: '#F8F3EC',
  white: '#FFFFFF',
  blush: '#F9BEB3',
  heart: '#E5484D',
  hairSheenLight: '#9D9D9D',
  hairSheenDark: '#484848',
  noseBridge: '#555555',
  smileShadow: '#B9B9B9',
  sweat: '#93C5FD',
  glassTint: '#EBF3FF',
  lightGround: '#1A63D8',
  darkGround: '#F5B942',
} as const;

export const SAN_GROUND_TOKEN = 'rgb(var(--rgb-accent))';

export const SAN_HAIRSTYLES = [
  'textured-crop',
  'taper-fade',
  'pompadour',
  'messy-fringe',
] as const;

export type TSanHairstyle = (typeof SAN_HAIRSTYLES)[number];

export interface ISanHairstyleMeta {
  id: TSanHairstyle;
  label: string;
  note: string;
}

export const SAN_HAIRSTYLE_META: Record<TSanHairstyle, ISanHairstyleMeta> = {
  'textured-crop': {
    id: 'textured-crop',
    label: 'Textured Crop',
    note: 'The default cut, based on how I usually wear my hair.',
  },
  'taper-fade': {
    id: 'taper-fade',
    label: 'Taper Fade',
    note: 'Short faded temples with textured layers on top.',
  },
  pompadour: {
    id: 'pompadour',
    label: 'Pompadour',
    note: 'Swept back off the forehead with clean sides.',
  },
  'messy-fringe': {
    id: 'messy-fringe',
    label: 'Messy Fringe',
    note: 'Spiky top layers with bangs brushed to the left.',
  },
};

export const SAN_MOODS = [
  'grin',
  'chill',
  'wink',
  'love',
  'cool',
  'focused',
  'idea',
  'curious',
  'shipped',
  'vibing',
  'tired',
  'skeptic',
  'awkward',
  'shocked',
  'dizzy',
  '404',
] as const;

export type TSanMood = (typeof SAN_MOODS)[number];

export interface ISanMoodMeta {
  id: TSanMood;
  label: string;
  note: string;
}

export const SAN_MOOD_META: Record<TSanMood, ISanMoodMeta> = {
  grin: {
    id: 'grin',
    label: 'Grin',
    note: 'Big everyday smile, the default face.',
  },
  chill: { id: 'chill', label: 'Chill', note: 'Relaxed face for calm pages.' },
  wink: { id: 'wink', label: 'Wink', note: 'Quick playful nod.' },
  love: {
    id: 'love',
    label: 'Love',
    note: 'Heart eyes for favorite posts and projects.',
  },
  cool: {
    id: 'cool',
    label: 'Cool',
    note: 'Shades on when everything passes CI.',
  },
  focused: {
    id: 'focused',
    label: 'Focused',
    note: 'Glasses on, heads-down in the editor.',
  },
  idea: {
    id: 'idea',
    label: 'Idea',
    note: 'When a tricky bug finally clicks.',
  },
  curious: {
    id: 'curious',
    label: 'Curious',
    note: 'One brow up, poking around under the hood.',
  },
  shipped: {
    id: 'shipped',
    label: 'Shipped',
    note: 'Right after a clean deploy.',
  },
  vibing: {
    id: 'vibing',
    label: 'Vibing',
    note: 'Headphones off, music still playing.',
  },
  tired: {
    id: 'tired',
    label: 'Late Night',
    note: 'Late night with dark mode and coffee.',
  },
  skeptic: {
    id: 'skeptic',
    label: 'Skeptic',
    note: 'Reading a pull request that looks too clever.',
  },
  awkward: {
    id: 'awkward',
    label: 'Awkward',
    note: 'Realizing that commit went straight to main.',
  },
  shocked: {
    id: 'shocked',
    label: 'Shocked',
    note: 'Watching an alert fire in production.',
  },
  dizzy: {
    id: 'dizzy',
    label: 'Dizzy',
    note: 'After untangling nested callbacks for hours.',
  },
  '404': { id: '404', label: '404', note: 'Blank stare for missing pages.' },
};

/** Resting head pose relative to the base drawing: [turnDegrees, dropPx]. */
export const SAN_POSE: Record<TSanMood, readonly [turn: number, drop: number]> =
  {
    grin: [0, 0],
    chill: [2, 0],
    wink: [-6, 0],
    love: [-7, -4],
    cool: [4, -6],
    focused: [5, 8],
    idea: [-2, -16],
    curious: [8, 0],
    shipped: [5, -10],
    vibing: [-5, 6],
    tired: [-4, 20],
    skeptic: [5, 6],
    awkward: [-2, 10],
    shocked: [2, -16],
    dizzy: [-4, 4],
    '404': [7, 16],
  };

export const SAN_VIEW_BOX = '0 0 1240 1240';

const INK = SAN_PALETTE.ink;
const PAPER = SAN_PALETTE.paper;
const WHITE = SAN_PALETTE.white;
const BLUSH = SAN_PALETTE.blush;
const HEART = SAN_PALETTE.heart;
const SHEEN_LIGHT = SAN_PALETTE.hairSheenLight;
const SHEEN_DARK = SAN_PALETTE.hairSheenDark;
const NOSE_BRIDGE = SAN_PALETTE.noseBridge;
const SMILE_SHADOW = SAN_PALETTE.smileShadow;
const SWEAT = SAN_PALETTE.sweat;
const GLASS_TINT = SAN_PALETTE.glassTint;

// Exact facial landmark centers from avatar-base.svg (1240×1240)
const LEFT_X = 488;
const LEFT_Y = 676;
const RIGHT_X = 746;
const RIGHT_Y = 652;

// Exact ears, face, and nose from avatar-base.svg
export const SAN_SKIN_MARKUP =
  `<g stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<g id="ears" fill="${PAPER}" stroke-width="25">` +
  `<path d="M348 671 C270 652 269 756 315 805 Q343 832 376 810Z"/>` +
  `<path d="M880 636 C970 591 984 714 928 775 Q902 801 873 784Z"/>` +
  `<path d="M326 721 Q342 710 357 726 M890 690 Q906 671 917 681" fill="none" stroke-width="15"/>` +
  `</g>` +
  `<g id="face">` +
  `<path d="M350 530 C353 384 454 340 608 340 C769 340 864 405 880 567 C895 731 879 850 802 933 C746 994 686 1029 630 1026 C527 1025 437 960 391 878 C350 802 337 659 350 530Z" fill="${PAPER}" stroke-width="25"/>` +
  `</g>` +
  `<g id="nose" fill="none">` +
  `<path d="M619 695 L628 728" stroke="${NOSE_BRIDGE}" stroke-width="12"/>` +
  `<path d="M592 742 Q624 767 656 737" stroke-width="18"/>` +
  `</g>` +
  `</g>`;

// Exact moustache & chin beard from avatar-base.svg
export const SAN_FACIAL_HAIR_MARKUP =
  `<g stroke="${INK}" stroke-linecap="round" stroke-linejoin="round" fill="none">` +
  `<g id="moustache" stroke-width="15">` +
  `<path d="M506 836 Q510 821 519 817 M525 823 L536 806 M542 814 L552 798 M560 805 L575 793 M585 799 L594 786 M601 793 L610 782 M645 780 L654 787 M664 777 L675 789 M685 779 L697 789 M708 778 L719 792 M730 784 L742 799 M747 793 L759 807"/>` +
  `</g>` +
  `<g id="beard" stroke-width="14">` +
  `<path d="M511 948 L513 956 M531 969 L533 984 M560 983 L562 998 M590 999 L590 1010 M621 1003 L621 1018 M653 1005 L653 1017 M684 999 L687 1010 M711 983 L716 1000 M737 956 L743 974 M760 932 L757 946"/>` +
  `</g>` +
  `</g>`;

// 4 Modern Hairstyles in the exact 1240×1240 coordinate space
export const SAN_HAIR_MARKUP_MAP: Record<TSanHairstyle, string> = {
  // Exact signature hair from avatar-base.svg
  'textured-crop':
    `<g id="hair-textured-crop" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M344 669 Q292 638 273 550 Q250 579 249 527 Q240 504 250 475 Q220 489 234 442 Q260 354 357 334 C365 258 460 212 556 209 C683 201 813 244 863 303 Q884 329 882 354 Q939 400 932 457 Q930 480 917 470 Q930 555 887 628 Q877 645 870 658 Q868 515 781 457 Q683 483 580 439 Q635 476 590 467 Q541 460 495 423 C422 414 367 461 372 540 Q352 599 363 672Z" fill="${INK}" stroke-width="3"/>` +
    `<g fill="none" stroke-width="11">` +
    `<path d="M409 315 Q513 201 707 274 M405 363 Q468 289 531 332" stroke="${SHEEN_LIGHT}"/>` +
    `<path d="M676 331 Q744 364 824 361 M635 389 Q697 421 765 414 M267 438 Q298 394 338 376 M281 508 Q289 466 303 447 M331 496 Q341 459 366 435 M335 632 Q330 598 341 567 M882 560 Q891 512 878 473" stroke="${SHEEN_DARK}"/>` +
    `</g>` +
    `</g>`,

  // Voluminous sculpted Pompadour with side part & clean tapered sides
  pompadour:
    `<g id="hair-pompadour" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M352 670 C328 624 304 560 296 492 C282 452 288 408 308 380 ` +
    `C298 334 328 286 376 266 C394 218 450 184 512 186 C562 162 638 164 686 196 ` +
    `C748 184 814 216 838 268 C864 294 872 326 866 352 ` +
    `C912 368 936 420 924 476 C926 538 906 604 876 654 L868 544 ` +
    `C864 478 836 426 786 398 Q730 374 662 396 Q616 410 572 394 ` +
    `Q504 378 442 406 C392 434 366 494 364 568 L360 670 Z" fill="${INK}" stroke-width="5"/>` +
    `<g fill="none" stroke-width="12">` +
    `<path d="M482 212 C568 194 648 228 686 296" stroke="${SHEEN_LIGHT}"/>` +
    `<path d="M402 276 C474 236 566 254 614 316" stroke="${SHEEN_LIGHT}" stroke-opacity="0.85"/>` +
    `<path d="M684 232 C740 242 778 278 790 326" stroke="${SHEEN_LIGHT}" stroke-opacity="0.8"/>` +
    `<path d="M342 356 C398 318 474 322 528 354" stroke="${SHEEN_DARK}"/>` +
    `<path d="M324 434 Q344 394 384 378" stroke="${SHEEN_DARK}"/>` +
    `<path d="M774 358 Q834 374 878 416 M816 418 Q860 444 882 486" stroke="${SHEEN_LIGHT}" stroke-opacity="0.7"/>` +
    `<path d="M340 546 Q336 496 352 460 M886 556 Q892 508 878 470" stroke="${SHEEN_DARK}"/>` +
    `</g>` +
    `</g>`,

  // Full feathered Textured Top with wide smooth Taper Fade sides
  'taper-fade':
    `<g id="hair-taper-fade" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
    `<defs>` +
    `<linearGradient id="san-high-fade-l" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="#1A1A1C"/>` +
    `<stop offset="28%" stop-color="#565558"/>` +
    `<stop offset="68%" stop-color="#B6B2AB"/>` +
    `<stop offset="100%" stop-color="${PAPER}"/>` +
    `</linearGradient>` +
    `<linearGradient id="san-high-fade-r" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="#1A1A1C"/>` +
    `<stop offset="28%" stop-color="#565558"/>` +
    `<stop offset="68%" stop-color="#B6B2AB"/>` +
    `<stop offset="100%" stop-color="${PAPER}"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<path d="M350 666 C322 606 302 544 294 486 L402 430 C384 494 374 574 372 658 Z" fill="url(#san-high-fade-l)" stroke="none"/>` +
    `<path d="M876 638 C894 574 904 508 906 440 L788 402 C816 468 842 546 854 638 Z" fill="url(#san-high-fade-r)" stroke="none"/>` +
    `<path d="M350 666 C322 606 302 544 294 486 M876 638 C894 574 904 508 906 440" fill="none" stroke="${INK}" stroke-width="24"/>` +
    `<path d="M294 502 C276 482 272 454 278 426 L260 434 C258 400 272 366 294 344 ` +
    `L276 344 C290 302 332 268 376 254 L364 238 C404 202 460 180 518 182 ` +
    `C544 162 598 158 634 174 L616 164 C676 156 746 172 794 214 ` +
    `C834 226 868 258 880 296 C912 324 934 376 930 430 L922 464 ` +
    `C886 438 836 422 786 416 Q734 404 680 422 Q620 416 562 430 ` +
    `Q508 438 468 428 L484 446 Q442 456 398 446 ` +
    `C356 460 322 478 294 502 Z" fill="${INK}" stroke-width="6"/>` +
    `<g stroke="none">` +
    `<path d="M462 230 Q552 178 652 216 Q556 208 462 230 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.9"/>` +
    `<path d="M582 262 Q694 212 784 298 Q686 248 582 262 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.92"/>` +
    `<path d="M416 306 Q538 272 644 334 Q532 320 416 306 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.92"/>` +
    `<path d="M332 396 Q418 352 496 382 Q414 376 332 396 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.82"/>` +
    `<path d="M338 308 Q412 256 488 268 Q414 278 338 308 Z" fill="${SHEEN_DARK}" fill-opacity="0.95"/>` +
    `<path d="M292 374 Q344 328 408 326 Q350 344 292 374 Z" fill="${SHEEN_DARK}" fill-opacity="0.9"/>` +
    `<path d="M648 342 Q728 316 798 364 Q724 342 648 342 Z" fill="${SHEEN_DARK}" fill-opacity="0.95"/>` +
    `<path d="M686 218 Q758 224 812 276 Q752 244 686 218 Z" fill="${SHEEN_DARK}" fill-opacity="0.9"/>` +
    `<path d="M812 372 Q854 348 864 298 Q882 346 842 388 Z" fill="${SHEEN_DARK}" fill-opacity="0.9"/>` +
    `<path d="M532 388 Q604 374 670 398 Q602 394 532 388 Z" fill="${SHEEN_DARK}" fill-opacity="0.85"/>` +
    `</g>` +
    `</g>`,

  // Spiky Feathered Messy Fringe with swept diagonal bangs & curved crescent highlights
  'messy-fringe':
    `<g id="hair-messy-fringe" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M350 668 C320 620 298 564 288 508 L262 522 C260 494 266 466 278 442 ` +
    `L232 468 C236 414 260 368 296 336 L268 346 C288 296 334 262 384 248 ` +
    `L370 232 C418 198 476 186 534 192 L508 172 C578 156 662 162 732 198 ` +
    `L754 190 C802 208 842 242 864 284 L882 280 C912 318 930 368 934 422 ` +
    `Q920 412 910 402 C922 434 926 466 920 494 Q908 484 898 472 ` +
    `C900 534 890 598 874 652 L864 548 Q850 500 834 510 ` +
    `C830 474 818 446 802 428 C792 458 774 480 752 492 Q758 466 754 446 ` +
    `C738 472 718 488 696 496 Q702 470 698 450 C678 478 654 494 630 502 ` +
    `Q638 474 634 454 C608 484 580 504 550 512 Q560 482 556 460 ` +
    `C526 492 494 510 462 518 Q472 488 468 466 C440 502 412 524 386 538 ` +
    `Q388 504 384 478 C368 520 360 584 358 668 Z" fill="${INK}" stroke-width="6"/>` +
    `<g stroke="none">` +
    `<path d="M478 402 C518 334 574 298 642 296 C586 322 532 356 478 402 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.92"/>` +
    `<path d="M600 214 C664 212 716 242 748 296 C702 256 654 230 600 214 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.9"/>` +
    `<path d="M364 402 C394 352 434 328 482 328 C440 350 400 374 364 402 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.85"/>` +
    `<path d="M274 430 C292 372 326 340 368 332 C332 358 302 392 274 430 Z" fill="${SHEEN_LIGHT}" fill-opacity="0.82"/>` +
    `<path d="M418 262 C474 224 532 218 584 240 C528 240 472 246 418 262 Z" fill="${SHEEN_DARK}" fill-opacity="0.95"/>` +
    `<path d="M324 320 C366 280 412 268 456 280 C410 288 366 302 324 320 Z" fill="${SHEEN_DARK}" fill-opacity="0.9"/>` +
    `<path d="M596 404 C634 358 678 340 724 346 C680 362 638 380 596 404 Z" fill="${SHEEN_DARK}" fill-opacity="0.95"/>` +
    `<path d="M730 382 C762 334 796 308 832 306 C798 330 764 356 730 382 Z" fill="${SHEEN_DARK}" fill-opacity="0.92"/>` +
    `<path d="M846 376 C878 392 898 420 904 456 C884 426 866 400 846 376 Z" fill="${SHEEN_DARK}" fill-opacity="0.9"/>` +
    `<path d="M312 518 C322 476 340 450 364 440 C344 464 328 490 312 518 Z" fill="${SHEEN_DARK}" fill-opacity="0.88"/>` +
    `</g>` +
    `</g>`,
};

const round = (value: number) => Math.round(value * 10) / 10;

const line = (inner: string, width = 20, color: string = INK) =>
  `<g fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;

const blushOf = (size: number) => {
  const rxL = round(44 * size);
  const ryL = round(21 * size);
  const rxR = round(43 * size);
  const ryR = round(21 * size);
  return (
    `<g id="cheeks" fill="${BLUSH}" stroke="none">` +
    `<ellipse cx="431" cy="790" rx="${rxL}" ry="${ryL}" transform="rotate(-9 431 790)"/>` +
    `<ellipse cx="821" cy="751" rx="${rxR}" ry="${ryR}" transform="rotate(-9 821 751)"/>` +
    `</g>`
  );
};

// Eyebrow primitives matching avatar-base.svg (`stroke-width: 28`)
const baseBrows: [string, string] = [
  line('<path d="M416 585 Q475 538 545 569"/>', 28),
  line('<path d="M670 562 Q729 522 800 552"/>', 28),
];

const browPair = (
  leftD: string,
  rightD: string,
): [left: string, right: string] => [
  line(`<path d="${leftD}"/>`, 28),
  line(`<path d="${rightD}"/>`, 28),
];

// Eye primitives in 1240×1240 coordinates
/** Exact double-arc happy squint from avatar-base.svg */
const baseGrinEyes: [string, string] = [
  line('<path d="M438 680 Q484 637 538 671 M454 706 Q493 681 527 697"/>', 20),
  line('<path d="M696 656 Q746 614 797 649 M712 679 Q749 654 787 675"/>', 20),
];

/** Warm vertical pill eye with specular glint */
const pillEye = (x: number, y: number, dx = 0, dy = 0, h = 68) =>
  `<g>` +
  `<rect x="${round(x - 27 + dx)}" y="${round(y - h / 2 + dy)}" width="54" height="${h}" rx="27" fill="${INK}"/>` +
  `<circle cx="${round(x - 9 + dx)}" cy="${round(y - h / 2 + 19 + dy)}" r="10" fill="${WHITE}"/>` +
  `</g>`;

/** Half-lidded confident/relaxed eye */
const halfLidEye = (x: number, y: number, dx = 0, tired = false) =>
  `<g>` +
  `<path d="M${x - 52} ${y - 6} L${x + 52} ${y - 12}" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>` +
  `<path d="M${x - 30 + dx} ${y - 8} A30 30 0 0 0 ${x + 30 + dx} ${y - 10} Z" fill="${INK}"/>` +
  (tired
    ? ''
    : `<circle cx="${x - 8 + dx}" cy="${y + 6}" r="8" fill="${WHITE}"/>`) +
  `</g>`;

/** Sparkling 4-point diamond eye */
const diamondEye = (x: number, y: number, r = 46) =>
  `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z" fill="${INK}"/>` +
  `<circle cx="${x}" cy="${y}" r="11" fill="${WHITE}"/>`;

/** Bold heart shape for `love` eyes and marks */
const heartPath = (x: number, y: number, scale = 1) => {
  const at = (dx: number, dy: number) =>
    `${round(x + dx * scale)} ${round(y + dy * scale)}`;
  return `M${at(0, 38)} C${at(-64, -4)} ${at(-38, -52)} ${at(0, -16)} C${at(38, -52)} ${at(64, -4)} ${at(0, 38)} Z`;
};

/** Crisp X eye for `dizzy` */
const crossEye = (x: number, y: number, r = 32) =>
  line(
    `<path d="M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}"/>`,
    22,
  );

/** Dark sunglasses overlay for `cool` with lens clipPath for sliding light glint */
const COOL_SHADES =
  `<defs>` +
  `<clipPath id="san-cool-lenses">` +
  `<rect x="386" y="608" width="204" height="126" rx="34" transform="rotate(-4 488 671)"/>` +
  `<rect x="644" y="586" width="204" height="126" rx="34" transform="rotate(-4 746 649)"/>` +
  `</clipPath>` +
  `</defs>` +
  `<g stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<rect x="386" y="608" width="204" height="126" rx="34" transform="rotate(-4 488 671)" fill="${INK}" stroke-width="20"/>` +
  `<rect x="644" y="586" width="204" height="126" rx="34" transform="rotate(-4 746 649)" fill="${INK}" stroke-width="20"/>` +
  `<path d="M590 662 Q617 650 644 658" fill="none" stroke-width="20"/>` +
  `</g>`;

/** Minimalist dev glasses overlay for `focused` */
const DEV_GLASSES =
  `<g stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<rect x="386" y="608" width="204" height="126" rx="34" transform="rotate(-4 488 671)" fill="${GLASS_TINT}" fill-opacity="0.55" stroke-width="20"/>` +
  `<rect x="644" y="586" width="204" height="126" rx="34" transform="rotate(-4 746 649)" fill="${GLASS_TINT}" fill-opacity="0.55" stroke-width="20"/>` +
  `<path d="M590 662 Q617 650 644 658" fill="none" stroke-width="20"/>` +
  `<path d="M424 706 L454 636 M682 684 L712 614" fill="none" stroke="${WHITE}" stroke-width="12" stroke-opacity="0.85"/>` +
  `</g>`;

// Mouth primitives calibrated cleanly below avatar-base.svg moustache
/** Exact D-grin mouth from avatar-base.svg */
const baseGrinMouth =
  `<g id="mouth" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M546 848 Q624 824 732 824 C731 883 686 916 637 917 Q578 916 546 848Z" fill="${WHITE}" stroke-width="19"/>` +
  `<path d="M563 870 Q635 860 722 847" stroke="${SMILE_SHADOW}" stroke-width="10" fill="none"/>` +
  `</g>`;

const calmSmileMouth = line('<path d="M578 860 Q640 896 704 848"/>', 20);

const focusedMouth = line('<path d="M592 868 L688 860"/>', 20);

const ideaMouth = `<rect x="606" y="844" width="68" height="58" rx="29" fill="${INK}"/>`;

const curiousMouth = line('<path d="M598 868 Q640 882 680 854"/>', 20);

const shippedSmirk = line('<path d="M578 868 Q648 892 712 838"/>', 22);

const vibingMouth = line(
  '<path d="M596 862 Q618 884 638 860 Q658 882 680 856"/>',
  20,
);

const tiredMouth = line('<path d="M592 882 Q638 858 684 876"/>', 20);

const skepticMouth = line('<path d="M584 876 L690 850"/>', 20);

const awkwardMouth =
  `<g stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<rect x="564" y="846" width="150" height="50" rx="25" transform="rotate(-4 639 871)" fill="${WHITE}" stroke-width="18"/>` +
  `<path d="M614 848 L616 894 M664 845 L666 891" stroke-width="11" fill="none"/>` +
  `</g>`;

const shockedMouth = `<rect x="596" y="842" width="88" height="72" rx="28" fill="${INK}"/>`;

const lostMouth = line('<path d="M608 868 L672 864"/>', 20);

// Marks (exact sparkle from avatar-base.svg + editorial JetBrains Mono glyphs)
const baseSparkle =
  `<g id="sparkle" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M970 283 Q977 313 1009 321 Q979 331 973 365 Q964 334 934 324 Q961 315 970 283Z" fill="${WHITE}" stroke-width="17"/>` +
  `</g>`;

const monoMark = (text: string, x = 935, y = 345, size = 92) =>
  `<text x="${x}" y="${y}" fill="${WHITE}" stroke="${INK}" stroke-width="22" paint-order="stroke" stroke-linejoin="round" font-size="${size}" font-family="var(--font-jetbrains-mono), ui-monospace, monospace" font-weight="700">${text}</text>`;

const drawableCheckMark =
  `<g stroke-linecap="round" stroke-linejoin="round" fill="none">` +
  `<path d="M936 332 L964 360 L1018 296" stroke="${INK}" stroke-width="32" pathLength="100" class="san-check-path"/>` +
  `<path d="M936 332 L964 360 L1018 296" stroke="${WHITE}" stroke-width="14" pathLength="100" class="san-check-path"/>` +
  `</g>`;

export interface ISanParts {
  brows: [left: string, right: string];
  eyes: [left: string, right: string];
  mouth: string;
  glasses?: string;
  extra?: string;
  marks?: string[];
  blush?: number;
}

export const SAN_PARTS: Record<TSanMood, ISanParts> = {
  grin: {
    brows: baseBrows,
    eyes: baseGrinEyes,
    mouth: baseGrinMouth,
    blush: 1,
    marks: [baseSparkle],
  },
  chill: {
    brows: baseBrows,
    eyes: [pillEye(LEFT_X, LEFT_Y), pillEye(RIGHT_X, RIGHT_Y)],
    mouth: calmSmileMouth,
    blush: 0.85,
  },
  wink: {
    brows: browPair('M416 574 Q475 528 545 558', 'M670 572 Q729 538 800 564'),
    eyes: [pillEye(LEFT_X, LEFT_Y), baseGrinEyes[1]],
    mouth: shippedSmirk,
    blush: 0.9,
  },
  love: {
    brows: browPair('M414 562 Q475 514 545 546', 'M670 540 Q729 496 800 528'),
    eyes: [
      `<path d="${heartPath(LEFT_X, LEFT_Y, 0.95)}" fill="${HEART}"/>`,
      `<path d="${heartPath(RIGHT_X, RIGHT_Y, 0.95)}" fill="${HEART}"/>`,
    ],
    mouth: calmSmileMouth,
    blush: 1.15,
    marks: [
      `<path d="${heartPath(964, 326, 0.88)}" fill="${HEART}" stroke="${INK}" stroke-width="16" stroke-linejoin="round"/>`,
      `<path d="${heartPath(1038, 434, 0.56)}" fill="${HEART}" stroke="${INK}" stroke-width="15" stroke-linejoin="round"/>`,
    ],
  },
  cool: {
    brows: browPair('M418 572 L544 568', 'M670 542 Q729 506 800 534'),
    glasses: COOL_SHADES,
    eyes: [
      `<g clip-path="url(#san-cool-lenses)"><path class="san-shades-glint" d="M432 728 L492 604 M462 728 L522 604" fill="none" stroke="${WHITE}" stroke-width="14" stroke-linecap="round" stroke-opacity="0.9"/></g>`,
      `<g clip-path="url(#san-cool-lenses)"><path class="san-shades-glint" d="M690 706 L750 582 M720 706 L780 582" fill="none" stroke="${WHITE}" stroke-width="14" stroke-linecap="round" stroke-opacity="0.9"/></g>`,
    ],
    mouth: shippedSmirk,
    blush: 0.5,
  },
  focused: {
    brows: browPair('M418 574 L544 584', 'M672 574 L798 556'),
    glasses: DEV_GLASSES,
    eyes: [
      pillEye(LEFT_X, LEFT_Y, 0, 4, 52),
      pillEye(RIGHT_X, RIGHT_Y, 0, 4, 52),
    ],
    mouth: focusedMouth,
    blush: 0,
    marks: [monoMark('{}', 918, 350, 86)],
  },
  idea: {
    brows: browPair('M414 554 Q475 504 545 538', 'M670 532 Q729 488 800 520'),
    eyes: [diamondEye(LEFT_X, LEFT_Y), diamondEye(RIGHT_X, RIGHT_Y)],
    mouth: ideaMouth,
    blush: 0.9,
    marks: [baseSparkle, monoMark('!', 206, 400, 96)],
  },
  curious: {
    brows: browPair('M418 592 L544 586', 'M670 532 Q729 484 800 520'),
    eyes: [
      pillEye(LEFT_X, LEFT_Y, 10, 0, 56),
      pillEye(RIGHT_X, RIGHT_Y, 10, -6, 78),
    ],
    mouth: curiousMouth,
    blush: 0.7,
    marks: [monoMark('?', 945, 355, 106)],
  },
  shipped: {
    brows: browPair('M418 578 L544 574', 'M670 546 Q729 506 800 538'),
    eyes: [halfLidEye(LEFT_X, LEFT_Y, 6), halfLidEye(RIGHT_X, RIGHT_Y, 6)],
    mouth: shippedSmirk,
    blush: 0.65,
    marks: [drawableCheckMark],
  },
  vibing: {
    brows: baseBrows,
    eyes: [
      line(
        `<path d="M${LEFT_X - 48} ${LEFT_Y - 4} Q${LEFT_X} ${LEFT_Y + 38} ${LEFT_X + 48} ${LEFT_Y - 8}"/>`,
        22,
      ),
      line(
        `<path d="M${RIGHT_X - 48} ${RIGHT_Y - 4} Q${RIGHT_X} ${RIGHT_Y + 38} ${RIGHT_X + 48} ${RIGHT_Y - 8}"/>`,
        22,
      ),
    ],
    mouth: vibingMouth,
    blush: 1,
    marks: [monoMark('♪', 944, 348, 106), monoMark('♪', 194, 460, 78)],
  },
  tired: {
    brows: browPair('M416 600 L544 574', 'M670 564 L800 584'),
    eyes: [
      halfLidEye(LEFT_X, LEFT_Y, 0, true),
      halfLidEye(RIGHT_X, RIGHT_Y, 0, true),
    ],
    extra: line(
      `<path d="M${LEFT_X - 42} ${LEFT_Y + 42} Q${LEFT_X} ${LEFT_Y + 58} ${LEFT_X + 38} ${LEFT_Y + 40}"/>` +
        `<path d="M${RIGHT_X - 38} ${RIGHT_Y + 42} Q${RIGHT_X} ${RIGHT_Y + 58} ${RIGHT_X + 42} ${RIGHT_Y + 40}"/>`,
      13,
      NOSE_BRIDGE,
    ),
    mouth: tiredMouth,
    blush: 0,
    marks: [monoMark('zZ', 922, 348, 86)],
  },
  skeptic: {
    brows: browPair('M418 594 L544 590', 'M670 572 L800 540'),
    eyes: [halfLidEye(LEFT_X, LEFT_Y, 18), halfLidEye(RIGHT_X, RIGHT_Y, 18)],
    mouth: skepticMouth,
    blush: 0,
    marks: [
      `<circle cx="932" cy="336" r="13" fill="${WHITE}" stroke="${INK}" stroke-width="14"/>`,
      `<circle cx="976" cy="336" r="13" fill="${WHITE}" stroke="${INK}" stroke-width="14"/>`,
      `<circle cx="1020" cy="336" r="13" fill="${WHITE}" stroke="${INK}" stroke-width="14"/>`,
    ],
  },
  awkward: {
    brows: browPair('M416 598 L544 566', 'M670 554 L800 582'),
    eyes: [
      pillEye(LEFT_X, LEFT_Y, -14, 4, 60),
      pillEye(RIGHT_X, RIGHT_Y, -14, 4, 60),
    ],
    mouth: awkwardMouth,
    blush: 1.1,
    marks: [
      `<path d="M952 364 C916 420 912 466 952 466 C992 466 988 420 952 364 Z" fill="${SWEAT}" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>`,
    ],
  },
  shocked: {
    brows: browPair('M414 548 Q475 496 545 532', 'M670 526 Q729 480 800 514'),
    eyes: [
      `<rect x="${LEFT_X - 38}" y="${LEFT_Y - 48}" width="76" height="96" rx="38" fill="${WHITE}" stroke="${INK}" stroke-width="19"/><circle cx="${LEFT_X}" cy="${LEFT_Y}" r="16" fill="${INK}"/>`,
      `<rect x="${RIGHT_X - 38}" y="${RIGHT_Y - 48}" width="76" height="96" rx="38" fill="${WHITE}" stroke="${INK}" stroke-width="19"/><circle cx="${RIGHT_X}" cy="${RIGHT_Y}" r="16" fill="${INK}"/>`,
    ],
    mouth: shockedMouth,
    blush: 0,
    marks: [monoMark('?!', 914, 348, 98)],
  },
  dizzy: {
    brows: browPair('M416 592 Q475 560 544 584', 'M670 568 Q729 536 800 564'),
    eyes: [crossEye(LEFT_X, LEFT_Y), crossEye(RIGHT_X, RIGHT_Y)],
    mouth: vibingMouth,
    blush: 0.7,
    marks: [
      baseSparkle,
      `<path d="M210 388 Q214 406 232 410 Q214 416 210 434 Q204 416 186 410 Q204 406 210 388 Z" fill="${WHITE}" stroke="${INK}" stroke-width="13" stroke-linejoin="round"/>`,
    ],
  },
  '404': {
    brows: browPair('M418 574 L544 596', 'M670 538 Q729 494 800 528'),
    eyes: [
      `<circle cx="${LEFT_X}" cy="${LEFT_Y}" r="36" fill="none" stroke="${INK}" stroke-width="20"/>`,
      `<circle cx="${RIGHT_X}" cy="${RIGHT_Y}" r="36" fill="none" stroke="${INK}" stroke-width="20"/>`,
    ],
    mouth: lostMouth,
    blush: 0,
    marks: [monoMark('404', 892, 348, 76)],
  },
};

const distinct = (key: (part: ISanParts, mood: TSanMood) => string) => {
  const seen = new Set<string>();
  return SAN_MOODS.filter((mood) => {
    const drawing = key(SAN_PARTS[mood], mood);
    if (seen.has(drawing)) return false;
    seen.add(drawing);
    return true;
  });
};

/** Distinct selectable parts for the Mix-and-Match face lab. */
export const SAN_MIX = {
  eyes: distinct(
    (part) =>
      part.brows.join('') +
      (part.glasses ?? '') +
      part.eyes.join('') +
      (part.extra ?? ''),
  ),
  mouth: distinct((part) => part.mouth),
  extra: distinct(
    (part) => `${part.blush ?? 0.85}${(part.marks ?? []).join('')}`,
  ),
} as const;

export const SAN_LAYERS = [
  'ground',
  'head',
  'blush',
  'hair',
  'brows',
  'face',
  'marks',
] as const;

export type TSanLayer = (typeof SAN_LAYERS)[number];

const posed = (parts: string[], [turn, drop]: readonly [number, number]) =>
  `<g transform="translate(0 ${drop})"><g transform="translate(620 620)"><g transform="rotate(${turn})"><g transform="translate(-620 -620)">${parts.join('')}</g></g></g></g>`;

export interface ISanResolvedParts {
  pose: readonly [number, number];
  hairMarkup: string;
  facialHairMarkup: string;
  blushMarkup: string;
  browsMarkup: string;
  glassesMarkup: string;
  eyesMarkup: string;
  mouthMarkup: string;
  extraMarkup: string;
  marksMarkup: string;
}

/** Resolve all SVG layer strings for either a single mood or a mixed face. */
export const resolveSanParts = ({
  mood = 'grin',
  hairstyle = 'textured-crop',
  showFacialHair = true,
  eyesMood,
  mouthMood,
  extraMood,
  showMarks = true,
}: {
  mood?: TSanMood;
  hairstyle?: TSanHairstyle;
  showFacialHair?: boolean;
  eyesMood?: TSanMood;
  mouthMood?: TSanMood;
  extraMood?: TSanMood;
  showMarks?: boolean;
}): ISanResolvedParts => {
  const eyeSource = SAN_PARTS[eyesMood ?? mood];
  const mouthSource = SAN_PARTS[mouthMood ?? mood];
  const extraSource = SAN_PARTS[extraMood ?? mood];
  const pose = SAN_POSE[eyesMood ?? mood];

  const blushSize = extraSource.blush ?? 0;
  const blushMarkup = blushSize ? blushOf(blushSize) : '';

  return {
    pose,
    hairMarkup: SAN_HAIR_MARKUP_MAP[hairstyle],
    facialHairMarkup: showFacialHair ? SAN_FACIAL_HAIR_MARKUP : '',
    blushMarkup,
    browsMarkup: `<g class="san-brow san-brow-l">${eyeSource.brows[0]}</g><g class="san-brow san-brow-r">${eyeSource.brows[1]}</g>`,
    glassesMarkup: eyeSource.glasses ?? '',
    eyesMarkup: `<g class="san-eye san-eye-l">${eyeSource.eyes[0]}</g><g class="san-eye san-eye-r">${eyeSource.eyes[1]}</g>`,
    mouthMarkup: mouthSource.mouth,
    extraMarkup: eyeSource.extra ?? '',
    marksMarkup: showMarks
      ? (extraSource.marks ?? [])
          .map((mark, idx) => `<g class="san-mark san-mark-${idx}">${mark}</g>`)
          .join('')
      : '',
  };
};

/** Build a standalone downloadable SVG string for San. */
export const buildSanSvgFile = ({
  mood = 'grin',
  hairstyle = 'textured-crop',
  showFacialHair = true,
  eyesMood,
  mouthMood,
  extraMood,
  ground = SAN_PALETTE.lightGround,
  showMarks = true,
}: {
  mood?: TSanMood;
  hairstyle?: TSanHairstyle;
  showFacialHair?: boolean;
  eyesMood?: TSanMood;
  mouthMood?: TSanMood;
  extraMood?: TSanMood;
  ground?: string | null;
  showMarks?: boolean;
}) => {
  const resolved = resolveSanParts({
    mood,
    hairstyle,
    showFacialHair,
    eyesMood,
    mouthMood,
    extraMood,
    showMarks,
  });

  const groundCircle = ground
    ? `<circle cx="620" cy="620" r="617" fill="${ground}"/>`
    : '';

  const inner = posed(
    [
      SAN_SKIN_MARKUP,
      resolved.blushMarkup,
      resolved.hairMarkup,
      resolved.browsMarkup,
      resolved.glassesMarkup,
      resolved.eyesMarkup,
      resolved.extraMarkup,
      resolved.facialHairMarkup,
      resolved.mouthMarkup,
      resolved.marksMarkup,
    ].filter(Boolean),
    resolved.pose,
  );

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SAN_VIEW_BOX}" width="1240" height="1240">`,
    '<title>San (Muhammad Ihsan)</title>',
    groundCircle,
    inner,
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');
};

/** Return separate layer SVG strings for the exploded-layers inspector. */
export const getSanLayers = (
  mood: TSanMood = 'grin',
  hairstyle: TSanHairstyle = 'textured-crop',
  showFacialHair = true,
  ground: string = SAN_GROUND_TOKEN,
): Record<TSanLayer, string | null> => {
  const resolved = resolveSanParts({
    mood,
    hairstyle,
    showFacialHair,
    showMarks: true,
  });
  const wrap = (content: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SAN_VIEW_BOX}" aria-hidden="true">${content}</svg>`;

  return {
    ground: wrap(`<circle cx="620" cy="620" r="610" fill="${ground}"/>`),
    head: wrap(posed([SAN_SKIN_MARKUP], resolved.pose)),
    blush: resolved.blushMarkup
      ? wrap(posed([resolved.blushMarkup], resolved.pose))
      : null,
    hair: wrap(posed([resolved.hairMarkup], resolved.pose)),
    brows: wrap(posed([resolved.browsMarkup], resolved.pose)),
    face: wrap(
      posed(
        [
          resolved.glassesMarkup,
          resolved.eyesMarkup,
          resolved.extraMarkup,
          resolved.facialHairMarkup,
          resolved.mouthMarkup,
        ].filter(Boolean),
        resolved.pose,
      ),
    ),
    marks: resolved.marksMarkup
      ? wrap(posed([resolved.marksMarkup], resolved.pose))
      : null,
  };
};
