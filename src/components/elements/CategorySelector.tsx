import React from "react";
import styled from "styled-components";
import categories from "../../data/categories";

interface CategorySelectorProps{
    selectedCategory: string;
    setSelectedCategory: (Category: string) => void;
    readOnly: boolean;
}

interface MultiCategorySelectorProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    readOnly: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({selectedCategory, setSelectedCategory, readOnly}) => {
    const handleCategoryClick = (category: string) => {
        if (!readOnly) {
            setSelectedCategory(category);
        }
    };

    return (
        <Category>
            {Object.values(categories).map((category) => (
                <Type
                    type="button"
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    isSelected={selectedCategory === category.id}
                    disabled={readOnly}
                >
                    {category.name}
                </Type>
            ))}
        </Category>
    );
};

export const MultiCategorySelector: React.FC<MultiCategorySelectorProps> = ({selectedCategories, setSelectedCategories, readOnly}) => {
    const handleCategoryClick = (category: string) => {
        if (!readOnly) {
            if (selectedCategories.includes(category)) {
                setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
            } else {
                setSelectedCategories([...selectedCategories, category]);
            }
        }
    };

    return (
        <Category>
            {Object.values(categories).map((category) => (
                <Type
                    type="button"
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    isSelected={selectedCategories.includes(category.id)}
                    disabled={readOnly}
                >
                    {category.name}
                </Type>
            ))}
        </Category>
    );
};

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.3rem;

    @media (max-width: 768px) {
        gap: 6px;
    }
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

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;
