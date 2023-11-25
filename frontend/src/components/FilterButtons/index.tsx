import * as React from "react"
import { styled } from "@mui/material/styles"
import Chip from "@mui/material/Chip"
import { Box } from "@mui/material"

interface ChipData {
  key: number
  label: string
}

interface FilterButtonsProps {
  onFilterAdd: (label: string) => void
  onFilterRemove: (label: string) => void
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const FilterButtons: React.FC<FilterButtonProps>=({onFilterAdd,onFilterRemove})=> {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "State" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ])

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    onFilterRemove(chipToDelete.label);
  }

  const handleFilter = (chipToFilter: ChipData) => () => {
    const filteredItem = chipData.find((item) => item.key === chipToFilter.key)
    onFilterAdd(filteredItem?.label || '');
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
      {chipData.map((data) => {
        let icon

        return (
          <ListItem key={data.key}>
            <Chip
              color="primary" 
              variant="outlined"
              size="medium" 
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              onClick={handleFilter(data)}
            />
          </ListItem>
        )
      })}
    </Box>
  )
}

export default FilterButtons
