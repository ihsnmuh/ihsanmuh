import { useEffect, useState } from 'react';

// Define the interface for heading items
interface HeadingItem {
  id: string;
  title: string;
}

// Define the interface for nested headings
interface NestedHeading extends HeadingItem {
  items: HeadingItem[];
}

// Function to get nested headings
const getNestedHeadings = (headingElements: HTMLElement[]): NestedHeading[] => {
  const nestedHeadings: NestedHeading[] = [];

  headingElements.forEach((heading) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      const lastHeading = nestedHeadings[nestedHeadings.length - 1];
      if (lastHeading) {
        lastHeading.items.push({ id, title });
      }
    }
  });

  return nestedHeadings;
};

// Hook to use headings data
const useHeadingsData = (depsKey?: string) => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);

  useEffect(() => {
    const allHeadings = document.querySelectorAll('h2, h3');
    const headingElements = Array.from(allHeadings).filter((el) => {
      const element = el as HTMLElement;
      return (
        !element.hasAttribute('data-toc-exclude') &&
        !element.closest('[data-toc-exclude]')
      );
    }) as HTMLElement[];

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, [depsKey]);

  return { nestedHeadings };
};

export default useHeadingsData;
