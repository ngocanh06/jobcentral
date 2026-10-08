/**
 * Scroll Boundary Isolation Utility
 * Prevents scroll chaining (overscroll) from leaking to parent containers or the window.
 * When the user's cursor is over any scrollable element (dropdown, modal, sidebar, column, list),
 * scrolling only moves within that element and never scrolls the outer page when hitting top/bottom boundaries.
 */

export function initScrollBoundaryIsolation() {
  if (typeof window === 'undefined') return;

  // Wheel event listener with passive: false to allow preventDefault at boundaries
  window.addEventListener(
    'wheel',
    (e) => {
      let target = e.target;
      if (!target) return;

      // Find the nearest scrollable or isolated element under cursor
      let current = target;
      let scrollableContainer = null;
      let isStaticOverlay = false;

      while (current && current !== document.body && current !== document.documentElement) {
        if (current instanceof HTMLElement) {
          const style = window.getComputedStyle(current);
          const overflowY = style.overflowY;
          const overflowX = style.overflowX;

          const hasScrollY =
            (overflowY === 'auto' || overflowY === 'scroll' || current.classList.contains('overflow-y-auto')) &&
            current.scrollHeight > current.clientHeight;

          const hasScrollX =
            (overflowX === 'auto' || overflowX === 'scroll' || current.classList.contains('overflow-x-auto')) &&
            current.scrollWidth > current.clientWidth;

          const isMenuOrModal =
            current.getAttribute('role') === 'listbox' ||
            current.getAttribute('role') === 'menu' ||
            current.getAttribute('role') === 'dialog' ||
            current.id?.includes('menu') ||
            current.id?.includes('dropdown') ||
            current.id?.includes('modal');

          if (hasScrollY || hasScrollX) {
            scrollableContainer = {
              element: current,
              canY: hasScrollY,
              canX: hasScrollX,
            };
            break;
          }

          if (isMenuOrModal) {
            // Check if there's a scrollable child inside this menu/modal
            const scrollableChild = current.querySelector(
              '.overflow-y-auto, [class*="overflow-y-auto"], [class*="overflow-auto"]'
            );
            if (scrollableChild && scrollableChild.scrollHeight > scrollableChild.clientHeight) {
              scrollableContainer = {
                element: scrollableChild,
                canY: true,
                canX: false,
              };
              break;
            } else {
              isStaticOverlay = true;
              break;
            }
          }
        }
        current = current.parentElement;
      }

      // Cursor is on static page background, allow natural page scrolling
      if (!scrollableContainer) {
        if (isStaticOverlay) {
          // Cursor is on a static popup menu / overlay without scroll, prevent page background from scrolling
          e.preventDefault();
        }
        return;
      }

      const { element, canY, canX } = scrollableContainer;

      // Vertical scrolling check
      if (canY && Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const atTop = element.scrollTop <= 0;
        const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
        const atBottom = Math.ceil(element.scrollTop) >= maxScroll - 1;

        if (e.deltaY < 0) {
          // Scrolling UP
          if (atTop) {
            e.preventDefault();
            return;
          }
          if (element.scrollTop + e.deltaY < 0) {
            element.scrollTop = 0;
            e.preventDefault();
            return;
          }
        } else if (e.deltaY > 0) {
          // Scrolling DOWN
          if (atBottom) {
            e.preventDefault();
            return;
          }
          if (element.scrollTop + e.deltaY > maxScroll) {
            element.scrollTop = maxScroll;
            e.preventDefault();
            return;
          }
        }
        return;
      }

      // Horizontal scrolling check
      if (canX && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const atLeft = element.scrollLeft <= 0;
        const maxScrollX = Math.max(0, element.scrollWidth - element.clientWidth);
        const atRight = Math.ceil(element.scrollLeft) >= maxScrollX - 1;

        if (e.deltaX < 0) {
          // Scrolling LEFT
          if (atLeft) {
            e.preventDefault();
            return;
          }
          if (element.scrollLeft + e.deltaX < 0) {
            element.scrollLeft = 0;
            e.preventDefault();
            return;
          }
        } else if (e.deltaX > 0) {
          // Scrolling RIGHT
          if (atRight) {
            e.preventDefault();
            return;
          }
          if (element.scrollLeft + e.deltaX > maxScrollX) {
            element.scrollLeft = maxScrollX;
            e.preventDefault();
            return;
          }
        }
        return;
      }
    },
    { passive: false }
  );
}
