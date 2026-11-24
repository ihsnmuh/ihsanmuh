import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='180'
                  height='193'
                  viewBox='0 0 42 45'
                  fill={colors.accent}
                >
                  <path d='M38.333 0H42v3.613h-3.667V0ZM10.667 6.898H7v3.613h3.667V6.898ZM38.333 6.898H42v3.613h-3.667V6.898ZM38.333 13.796H42v17.408h-3.667V13.796Z' />
                  <path
                    d='M31.333 34.49H42V45H0V34.49h3.333v-3.286H0v-10.51h7.333v3.613H3.667v3.284h7v-6.898h3.666v10.511H7v3.285h3.667v6.898h13.666v-3.285H14V34.49h14v6.898h3.333v-6.898ZM35 38.101h3.333v3.285H35v-3.285Zm-28 0H3.667v3.285H7v-3.285Z'
                    fillRule='evenodd'
                  />
                  <path d='M14.333 13.796H3.667V3.613h10.666V0H0v17.409h14.333v-3.613ZM17.667 0h17.666v17.409h-3.666V3.613H21.333v3.285h7v3.613h-7v3.285h7v3.613h-7V27.59h10.334v-3.284h-7v-3.614h10.666v10.511H17.667V0Z' />
                </svg>
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
