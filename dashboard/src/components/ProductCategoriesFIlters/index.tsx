import { Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";

export interface Filter {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}
export interface CheckboxGroupProps {
  label: string;
  filters: Filter[];
  setFilters: (filters: Filter[]) => any;
}
export default function CheckboxGroup(props: CheckboxGroupProps) {
  const handleChange = (id: string) => {
    const targetedFilterIndex = props.filters.findIndex(
      (filter) => filter.id === id
    );
    if (targetedFilterIndex > -1) {
      const allFilters = [...props.filters];
      const targetedFilter = allFilters[targetedFilterIndex];
      const updatedFilter = {
        ...targetedFilter,
        checked: !targetedFilter.checked,
      };
      allFilters.splice(targetedFilterIndex, 1, updatedFilter);
      props.setFilters(allFilters);
    }
  };

  return (
    <Paper
      style={{
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {props.label}
      </Typography>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {props.filters.map((filter, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onChange={() => handleChange(filter.id)}
                checked={filter.checked}
              />
            }
            label={filter.label}
          />
        ))}
      </div>
    </Paper>
  );
}
