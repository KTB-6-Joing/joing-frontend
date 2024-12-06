import React from "react";
import styled from "styled-components";
import categories from "../../data/categories";

interface CategorySelectorProps {
    role: "CREATOR" | "PRODUCT_MANAGER";
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({role, selectedCategories, setSelectedCategories}) => {
    const isMultiple = (role === "PRODUCT_MANAGER");

    const handleCategoryClick = (category: string) => {
        if (isMultiple) {
            if (selectedCategories.includes(category)) {
                setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
            } else {
                setSelectedCategories([...selectedCategories, category]);
            }
        } else {
            setSelectedCategories([category]);
        }
    };

    return (
        <Category>
            {categories.map((category) => (
                <Type
                    type="button"
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    isSelected={selectedCategories.includes(category)}
                >
                    {category}
                </Type>
            ))}
        </Category>
    );
};

export default CategorySelector;

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.3rem;
`;

const Type = styled.button<{ isSelected: boolean }>`
    padding: 6px 10px;
    border: 1px solid ${({isSelected}) => (isSelected ? '#555' : '#ccc')};
    border-radius: 20px;
    background-color: ${({isSelected}) => (isSelected ? '#b6b6b6' : '#f9f9f9')};
    cursor: pointer;
    transition: background-color 0.1s, border-color 0.3s;
    font-size: 0.8rem;

    &:hover {
        background-color: #bdbdbd;
        border-color: #888;
    }

    &:focus {
        border-color: #555;
        outline: none;
    }
`;
