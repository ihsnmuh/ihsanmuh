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
      nestedHeadings[nestedHeadings.length - 1].items.push({ id, title });
    }
  });

  return nestedHeadings;
};

// Hook to use headings data
const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3'),
    ) as HTMLElement[];

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

export default useHeadingsData;
