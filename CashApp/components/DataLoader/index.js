import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategories,
  getProducts,
  getTickets,
} from "../../http/cash-manager.api";
import { setProductCategories } from "../../stores/reducers/productCategoriesReducer";
import { setProducts } from "../../stores/reducers/productsReducer";
import { setTickets } from "../../stores/reducers/ticketsReducer";

const DataLoader = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.value);

  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      getProducts(currentUser.accessToken).then((data) => {
        dispatch(setProducts(data));
      });
      getTickets(currentUser.accessToken).then((data) => {
        dispatch(setTickets(data));
      });
      getProductCategories(currentUser.accessToken).then((data) => {
        dispatch(setProductCategories(data));
      });
    }
  }, [currentUser]);

  return props.children;
};

export default DataLoader;
