import { CATEGORIES, CATEGORY_ICONS } from '../data/attractions';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div
      id="category-filter"
      className="flex gap-3 overflow-x-auto py-2 px-5 pb-4"
      style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-semibold
                        transition-all duration-200 active:scale-95
                        ${isActive
                          ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-sm'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                        }`}
            type="button"
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
