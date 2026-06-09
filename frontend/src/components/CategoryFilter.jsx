import { CATEGORIES, CATEGORY_ICONS } from '../data/attractions';

/**
 * Horizontally scrollable category filter chip bar.
 * Each chip is ≥ 48px tall for touch accessibility.
 */
export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div
      id="category-filter"
      className="flex gap-2 overflow-x-auto py-2 px-4 scrollbar-hide"
      style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`touch-target flex-shrink-0 flex items-center gap-2 
                        px-4 py-2.5 rounded-2xl font-medium text-sm
                        transition-all duration-300 active:scale-95
                        ${isActive
                          ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                        }`}
            type="button"
            aria-pressed={isActive}
          >
            <span className="text-base">{CATEGORY_ICONS[category]}</span>
            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
}
