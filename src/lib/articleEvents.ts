export const ARTICLE_FINISHED_EVENT = 'article:finished';

/**
 * Announces that the reader reached the end of the article, so nearby UI (like the Like button)
 * can react. Safe to call anywhere on the client.
 */
export const emitArticleFinished = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ARTICLE_FINISHED_EVENT));
};
