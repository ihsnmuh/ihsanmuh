import { useQuery } from "@tanstack/react-query";
import React from "react";

const Blog = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3004/products?_limit=3");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.info(data, "<<");
  console.info(isError, "<<");
  console.info(isLoading, "<<");
  return <div className="h1 mt-16">Blog</div>;
};

export default Blog;
