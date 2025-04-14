import { TargetResult } from "@/shared/types/types";
import styles from './AverageValuesInput.module.scss'
import { targetResultIcons, targetResultLabels } from "../../constants";
import { getUnit } from "@/shared/utils/trainingHelpers";
import { Flex, NumberInput, Slider } from "@mantine/core";
import { Text } from "@mantine/core";

interface AverageValuesInputProps {
  targetResult: TargetResult[];
  values: Partial<Record<TargetResult, number>>;
  stableValues: Partial<Record<TargetResult, number>> | undefined;
  onChange: (values: Partial<Record<TargetResult, number>>) => void;
}

export const AverageValuesInput: React.FC<AverageValuesInputProps> = ({ targetResult, values, onChange, stableValues }) => (
  <div className={styles.averageValues}>
    <Text my={10}>Стандартные значения</Text>
    <div className={styles.averageValues__params}>
      {targetResult.map((param) => {
        const IconComponent = targetResultIcons[param];
        const max = (stableValues?.[param] ?? 40) * 5;
        const step = param === 'weight' ? 0.5 : 1;
        const unit = getUnit(param);
        return (
          <div key={param} className={styles.averageValues__param}>
            <div className={styles.averageValues__inputHeader}>
              <IconComponent size={20} className={styles.averageValues__icon} />
              <span className={styles.averageValues__label}>
                {targetResultLabels[param]}
              </span>
            </div>

            <Flex gap="sm" align="center" direction="column" w="100%">
              <NumberInput
                value={values[param] || 0}
                onChange={(value) => onChange({ ...values, [param]: Number(value) })}
                min={1}
                max={max}
                step={step}
                suffix={unit}
                clampBehavior={stableValues ? 'strict' : 'none'}
                decimalScale={step === 0.5 ? 1 : 0}
                allowNegative={false}
                w="100%"
                aria-label="выбрать значение параметра (текстовый ввод)"
              />
              
              <Slider
                value={values[param] || 0}
                onChange={(value) => onChange({ ...values, [param]: value })}
                min={1}
                max={max}
                step={step}
                label={(val) => `${val}${unit ? ` ${unit}` : ''}`}
                marks={[
                  { value: 1, label: '1' },
                  { value: max, label: `${max}` }
                ]}
                w="95%"
                mx="auto"
                thumbLabel="выбрать значение параметра"

              />
            </Flex>
          </div>
        );
      })}
    </div>
  </div>
);
