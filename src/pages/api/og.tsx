import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

import {
  resolveSanParts,
  SAN_MOODS,
  SAN_SKIN_MARKUP,
  SAN_VIEW_BOX,
  TSanMood,
} from '@/lib/san';

export const config = {
  runtime: 'edge',
};

const OG_CACHE_CONTROL =
  'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400';

// Editorial Minimalism palettes (synced with DESIGN.md & globals.css)
const THEMES = {
  light: {
    bg: '#FAF9F6',
    bgGradientEnd: '#F2F0EB',
    surface: '#F2F0EB',
    text: '#18181B',
    textMuted: '#57534E',
    accent: '#2F80FA',
    accentMuted: '#1D6CE8',
    border: '#E7E5E0',
  },
  dark: {
    bg: '#0E0E10',
    bgGradientEnd: '#16161A',
    surface: '#1F1F24',
    text: '#F4F4F0',
    textMuted: '#A1A1AA',
    accent: '#F5B942',
    accentMuted: '#D99B26',
    border: '#26262C',
  },
} as const;

const FONT_WEIGHTS = [400, 700] as const;

function truncateAtWordBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const clean = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
  return `${clean.replace(/[.,;:\-\s]+$/, '')}...`;
}

function getTitleFontSize(title: string): string {
  if (title.length > 52) return '42px';
  if (title.length > 36) return '48px';
  return '54px';
}

const SAN_TAG_MOODS: Array<[RegExp, TSanMood]> = [
  [/react|next|typescript|javascript|frontend|css|tailwind/i, 'focused'],
  [/docker|linux|devops|tool|stow|terminal|cli/i, 'cool'],
  [/career|story|life|career|learn|journey/i, 'curious'],
  [/ship|launch|release|project/i, 'shipped'],
];

/**
 * Picks San's mood for the OG portrait: explicit `mood` param first, then tags, then page type.
 */
function pickSanMood(
  explicit: string | null,
  type: string,
  tags: string[],
): TSanMood {
  if (explicit && (SAN_MOODS as readonly string[]).includes(explicit)) {
    return explicit as TSanMood;
  }
  const haystack = tags.join(' ');
  for (const [pattern, mood] of SAN_TAG_MOODS) {
    if (pattern.test(haystack)) return mood;
  }
  return type === 'article' ? 'idea' : 'grin';
}

function buildSanPortraitDataUrl(mood: TSanMood, ground: string): string {
  const parts = resolveSanParts({ mood, showMarks: true });
  const markup = [
    SAN_SKIN_MARKUP,
    parts.blushMarkup,
    parts.hairMarkup,
    parts.browsMarkup,
    parts.glassesMarkup,
    parts.eyesMarkup,
    parts.extraMarkup,
    parts.facialHairMarkup,
    parts.mouthMarkup,
    parts.marksMarkup,
  ]
    .filter(Boolean)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SAN_VIEW_BOX}"><rect width="1240" height="1240" fill="${ground}"/>${markup}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getAllowedImageUrl(rawUrl: string | null): string | null {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    const isDev = process.env.NODE_ENV !== 'production';
    const allowedProtocols = isDev ? ['https:', 'http:'] : ['https:'];
    if (!allowedProtocols.includes(parsed.protocol)) {
      return null;
    }

    const allowedHosts = new Set<string>([
      'ihsanmuh.com',
      'images.unsplash.com',
    ]);
    if (process.env.NEXT_PUBLIC_URL) {
      allowedHosts.add(process.env.NEXT_PUBLIC_URL);
    }
    if (isDev) {
      allowedHosts.add('localhost');
      allowedHosts.add('127.0.0.1');
    }

    if (!allowedHosts.has(parsed.hostname)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCodePoint(bytes[i]!);
  }
  return btoa(binary);
}

async function loadAvatarAsDataUrl(): Promise<string> {
  const res = await fetch(
    new URL('../../../public/images/avatar.png', import.meta.url),
  );
  if (!res.ok) throw new Error(`Failed to load avatar: ${res.status}`);
  const buffer = await res.arrayBuffer();
  return `data:image/png;base64,${arrayBufferToBase64(buffer)}`;
}

async function loadPlusJakartaFont(weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}&display=swap`;
  const css = await fetch(url).then((r) => r.text());
  const match = /url\((https:\/\/[^)]+)\)/.exec(css);
  const fontUrl = match?.[1];
  if (!fontUrl) throw new Error(`Failed to load Plus Jakarta Sans ${weight}`);
  const res = await fetch(fontUrl);
  if (res.status !== 200)
    throw new Error(`Failed to fetch font: ${res.status}`);
  return res.arrayBuffer();
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const [fontData, avatarSrc] = await Promise.all([
      Promise.all(FONT_WEIGHTS.map((w) => loadPlusJakartaFont(w))),
      loadAvatarAsDataUrl().catch(() => null),
    ]);

    const titleRaw = searchParams.get('title') || 'Muhammad Ihsan';
    const title =
      titleRaw.replace(/\s*\|\s*Muhammad Ihsan$/, '').trim() ||
      'Muhammad Ihsan';
    const description =
      searchParams.get('description') ||
      'Software engineer in Jakarta building full-stack web applications across the React and TypeScript ecosystem.';
    const type = searchParams.get('type') || 'website';
    const tagsParam = searchParams.get('tags');
    let tags: string[];
    if (tagsParam) {
      tags = tagsParam
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (type === 'article') {
      tags = ['blog'];
    } else {
      tags = [];
    }
    const imageUrl = getAllowedImageUrl(searchParams.get('image'));

    const themeParam = searchParams.get('theme');
    const colors = themeParam === 'dark' ? THEMES.dark : THEMES.light;
    const sanSrc = buildSanPortraitDataUrl(
      pickSanMood(searchParams.get('mood'), type, tags),
      colors.accent,
    );

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            background: colors.bg,
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
          }}
        >
          {/* Left: content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '56px 64px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* URL */}
              <div
                style={{
                  fontSize: '22px',
                  color: colors.textMuted,
                  fontWeight: 400,
                }}
              >
                ihsanmuh.com
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: getTitleFontSize(title),
                  fontWeight: 700,
                  color: colors.accent,
                  lineHeight: 1.15,
                  maxWidth: '640px',
                  wordWrap: 'break-word',
                }}
              >
                {title}
              </div>

              {/* Tag badges */}
              {tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignSelf: 'flex-start',
                  }}
                >
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: colors.surface,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '9999px',
                        padding: '8px 18px',
                        fontSize: '19px',
                        color: colors.textMuted,
                        fontWeight: 400,
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {description && (
                <div
                  style={{
                    fontSize: '22px',
                    color: colors.textMuted,
                    lineHeight: 1.45,
                    maxWidth: '640px',
                  }}
                >
                  {truncateAtWordBoundary(description, 180)}
                </div>
              )}
            </div>

            {/* Author footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {avatarSrc && (
                <img
                  src={avatarSrc}
                  alt=''
                  width={64}
                  height={64}
                  style={{
                    borderRadius: '9999px',
                    objectFit: 'cover',
                    background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentMuted} 100%)`,
                  }}
                />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '26px',
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  Muhammad Ihsan
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: colors.textMuted,
                  }}
                >
                  @ihsnmuh
                </div>
              </div>
            </div>
          </div>

          {/* Right: graphic or blog image */}
          <div
            style={{
              width: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: imageUrl
                ? colors.bg
                : `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgGradientEnd} 100%)`,
              borderLeft: `1px solid ${colors.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt=''
                width={420}
                height={630}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={sanSrc}
                  alt=''
                  width={300}
                  height={300}
                  style={{
                    borderRadius: '9999px',
                    border: `6px solid ${colors.border}`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': OG_CACHE_CONTROL,
        },
        fonts: FONT_WEIGHTS.map((weight, i) => ({
          name: 'Plus Jakarta Sans',
          data: fontData[i]!,
          style: 'normal' as const,
          weight,
        })),
      },
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
