import * as React from "react";
import {
  Paragraph,
  Text,
  Badge,
  Button,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import InputGroup from "../InputGroup/index";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const ProductCard = ({
  title,
  description,
  price,
  quantity,
  unit,
  taxRate,
  category,
  descriptionLength = 100,
  setQuantity = null,
  editable = false,
  deletable = false,
  detailViewable = false,
  onDetailClick = () => {},
  onDelete = () => {},
}) => {
  const productCategories = useSelector(
    (state) => state.productCategories.value
  );

  const [productCategory, setProductCategory] = React.useState(null);

  React.useEffect(() => {
    if (category && productCategories && productCategories.length) {
      setProductCategory(
        productCategories.find(
          (productCategory) => productCategory.id === category
        )
      );
    }
  }, [category, productCategories]);

  const formatDescription = (value) => {
    return descriptionLength > 0
      ? value.slice(0, descriptionLength) + "..."
      : value;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          marginBottom: 16,
        }}
      >
        <Text variant="titleMedium">{title}</Text>
        <Badge style={{ paddingLeft: 8, paddingRight: 8 }}>
          {productCategory?.label}
        </Badge>
      </View>
      <Paragraph>
        {description && description.length
          ? formatDescription(description)
          : "No description"}
      </Paragraph>
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {editable ? (
          <InputGroup
            handleInput={setQuantity}
            value={`${quantity}`}
            label={"quantity"}
            style={{ width: 100 }}
          />
        ) : (
          <View>
            <Text variant="labelMedium">Quantity</Text>
            <Badge
              size={36}
              style={{
                fontWeight: "bold",
                fontSize: 16,
                alignSelf: "flex-end",
                backgroundColor: "#FFFFFF",
                color: "#000",
              }}
            >
              {quantity}
            </Badge>
          </View>
        )}

        <View>
          <Text variant="labelMedium">Price / u</Text>
          <Badge
            size={36}
            style={{
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "flex-end",
              backgroundColor: "#FFFFFF",
              color: "#000",
            }}
          >
            {price} $ / {unit}
          </Badge>
        </View>
        <View>
          <Text variant="labelMedium">Total</Text>
          <Badge
            size={36}
            style={{
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "flex-end",
              backgroundColor: "#FFFFFF",
              color: "#000",
            }}
          >
            {`${price * quantity}`.slice(0, 4)} ${" "}
          </Badge>
        </View>
        {detailViewable ? (
          <View>
            <Button onPress={onDetailClick}>
              <Badge
                size={64}
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "flex-end",
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                }}
              >
                <Ionicons name={"pencil"} size={32} />
              </Badge>
            </Button>
          </View>
        ) : null}
        {deletable ? (
          <View>
            <Button onPress={onDelete}>
              <Badge
                size={64}
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "flex-end",
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                }}
              >
                <Ionicons name={"trash-outline"} size={32} color={"#f44336"} />
              </Badge>
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
});
