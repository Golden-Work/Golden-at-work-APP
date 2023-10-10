import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material"

interface Props extends SelectProps {
  options: { value: string | number; label: string }[]
}

const GwSelect = ({ options, ...props }: Props) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select labelId={props.labelId} {...props}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default GwSelect
