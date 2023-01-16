import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  registerInventory,
  searchProducts,
} from "../../http/cash-manager.api";
import { validateGreaterThanZero } from "../../validators";
import InputGroup from "../InputGroup";
import { InputGroupScan } from "../InputGroupScan/index";
import { Button } from "react-native-paper";
import { setProducts } from "../../stores/reducers/productsReducer";
import { useAlert } from "../../hooks/alert";

export function InventoryManager({}) {
  const dispatch = useDispatch();
  const { alert, setAlert, component: Snackbar } = useAlert();
  const currentUser = useSelector((state) => state.currentUser.value);
  const [ref, setRef] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  const [price, setPrice] = useState({
    isError: true,
    value: 0,
    errors: validateGreaterThanZero("price", 0).errors,
  });

  const [quantity, setQuantity] = useState({
    isError: true,
    value: 0,
    errors: validateGreaterThanZero("quantity", 0).errors,
  });

  useEffect(() => {
    if (currentUser) {
      searchProducts(currentUser.accessToken, ref).then((data) => {
        if (data.length) {
          setCurrentProduct(data[0]);
        }
      });
    }
  }, [ref, currentUser]);

  const handleCloseAlert = () => {
    setAlert({
      toggled: false,
      message: "",
      severity: "error",
    });
  };

  const handleSubmit = async () => {
    let message = "";
    let severity = "error";
    try {
      if (currentUser && currentProduct) {
        const data = {
          user: currentUser.user,
          products: [
            {
              id: currentProduct.id,
              quantity: parseFloat(quantity.value),
              price: parseFloat(price.value),
            },
          ],
        };
        await registerInventory(data, currentUser.accessToken);
        const updatedProducts = await getProducts(currentUser.accessToken);
        dispatch(setProducts(updatedProducts));
        message = "Inventory registered with success";
        severity = "success";
      } else {
        throw new Error(
          "current user must be set to perform authenticated http request"
        );
      }
    } catch (error) {
      console.log(error);
      message =
        "An unexpected error has been encountered, please try again later or contact tour administrator";
    } finally {
      setAlert({
        toggled: true,
        message,
        severity,
      });
    }
  };

  return (
    <>
      <ScrollView
        style={{
          width: "100%",
          padding: 24,
          height: "100%",
          backgroundColor: "#FFF",
        }}
      >
        <InputGroupScan
          label={"ref"}
          isError={false}
          errors={[]}
          value={ref}
          onInputOrScannedData={setRef}
        />
        {currentProduct ? (
          <>
            <InputGroup
              label={"Label"}
              value={currentProduct.label}
              disabled={true}
            />
            <InputGroup
              label={"Description"}
              value={currentProduct.description}
              disabled={true}
              multiline={true}
              numberOfLines={10}
            />
            <InputGroup
              label={"Quantity"}
              isError={quantity.isError}
              errors={quantity.errors}
              value={`${quantity.value}`}
              handleInput={(quantity) => {
                const quantityValidations = validateGreaterThanZero(
                  "quantity",
                  quantity
                );
                setQuantity({
                  isError: !quantityValidations.isValid,
                  value: quantity,
                  errors: quantityValidations.errors,
                });
              }}
            />

            <InputGroup
              label={"Price paid"}
              isError={price.isError}
              errors={price.errors}
              value={`${price.value}`}
              handleInput={(price) => {
                const priceValidations = validateGreaterThanZero(
                  "price",
                  price
                );
                setPrice({
                  isError: !priceValidations.isValid,
                  value: price,
                  errors: priceValidations.errors,
                });
              }}
            />

            <Button
              disabled={quantity.isError || price.isError}
              mode="contained"
              onPress={handleSubmit}
              style={{
                marginBottom: 48,
              }}
            >
              ok
            </Button>
          </>
        ) : null}
      </ScrollView>

      <Snackbar
        onClose={handleCloseAlert}
        toggled={alert.toggled}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
}
