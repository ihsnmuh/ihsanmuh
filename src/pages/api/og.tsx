import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const SITE_URL = `https://${process.env.NEXT_PUBLIC_URL}`;

// Theme colors from globals.css (dark mode primary palette)
const COLORS = {
  bg: '#0f172a', // slate-900
  bgGradientEnd: '#1e293b', // slate-800
  surface: 'rgba(30, 41, 59, 0.6)', // slate-800/60
  text: '#f1f5f9', // slate-100
  textMuted: '#94a3b8', // slate-400
  accent: '#facc15', // primary-400 dark mode (amber)
  accentMuted: '#eab308', // primary-500
  border: 'rgba(148, 163, 184, 0.2)',
};

const FONT_WEIGHTS = [400, 600, 700, 800] as const;

function extractYearFromTitle(title: string): string | null {
  const match = /\b(19|20)\d{2}\b/.exec(title);
  return match ? match[0] : null;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCodePoint(bytes[i]!);
  }
  return btoa(binary);
}

async function loadImageAsDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const contentType = res.headers.get('content-type') || 'image/png';
  const buffer = await res.arrayBuffer();
  return `data:${contentType};base64,${arrayBufferToBase64(buffer)}`;
}

async function loadPoppinsFont(weight: number): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&display=swap`;
  const css = await fetch(url).then((r) => r.text());
  const match = /url\((https:\/\/[^)]+)\)/.exec(css);
  const fontUrl = match?.[1];
  if (!fontUrl) throw new Error(`Failed to load Poppins ${weight}`);
  const res = await fetch(fontUrl);
  if (res.status !== 200)
    throw new Error(`Failed to fetch font: ${res.status}`);
  return res.arrayBuffer();
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const [fontData, avatarSrc] = await Promise.all([
      Promise.all(FONT_WEIGHTS.map((w) => loadPoppinsFont(w))),
      loadImageAsDataUrl(`${SITE_URL}/images/avatar.png`).catch(
        () => null,
      ),
    ]);

    const titleRaw = searchParams.get('title') || 'Muhammad Ihsan';
    const title =
      titleRaw.replace(/\s*\|\s*Muhammad Ihsan$/, '').trim() ||
      'Muhammad Ihsan';
    const description =
      searchParams.get('description') ||
      'Software Engineer passionate about creating excellent user experiences. I work with TypeScript, React, and Next.js.';
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
    const imageUrl = searchParams.get('image');

    const year = extractYearFromTitle(titleRaw);
    const displayYear = year || 'MI';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            background: COLORS.bg,
            fontFamily: 'Poppins, system-ui, sans-serif',
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
                gap: '24px',
              }}
            >
              {/* URL */}
              <div
                style={{
                  fontSize: '22px',
                  color: COLORS.textMuted,
                  fontWeight: 500,
                }}
              >
                ihsanmuh.com
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: 700,
                  color: COLORS.accent,
                  lineHeight: 1.15,
                  maxWidth: '580px',
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
                        backgroundColor: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: '9999px',
                        padding: '10px 20px',
                        fontSize: '20px',
                        color: COLORS.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}

              {/* Description (website type) */}
              {type !== 'article' && description && (
                <div
                  style={{
                    fontSize: '24px',
                    color: COLORS.textMuted,
                    lineHeight: 1.4,
                    maxWidth: '520px',
                  }}
                >
                  {description.length > 100
                    ? `${description.slice(0, 97)}...`
                    : description}
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
                    background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentMuted} 100%)`,
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
                    color: COLORS.text,
                  }}
                >
                  Muhammad Ihsan
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    color: COLORS.textMuted,
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
                ? COLORS.bg
                : `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgGradientEnd} 100%)`,
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-8deg)',
                }}
              >
                <div
                  style={{
                    fontSize: '140px',
                    fontWeight: 800,
                    color: COLORS.accent,
                    lineHeight: 1,
                    textShadow: '0 4px 24px rgba(250, 204, 21, 0.4)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {displayYear}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: FONT_WEIGHTS.map((weight, i) => ({
          name: 'Poppins',
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
