import { useEffect, useState } from 'react';
import { OptionType } from '@/shared/custom/customSelect';

export const useSelectHandlers = (allEquipment: OptionType[], allTags: OptionType[], initialEquipment?: string[], initialTags?: string[]) => {
  const [equipment, setEquipment] = useState<string[]>(initialEquipment || []);
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [equipmentOptions, setEquipmentOptions] = useState<OptionType[]>(allEquipment);
  const [tagOptions, setTagOptions] = useState<OptionType[]>(allTags);
  const reset = () => {
    setEquipment([])
    setTags([])
  }

  useEffect(() => {
    setEquipment(initialEquipment || []);
  }, [initialEquipment]);

  useEffect(() => {
    setTags(initialTags || []);
  }, [initialTags]);

  
  const handleEquipmentChange = (selected: readonly OptionType[]) => {
    const selectedEquip = selected.map(option => option.value);
    if (selectedEquip.includes("без оборудования")) {
      setEquipment(["без оборудования"]);
    } else {
      setEquipment(selected.map(option => option.value));
    }
  };

  const handleTagsChange = (selected: readonly OptionType[]) => {
    setTags(selected.map(option => option.value));
  };

  const handleCreateEquipment = (newValue: string) => {
    const newOption: OptionType = { value: newValue, label: newValue };
    setEquipmentOptions(prev => [...(prev || []), newOption]);
    setEquipment(prev => [...(prev || []), newValue]);
  };

  const handleCreateTag = (newValue: string) => {
    const newOption: OptionType = { value: newValue, label: newValue };
    setTagOptions(prev => [...(prev || []), newOption]); 
    setTags(prev => [...(prev || []), newValue]);
  };
  return {
    equipment,
    tags,
    equipmentOptions,
    tagOptions,
    handleEquipmentChange,
    handleTagsChange,
    handleCreateEquipment,
    handleCreateTag,
    reset
  };
};