import { Tabs } from '@mantine/core';
import { IconPalette, IconShirt } from '@tabler/icons-react';

export const TabHeader = () => (
  <Tabs.List>
    <Tabs.Tab value="item" aria-label="предметы">
      <IconShirt size={30} stroke={1.5} aria-label="предметы"/>
    </Tabs.Tab>
    <Tabs.Tab value="color" aria-label="цвета">
      <IconPalette size={30} stroke={1.5} aria-label="цвета"/>
    </Tabs.Tab>
  </Tabs.List>
);
