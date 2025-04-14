
interface FilterState {
  searchTerm: string;
  selectedDifficulty: string;
  selectedEquipments: string[];
  selectedTags: string[];
}

interface FilterHandlers {
  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onEquipmentsChange: (value: string[]) => void;
  onTagsChange: (value: string[]) => void;
}

interface Option {
  value: string;
  label: string;
}

interface FilterBarProps {
  filterState: FilterState;
  filterHandlers: FilterHandlers;
  allTags: Option[],
  allEquipment: Option[]
}

export type {FilterBarProps}