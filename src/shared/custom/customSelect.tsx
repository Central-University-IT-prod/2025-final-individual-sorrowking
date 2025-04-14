import { StylesConfig } from 'react-select';


interface OptionType {
  readonly value: string;
  readonly label: string;
}

// фиолетовая и оранжевая темы
export const purpleSelectStyles: StylesConfig<OptionType, true> = {
  multiValue: (base) => ({
    ...base,
    background: 'linear-gradient(145deg, #4f46e5, #8b5cf6)',
    borderRadius: '20px',
    alignItems: 'center',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
    fontWeight: 500,
    padding: 0,
    fontSize: '14px',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#e0e7ff',
    ':hover': {
      color: '#c7d2fe',
      backgroundColor: 'transparent',
    },
  }),
  control: (base, state) => ({
    ...base,
    borderRadius: '12px',
    borderColor: state.isFocused ? '#7c3aed' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #7c3aed' : 'none',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#7c3aed',
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected 
      ? 'linear-gradient(145deg, #4f46e5, #8b5cf6)' 
      : state.isFocused 
        ? '#f5f3ff' 
        : 'white',
    color: state.isSelected ? 'white' : '#1f2937',
    ':active': {
      background: '#4f46e5',
    },
    borderRadius: '8px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
  }),
};

export const orangeSelectStyles: StylesConfig<OptionType, true> = {
  multiValue: (base) => ({
    ...base,
    background: 'linear-gradient(145deg, #F59E0B, #F97316)',
    borderRadius: '20px',
    alignItems: 'center',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
    fontWeight: 500,
    padding: 0,
    fontSize: '14px',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#ffedd5',
    ':hover': {
      color: '#fed7aa',
      backgroundColor: 'transparent',
    },
  }),
  control: (base, state) => ({
    ...base,
    borderRadius: '12px',
    borderColor: state.isFocused ? '#EA580C' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #F97316' : 'none',
    transition: 'all 0.2s',
    ':hover': {
      borderColor: '#F97316',
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected 
      ? 'linear-gradient(145deg, #F59E0B, #F97316)' 
      : state.isFocused 
        ? '#fff7ed' 
        : 'white',
    color: state.isSelected ? 'white' : '#1f2937',
    ':active': {
      background: '#EA580C',
    },
    borderRadius: '8px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(249, 115, 22, 0.2)',
  }),
};


export type {OptionType}