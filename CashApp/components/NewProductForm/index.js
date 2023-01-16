import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  validateGreaterThanZero,
  validateRequired,
} from "../../validators/index";
import InputGroup from "../InputGroup/index";
import { useAlert } from "../../hooks/alert";
import { PaperSelect } from "react-native-paper-select";
import { InputGroupScan } from "../InputGroupScan";
import { PhotoGalleryEditor } from "../PhotoGalleryEditor";
import {
  getProducts,
  linkMedias,
  registerInventory,
  registerProduct,
  unlinkMedias,
  updateProduct,
  updateProductPrice,
  uploadFile,
} from "../../http/cash-manager.api";
import { setProducts } from "../../stores/reducers/productsReducer";
import { env } from "../../env";

const NewProductForm = ({ product = null }) => {
  const dispatch = useDispatch();

  const { alert, setAlert, component: Snackbar } = useAlert();

  const currentUser = useSelector((state) => state.currentUser.value);
  const productCategories = useSelector(
    (state) => state.productCategories.value
  );
  const productsUnits = useSelector((state) => state.productsUnits.value);
  const products = useSelector((state) => state.products.value);
  const [currentProductPhotos, setCurrentProductPhotos] = React.useState([]);

  const [currentProductCategory, setCurrentProductCategory] =
    React.useState(null);

  const [currentProductUnit, setCurrentProductUnit] = React.useState(null);

  const [quantity, setQuantity] = React.useState({
    isError: true,
    value: product ? product.currentStock : 0,
    errors: validateGreaterThanZero("quantity", "").errors,
  });

  const [price, setPrice] = React.useState({
    isError: true,
    value: product ? product.currentPrice?.price || 0 : 0,
    errors: validateGreaterThanZero("price", "").errors,
  });

  const [description, setDescription] = React.useState({
    isError: true,
    value: product ? product.description : "",
    errors: validateRequired("description", "").errors,
  });

  const [ref, setRef] = React.useState({
    isError: true,
    value: product ? product.ref : "",
    errors: validateRequired("ref", "").errors,
  });
  const [label, setLabel] = React.useState({
    isError: true,
    value: product ? product.label : "",
    errors: validateRequired("label", "").errors,
  });

  const [category, setCategory] = React.useState({
    isError: true,
    value: "",
    errors: validateRequired("category", "").errors,
    selectedList: [],
  });

  const [unit, setUnit] = React.useState({
    isError: true,
    value: currentProductUnit?.label || "",
    errors: validateRequired("unit", currentProductUnit?.label || "").errors,
    selectedList: currentProductUnit ? [currentProductUnit] : [],
  });

  React.useEffect(() => {
    if (product) {
      setCurrentProductCategory(
        productCategories.find((category) => product.category === category._id)
      );
      setCurrentProductUnit(
        productsUnits.find((unit) => product.unit === unit._id)
      );
    }
  }, [product, productCategories, productsUnits]);

  React.useEffect(() => {
    if (product) {
      setCurrentProductPhotos(
        product.medias.map((media) => ({
          url: media.medias[0].path,
          uploaded: true,
        }))
      );

      const descriptionValidation = validateRequired(
        "ref",
        product.description
      );
      setDescription({
        isError: !descriptionValidation.isValid,
        value: product ? product.description : "",
        errors: descriptionValidation.errors,
      });

      const labelValidation = validateRequired("label", product.label);
      setLabel({
        isError: !labelValidation.isValid,
        value: product ? product.label : "",
        errors: labelValidation.errors,
      });

      const refValidation = validateRequired("ref", product.ref);
      setRef({
        isError: !refValidation.isValid,
        value: product ? product.ref : "",
        errors: refValidation.errors,
      });

      const priceValidation = validateGreaterThanZero(
        "price",
        product.currentPrice?.price || 0
      );
      setPrice({
        isError: !priceValidation.isValid,
        value: product ? product.currentPrice?.price || 0 : 0,
        errors: priceValidation.errors,
      });

      const quantityValidation = validateGreaterThanZero(
        "quantity",
        product.currentStock
      );
      setQuantity({
        isError: !quantityValidation.isValid,
        value: product ? product.currentStock : 0,
        errors: quantityValidation.errors,
      });
    }
  }, [product]);

  React.useEffect(() => {
    const { errors, isValid } = validateRequired(
      "category",
      currentProductCategory?.label || ""
    );
    setCategory({
      isError: !isValid,
      value: currentProductCategory?.label || "",
      errors,
      selectedList: currentProductCategory ? [currentProductCategory] : [],
    });
  }, [currentProductCategory]);

  React.useEffect(() => {
    const { errors, isValid } = validateRequired(
      "unit",
      currentProductUnit?.label || ""
    );
    setUnit({
      isError: !isValid,
      value: currentProductUnit?.label || "",
      errors,
      selectedList: currentProductUnit ? [currentProductUnit] : [],
    });
  }, [currentProductUnit]);

  // const updateProductMedias = async (
  //   product = null,
  //   currentProductPhotos = [],
  //   currentUser = null
  // ) => {
  //   if (product && currentUser) {
  //     const initialMedias = product.medias.map(
  //       (media) => media.medias[0] // {path: string, id: string ...}
  //     );
  //     // upload new files
  //     const newMedias = currentProductPhotos.filter(
  //       (productPhoto) => !productPhoto.uploaded && productPhoto.url
  //     );

  //     // find media to unlink aka all medias in initialMedias which have changed
  //     const mediaIdsToUnlink = [];
  //     for (let index = 0; index < initialMedias.length; index++) {
  //       if (
  //         currentProductPhotos[index].url &&
  //         initialMedias[index].path !== currentProductPhotos[index].url
  //       ) {
  //         mediaIdsToUnlink.push(initialMedias[index].id);
  //       }
  //     }

  //     const newMediaIds = [];
  //     for (const media of newMedias) {
  //       await uploadFile(media.url, currentUser.accessToken).then((media) => {
  //         newMediaIds.push(media.id);
  //       });
  //     }
  //     // unlink necesseray media from product
  //     await unlinkMedias(product.id, mediaIdsToUnlink, currentUser.accessToken);

  //     // link newMedias
  //     await linkMedias(product.id, newMediaIds, currentUser.accessToken);
  //   }
  // };

  const handleSubmit = async () => {
    let message = "";
    let severity = "error";
    const productData = {
      ref: ref.value,
      label: label.value,
      description: description.value,
      category: productCategories.find(
        (productCategory) => productCategory.label === category.value
      ).id,
      unit: productsUnits.find(
        (productUnit) => productUnit.label === unit.value
      )._id,
    };

    try {
      if (currentUser) {
        let updatedProduct = null;
        if (product) {
          updatedProduct = await updateProduct(
            product.id,
            productData,
            currentUser.accessToken
          );
          message = "Changes regsitered with success";
          severity = "success";
        } else {
          updatedProduct = await registerProduct(
            productData,
            currentUser.accessToken
          );
          message = "Product registered with success";
          severity = "success";
        }

        // price
        await updateProductPrice(
          updatedProduct.id,
          parseFloat(price.value),
          currentUser.accessToken
        );

        // stocks onnly on creation of product
        if (!product) {
          await registerInventory(
            {
              user: currentUser.user,
              products: [
                {
                  id: updatedProduct.id,
                  quantity: parseFloat(quantity.value),
                },
              ],
            },
            currentUser.accessToken
          );
        }

        // medias
        // await updateProductMedias(
        //   updatedProduct,
        //   currentProductPhotos,
        //   currentUser
        // );

        const updatedProducts = await getProducts(currentUser.accessToken);
        dispatch(setProducts(updatedProducts));
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

  const handleUnit = (unit, selectedList = []) => {
    const { isValid: unitIsValid, errors: unitValidationsErrors } =
      validateRequired("unit", unit);
    setUnit({
      isError: !unitIsValid,
      value: unit,
      errors: unitValidationsErrors,
      selectedList,
    });
  };

  const handleCategory = (category, selectedList = []) => {
    const { isValid: categoryIsValid, errors: categoryValidationsErrors } =
      validateRequired("category", category);
    setCategory({
      isError: !categoryIsValid,
      value: category,
      errors: categoryValidationsErrors,
      selectedList,
    });
  };

  const handleRef = (ref) => {
    const { isValid: refIsValid, errors: refValidationsErrors } =
      validateRequired("ref", ref);
    setRef({
      isError: !refIsValid,
      value: ref,
      errors: refValidationsErrors,
    });
  };

  const handleLabel = (label) => {
    const { isValid: labelIsValid, errors: labelValidationsErrors } =
      validateRequired("label", label);
    setLabel({
      isError: !labelIsValid,
      value: label,
      errors: labelValidationsErrors,
    });
  };

  const handlePrice = (price) => {
    const { isValid: priceIsValid, errors: priceValidationsErrors } =
      validateGreaterThanZero("price", price);
    setPrice({
      isError: !priceIsValid,
      value: price,
      errors: priceValidationsErrors,
    });
  };

  const handleQuantity = (quantity) => {
    const { isValid: quantityIsValid, errors: quantityValidationsErrors } =
      validateGreaterThanZero("quantity", quantity);
    setQuantity({
      isError: !quantityIsValid,
      value: quantity,
      errors: quantityValidationsErrors,
    });
  };

  const handleDescription = (description) => {
    const {
      isValid: descriptionIsValid,
      errors: descriptionValidationsErrors,
    } = validateRequired("description", description);
    setDescription({
      isError: !descriptionIsValid,
      value: description,
      errors: descriptionValidationsErrors,
    });
  };

  const handleCloseAlert = () => {
    setAlert({
      toggled: false,
      message: "",
      severity: "error",
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header} variant="headlineMedium">
          {product ? "Update product" : "Product details"}
        </Text>

        <InputGroup
          label={"label"}
          isError={label.isError}
          errors={label.errors}
          value={label.value}
          handleInput={(label) => handleLabel(label)}
        />

        <InputGroup
          label={"Price"}
          isError={price.isError}
          errors={price.errors}
          value={`${price.value}`}
          handleInput={(price) => handlePrice(price)}
        />

        {!product ? (
          <InputGroup
            label={"Quantity"}
            isError={quantity.isError}
            errors={quantity.errors}
            value={`${quantity.value}`}
            handleInput={(quantity) => handleQuantity(quantity)}
          />
        ) : null}

        <InputGroupScan
          label={"ref"}
          isError={ref.isError}
          errors={ref.errors}
          value={ref.value}
          onInputOrScannedData={(ref) => handleRef(ref)}
        />

        <PaperSelect
          label="Select category"
          value={category.value}
          onSelection={(value) =>
            handleCategory(value.text, value.selectedList)
          }
          arrayList={
            productCategories && productCategories.length
              ? productCategories.map((productCategory) => {
                  return {
                    _id: productCategory._id,
                    value: productCategory.label,
                  };
                })
              : []
          }
          selectedArrayList={category.selectedList}
          errorText={""}
          multiEnable={false}
          textInputMode="flat"
          hideSearchBox={true}
        />

        <PaperSelect
          label="Select unit"
          value={unit.value}
          onSelection={(value) => handleUnit(value.text, value.selectedList)}
          arrayList={
            productsUnits && productsUnits.length
              ? productsUnits.map((productunit) => {
                  return {
                    _id: productunit._id,
                    value: productunit.label,
                  };
                })
              : []
          }
          selectedArrayList={unit.selectedList}
          errorText={""}
          multiEnable={false}
          textInputMode="flat"
          hideSearchBox={true}
        />

        <InputGroup
          label={"Description"}
          isError={description.isError}
          errors={description.errors}
          value={description.value}
          handleInput={(description) => handleDescription(description)}
          multiline={true}
          numberOfLines={10}
        />

        <PhotoGalleryEditor
          photos={currentProductPhotos.map((currentPhoto) => ({
            ...currentPhoto,
            url: currentPhoto.uploaded
              ? env.ASSETS_ROOT_PATH + "/" + currentPhoto.url
              : currentPhoto.url,
          }))}
          setPhotos={setCurrentProductPhotos}
          max={3}
        />

        <Button
          disabled={
            label.isError ||
            ref.isError ||
            description.isError ||
            category.isError ||
            unit.isError
          }
          mode="contained"
          onPress={handleSubmit}
          style={{
            marginBottom: 48,
          }}
        >
          ok
        </Button>
      </ScrollView>

      <Snackbar
        onClose={handleCloseAlert}
        toggled={alert.toggled}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  container: {
    width: "100%",
    padding: 24,
    height: "100%",
    backgroundColor: "#FFF",
  },
});

export default NewProductForm;
