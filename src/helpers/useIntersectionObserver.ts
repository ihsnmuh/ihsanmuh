import { useEffect, useRef } from 'react';

//* Define types for the heading element and intersection observer entry
interface IHeadingElement extends Element {
  id: string;
}

interface IntersectionObserverEntryWithId extends IntersectionObserverEntry {
  target: IHeadingElement;
}

type TSetActiveId = (id: string) => void;

const useIntersectionObserver = (setActiveId: TSetActiveId) => {
  //* Define the reference type as a dictionary of IntersectionObserverEntry objects
  const headingElementsRef = useRef<
    Record<string, IntersectionObserverEntryWithId>
  >({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntryWithId[]) => {
      //* Update the reference with current headings being observed
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      //* Collect visible headings
      const visibleHeadings: IntersectionObserverEntryWithId[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      //* Helper function to get the index of a heading in the document
      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1,
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    //* Create a new intersection observer
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-110px 0px -40% 0px',
    });

    //* Select heading elements to observe (h2 and h3)
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3'),
    ) as IHeadingElement[];
    headingElements.forEach((element) => observer.observe(element));

    //* Cleanup the observer on unmount
    return () => observer.disconnect();
  }, []);
};

export default useIntersectionObserver;
