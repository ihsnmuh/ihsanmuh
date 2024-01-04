import { TSVG } from '@/types/types/components/svg';

const KufiLogo = ({ fill, className }: TSVG) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 42 45'
      fill={fill}
      className={className}
    >
      <g>
        <path d='M38.333 0H42v3.613h-3.667V0ZM10.667 6.898H7v3.613h3.667V6.898ZM38.333 6.898H42v3.613h-3.667V6.898ZM38.333 13.796H42v17.408h-3.667V13.796Z' />
        <path
          d='M31.333 34.49H42V45H0V34.49h3.333v-3.286H0v-10.51h7.333v3.613H3.667v3.284h7v-6.898h3.666v10.511H7v3.285h3.667v6.898h13.666v-3.285H14V34.49h14v6.898h3.333v-6.898ZM35 38.101h3.333v3.285H35v-3.285Zm-28 0H3.667v3.285H7v-3.285Z'
          fillRule='evenodd'
        />
        <path d='M14.333 13.796H3.667V3.613h10.666V0H0v17.409h14.333v-3.613ZM17.667 0h17.666v17.409h-3.666V3.613H21.333v3.285h7v3.613h-7v3.285h7v3.613h-7V27.59h10.334v-3.284h-7v-3.614h10.666v10.511H17.667V0Z' />
      </g>
    </svg>
  );
};

export default KufiLogo;
