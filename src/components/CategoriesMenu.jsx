"use client";

import { useState } from "react";
import "./CategoriesMenu.css";
import { ChevronDown } from 'lucide-react'

export default function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const categories = {
    Clothing: [
      "Women",
      "Men",
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets & Coats",
      "Knitwear",
    ],
    Accessories: [
      "Bags",
      "Shoes",
      "Jewelry",
      "Belts",
      "Hats",
      "Sunglasses",
    ],
    Other: [
      "Vintage",
      "Designer",
      "Y2K",
      "Other",
    ],
  };

  const toggleCategory = (category) => {
    setOpenCategory(
      openCategory === category ? null : category
    );
  };

  return (
    <>
      {/* Categories button */}
      <button
        className="categories-btn"
        onClick={() => setIsOpen(true)}
      >
        Categories
      </button>

      {/* Overlay */}
      <div
        className={`categories-overlay ${
          isOpen ? "show" : ""
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side menu */}
      <aside
        className={`categories-menu ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="categories-header">
          <h2>Categories</h2>

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close categories"
          >
        
          </button>
        </div>

        <div className="categories-list">
          {Object.entries(categories).map(
            ([category, items]) => (
              <div
                className="category"
                key={category}
              >
                <button
                  className="category-title"
                  onClick={() =>
                    toggleCategory(category)
                  }
                >
                  <span>{category}</span>

                  <span
                    className={`arrow ${
                      openCategory === category
                        ? "rotate"
                        : ""
                    }`}
                  >
                    <ChevronDown className="navbar-select-arrow" />
                  </span>
                </button>

                <div
                  className={`category-items ${
                    openCategory === category
                      ? "visible"
                      : ""
                  }`}
                >
                  {items.map((item) => (
                    <a href="#" key={item}>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </aside>
    </>
  );
}