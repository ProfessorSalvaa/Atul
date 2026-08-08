import styles from "./SkipLink.module.css";

/** Standard a11y skip-link — first focusable element on every page,
 *  invisible until focused, jumps past nav chrome straight to #main-content. */
export function SkipLink() {
  return (
    <a href="#main-content" className={styles.link}>
      Skip to content
    </a>
  );
}
