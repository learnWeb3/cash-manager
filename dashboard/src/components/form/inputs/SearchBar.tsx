import { Search } from "@mui/icons-material";
import { IconButton, OutlinedInput } from "@mui/material";
import { ChangeEvent } from "react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onCancel: () => void;
}

export default function SearchBar(props: SearchBarProps) {
	return (
		<div style={{paddingBottom: "20px"}}>
			<OutlinedInput
				id="search-bar"
				className="text"
				onInput={(event: ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
				placeholder="Search..."
				size="small"
				sx={{
					backgroundColor: "white",
					borderRadius: "9px",
					border: "none",
					height: 45,
					width: { xs: 280, md: 360 }
				}}
			/>
			<IconButton type="submit" aria-label="search">
				<Search style={{ fill: "blue" }} />
			</IconButton>
		</div>
	)
};
