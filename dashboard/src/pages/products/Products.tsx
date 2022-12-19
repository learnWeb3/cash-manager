import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import Admin from "../../services/api/admin.service";
import {
  fetchProductCategories,
  fetchProducts,
} from "../../store/actions/AdminAction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { Box, Typography, Link, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";
import CheckboxGroup, {
  Filter,
} from "../../components/ProductCategoriesFIlters/index";

export default function Products() {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState([] as Filter[]);

  useEffect(() => {
    console.log(filters, "filters");
  }, [filters]);

  const productCategories = useAppSelector(
    ({ productCategories }) => productCategories.productCategories
  );
  const products = useAppSelector(({ products }) =>
    products.products.map(({ currentPrice, ...rest }) => {
      return {
        ...rest,
        price: currentPrice.price,
      };
    })
  );

  useEffect(() => {
    if (productCategories && productCategories.length) {
      const newFilters = productCategories.map(({ id, label }) => ({
        id,
        label,
        value: id,
        checked: true,
      }));
      setFilters(newFilters as any);
    }
  }, [productCategories]);

  useEffect(() => {
    Admin.getProductCategories().then((data: any) => {
      dispatch(fetchProductCategories(data));
      Admin.getProducts(0).then((data: any) => {
        dispatch(fetchProducts(data));
      });
    });
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "unit", headerName: "Unit", flex: 1 },
    { field: "label", headerName: "Label", flex: 1 },
    { field: "currentStock", headerName: "Current Stock", flex: 1 },
    {
      field: "price",
      flex: 1,
      headerName: "Price",
    },
  ];

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Products
    </Link>,
    <Typography key="2" color="text.primary"></Typography>,
  ];

  return (
    <Box
      sx={{
        padding: "2rem",
        width: "100%",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <h2>Products</h2>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ marginBottom: "1rem" }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      <Grid container spacing={0}>
        <Grid item xs={12}>
          <CheckboxGroup
            label="Filter by product category"
            filters={filters}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper
            style={{
              height: 400,
              width: "100%",
              padding: "2rem",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>

            <DataGrid
              rows={products.filter((product) => {
                return filters.find(
                  (filter) => filter.id === product.category && filter.checked
                );
              })}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection={false}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
