import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CodeFigure, CodePre } from '@/components/Atoms/code/CodeBlock';

describe('CodeBlock copy button', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    writeTextMock.mockClear();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
  });

  it('copies multi-line pretty-code lines cleanly without blank-line spaces', async () => {
    render(
      <CodeFigure data-rehype-pretty-code-figure=''>
        <figcaption data-rehype-pretty-code-title=''>~/.ssh/config</figcaption>
        <CodePre>
          <code>
            <span data-line=''>Host ihsanmuh</span>
            {'\n'}
            <span data-line=''> </span>
            {'\n'}
            <span data-line=''> User ihsanmuh</span>
          </code>
        </CodePre>
      </CodeFigure>,
    );

    const buttons = screen.getAllByRole('button', { name: /copy code/i });
    expect(buttons).toHaveLength(1);

    fireEvent.click(buttons[0]!);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        'Host ihsanmuh\n\n User ihsanmuh',
      );
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('renders copy button for standalone pre blocks', async () => {
    render(
      <CodePre>
        <code>sudo apt install nginx</code>
      </CodePre>,
    );

    const button = screen.getByRole('button', { name: /copy code/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('sudo apt install nginx');
    });
  });
});
