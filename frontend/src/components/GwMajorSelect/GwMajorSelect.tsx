import useMajors from "@/hooks/useMajors"
import GwSelect from "../GwSelect/GwSelect"
import { SelectProps } from "@mui/material"

const GwMajorSelect = (props: SelectProps) => {
  const { majorOptions } = useMajors()

  return (
    <GwSelect
      options={majorOptions}
      label="Carrera"
      labelId="major"
      name="major"
      {...props}
    />
  )
}

export default GwMajorSelect
