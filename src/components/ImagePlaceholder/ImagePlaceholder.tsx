import { Box, Flex, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import styles from './ImagePlaceholder.module.scss'
export const ImagePlaceholder = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Flex
      align="center"
      justify="center"
      h={200}
      bg={colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]}
    >
      <Box
        className={styles.imagePlaceholder}
      />
    </Flex>
  );
};