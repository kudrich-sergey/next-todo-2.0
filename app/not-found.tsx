import Link from "next/link";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <>
      <div className={styles.container}> </div>
      <h1 className={styles.title}>Ошибка!</h1>
      <span className={styles.description}>
        Страница не найдена. Видимо она не существует, либо указана неверная
        ссылка.
      </span>
      <Link href="/" className={styles.redirect}>
        На главную страницу
      </Link>
    </>
  );
}
