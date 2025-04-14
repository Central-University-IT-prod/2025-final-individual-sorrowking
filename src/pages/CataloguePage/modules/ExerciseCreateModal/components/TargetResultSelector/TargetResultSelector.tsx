import { TargetResult } from "@/shared/types/types";
import { targetResultLabels } from "../../constants";
import styles from './TargetResultSelector.module.scss'

interface TargetResultSelectorProps {
  selectedResult: TargetResult[];
  onChange: (selected: TargetResult[]) => void;
}

export const TargetResultSelector: React.FC<TargetResultSelectorProps> = ({ selectedResult, onChange }) => (
  <div className={styles.targetResultSelector}>
    {(Object.keys(targetResultLabels) as TargetResult[]).map((result) => (
      <button
        key={result}
        type="button"
        className={`${styles.targetResultSelector__button} ${
          selectedResult.includes(result) ? styles['targetResultSelector__button--active'] : ''
        }`}
        onClick={() => 
          onChange(
            selectedResult.includes(result)
              ? selectedResult.filter((item) => item !== result)
              : [...selectedResult, result]
          )
        }
      >
        {targetResultLabels[result]}
      </button>
    ))}
  </div>
);
