import { COLOR_CONSTANTS } from "./color-constants";
import styles from "./color-picker.module.scss";

interface ColorPickerProps {
  selected: { id: number; color: string; background: string };
  onSelected: ({
    id,
    color,
    background,
  }: {
    id: number;
    color: string;
    background: string;
  }) => void;
}

export const ColorPicker = ({ selected, onSelected }: ColorPickerProps) => {
  return (
    <>
      <span className={styles.title}>Цвет заголовка</span>
      <div className={styles.colors}>
        {COLOR_CONSTANTS.map((item) => (
          <div
            key={item.id}
            className={styles.outline}
            style={
              selected.id === item.id ? { borderColor: `${item.color}` } : {}
            }
            onClick={() => onSelected(item)}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: `${item.color}` }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};
