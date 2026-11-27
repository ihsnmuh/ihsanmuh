import { cn } from '@/lib/utils';

const SAN_LOGO_MARKUP =
  '<g stroke="#191919" stroke-linecap="round" stroke-linejoin="round"><g id="ears" fill="#F8F3EC" stroke-width="25"><path d="M348 671 C270 652 269 756 315 805 Q343 832 376 810Z"/><path d="M880 636 C970 591 984 714 928 775 Q902 801 873 784Z"/><path d="M326 721 Q342 710 357 726 M890 690 Q906 671 917 681" fill="none" stroke-width="15"/></g><g id="face"><path d="M350 530 C353 384 454 340 608 340 C769 340 864 405 880 567 C895 731 879 850 802 933 C746 994 686 1029 630 1026 C527 1025 437 960 391 878 C350 802 337 659 350 530Z" fill="#F8F3EC" stroke-width="25"/></g><g id="nose" fill="none"><path d="M619 695 L628 728" stroke="#555555" stroke-width="12"/><path d="M592 742 Q624 767 656 737" stroke-width="18"/></g></g><g id="cheeks" fill="#F9BEB3" stroke="none"><ellipse cx="431" cy="790" rx="44" ry="21" transform="rotate(-9 431 790)"/><ellipse cx="821" cy="751" rx="43" ry="21" transform="rotate(-9 821 751)"/></g><g id="hair-textured-crop" stroke="#191919" stroke-linecap="round" stroke-linejoin="round"><path d="M344 669 Q292 638 273 550 Q250 579 249 527 Q240 504 250 475 Q220 489 234 442 Q260 354 357 334 C365 258 460 212 556 209 C683 201 813 244 863 303 Q884 329 882 354 Q939 400 932 457 Q930 480 917 470 Q930 555 887 628 Q877 645 870 658 Q868 515 781 457 Q683 483 580 439 Q635 476 590 467 Q541 460 495 423 C422 414 367 461 372 540 Q352 599 363 672Z" fill="#191919" stroke-width="3"/><g fill="none" stroke-width="11"><path d="M409 315 Q513 201 707 274 M405 363 Q468 289 531 332" stroke="#9D9D9D"/><path d="M676 331 Q744 364 824 361 M635 389 Q697 421 765 414 M267 438 Q298 394 338 376 M281 508 Q289 466 303 447 M331 496 Q341 459 366 435 M335 632 Q330 598 341 567 M882 560 Q891 512 878 473" stroke="#484848"/></g></g><g class="san-brow san-brow-l"><g fill="none" stroke="#191919" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"><path d="M416 585 Q475 538 545 569"/></g></g><g class="san-brow san-brow-r"><g fill="none" stroke="#191919" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"><path d="M670 562 Q729 522 800 552"/></g></g><g class="san-eye san-eye-l"><g fill="none" stroke="#191919" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M438 680 Q484 637 538 671 M454 706 Q493 681 527 697"/></g></g><g class="san-eye san-eye-r"><g fill="none" stroke="#191919" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M696 656 Q746 614 797 649 M712 679 Q749 654 787 675"/></g></g><g stroke="#191919" stroke-linecap="round" stroke-linejoin="round" fill="none"><g id="moustache" stroke-width="15"><path d="M506 836 Q510 821 519 817 M525 823 L536 806 M542 814 L552 798 M560 805 L575 793 M585 799 L594 786 M601 793 L610 782 M645 780 L654 787 M664 777 L675 789 M685 779 L697 789 M708 778 L719 792 M730 784 L742 799 M747 793 L759 807"/></g><g id="beard" stroke-width="14"><path d="M511 948 L513 956 M531 969 L533 984 M560 983 L562 998 M590 999 L590 1010 M621 1003 L621 1018 M653 1005 L653 1017 M684 999 L687 1010 M711 983 L716 1000 M737 956 L743 974 M760 932 L757 946"/></g></g><g id="mouth" stroke="#191919" stroke-linecap="round" stroke-linejoin="round"><path d="M546 848 Q624 824 732 824 C731 883 686 916 637 917 Q578 916 546 848Z" fill="#FFFFFF" stroke-width="19"/><path d="M563 870 Q635 860 722 847" stroke="#B9B9B9" stroke-width="10" fill="none"/></g>';

/**
 * Static San portrait for the site logo. Pre-rendered from the mascot (grin, textured crop)
 * so the header does not ship the full mascot module. Background follows the accent token.
 */
const SanLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1240 1240'
      aria-hidden='true'
      focusable='false'
      className={cn('block w-full h-full', className)}
    >
      <rect width='1240' height='1240' fill='rgb(var(--rgb-accent))' />
      <g dangerouslySetInnerHTML={{ __html: SAN_LOGO_MARKUP }} />
    </svg>
  );
};

export default SanLogo;
