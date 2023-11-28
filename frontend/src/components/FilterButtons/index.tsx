import * as React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { Box } from "@mui/material"

import { useTranslation } from "react-i18next"
interface FilterButtonProps {
  onFilterChange: (labels: string[]) => void
}

const FilterButtons: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])
  const { t } = useTranslation()
  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilters: string[]
  ) => {
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        height: 50,
      }}
      component="ul"
    >
      <ToggleButtonGroup
        value={selectedFilters}
        onChange={handleFilterChange}
        sx={{ border: "1px solid #ced4da", borderRadius: "5px" }}
      >
        {["Disponible", "Varios Carnets", "Pequeño", "Mediano", "Grande"].map(
          (label, index) => (
            <ToggleButton
              key={index}
              value={label}
              sx={{
                color: selectedFilters.includes(label) ? "#fff" : "#495057",
                backgroundColor: selectedFilters.includes(label)
                  ? "#007bff"
                  : "#fff",
              }}
            >
              {t(label)}
            </ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </Box>
  )
}

export default FilterButtons
