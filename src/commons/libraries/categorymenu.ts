import React, { useState } from "react";

export default function CategoryMenu() {
  const categories = [
    "전체 OR 추천",
    "여행",
    "패션",
    "뷰티",
    "푸드",
    "IT테크",
    "자동차",
    "리빙",
    "육아",
    "생활건강",
    "게임",
    "동물.펫",
    "운동.레저",
    "프로스포츠",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return
}
