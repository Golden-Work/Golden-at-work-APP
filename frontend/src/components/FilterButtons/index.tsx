import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

interface ChipData {
  key: number;
  label: string;
}

export default function FilterButtons() {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleFilter = (chipToFilter: ChipData) => () => {
    const filteredItem = chipData.find((item) => item.key === chipToFilter.key);
    console.log(filteredItem);
  };
  

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

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
        let icon;

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              onClick={handleFilter(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
