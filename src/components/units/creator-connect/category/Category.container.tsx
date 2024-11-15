import React, { useState } from "react";
import styles from "./Category.module.css"
import type { RadioChangeEvent } from 'antd';
import { Radio, Tabs } from 'antd';


export default function Category() {
  const categories: string[] = [
    "전체",
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
    "동물·펫",
    "운동·레저",
    "프로스포츠",
  ];

  const [selectedCategory, setSelectedCategory] = useState("전체");
  
  return (
    <div className={styles.categoryMenuBox}>
        {/* <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{ height: 220 }}
        items={categories.map((category, i) => {
          const id = String(i);
          return {
            label: `${category}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      /> */}
        <div className={styles.categoryMenuListBox}>
            <div className={styles.categoryMenuList}>
                <ul className={styles.categoryMenu}>
                {
                categories.map((category) => (
                    <li key={category} className={selectedCategory === category ? "active" : ""}>
                        {category}
                    </li>
                ))
                }
                </ul>
            </div>
        </div>
    </div>
  );
}
