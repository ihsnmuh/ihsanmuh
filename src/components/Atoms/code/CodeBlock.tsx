import { Check, Copy } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const InsideCodeFigureContext = React.createContext(false);

const extractCodeText = (container: HTMLElement | null): string => {
  if (!container) return '';
  const codeEl =
    container.querySelector('pre code') ?? container.querySelector('pre');
  if (!codeEl) return '';

  const lineElements = codeEl.querySelectorAll('[data-line]');
  if (lineElements.length > 0) {
    return Array.from(lineElements)
      .map((line) => {
        const text = line.textContent ?? '';
        return text === ' ' ? '' : text;
      })
      .join('\n')
      .trimEnd();
  }

  return (codeEl.textContent ?? '').trimEnd();
};

type CopyCodeButtonProps = {
  getText: () => string;
  className?: string;
};

const CopyCodeButton = ({ getText, className }: CopyCodeButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const text = getText();
    if (!text || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  return (
    <button
      type='button'
      onClick={handleCopy}
      aria-label={copied ? 'Code copied' : 'Copy code'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-mono font-medium transition-all',
        'border border-white/10 bg-zinc-800/90 text-zinc-300 backdrop-blur-sm',
        'hover:border-white/20 hover:bg-zinc-700/90 hover:text-zinc-100',
        'active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        copied &&
          'border-emerald-500/30 text-emerald-400 hover:text-emerald-300',
        className,
      )}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};

type CodeFigureProps = React.ComponentPropsWithoutRef<'figure'> & {
  'data-rehype-pretty-code-figure'?: string;
};

export const CodeFigure = ({
  children,
  className,
  ...rest
}: CodeFigureProps) => {
  const figureRef = useRef<HTMLElement | null>(null);
  const isPrettyCodeFigure = 'data-rehype-pretty-code-figure' in rest;

  if (!isPrettyCodeFigure) {
    return (
      <figure className={className} {...rest}>
        {children}
      </figure>
    );
  }

  const hasTitle = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      ('data-rehype-pretty-code-title' in child.props ||
        'data-rehype-pretty-code-caption' in child.props),
  );

  return (
    <InsideCodeFigureContext.Provider value>
      <figure
        ref={figureRef}
        className={cn('relative group/code', className)}
        {...rest}
      >
        <CopyCodeButton
          getText={() => extractCodeText(figureRef.current)}
          className={cn(
            'absolute z-10',
            hasTitle ? 'right-3 top-[7px]' : 'right-2.5 top-2.5',
          )}
        />
        {children}
      </figure>
    </InsideCodeFigureContext.Provider>
  );
};

export const CodePre = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'pre'>) => {
  const isInsideFigure = useContext(InsideCodeFigureContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  if (isInsideFigure) {
    return (
      <pre className={className} {...rest}>
        {children}
      </pre>
    );
  }

  return (
    <div ref={wrapperRef} className='relative group/code my-6'>
      <CopyCodeButton
        getText={() => extractCodeText(wrapperRef.current)}
        className='absolute right-2.5 top-2.5 z-10'
      />
      <pre className={cn('!my-0', className)} {...rest}>
        {children}
      </pre>
    </div>
  );
};
