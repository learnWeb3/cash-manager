import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Badge,
  Button,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { NFCManager } from "../NFCManager/index";
import { InputGroupScan } from "../InputGroupScan";
import {
  login,
  signTx,
  sendTransaction,
  transactionStatus,
} from "../../http/bank.api";
import { env } from "../../env";
import { registerTicket } from "../../http/cash-manager.api";
import { useSelector } from "react-redux";
import PaymentSuccess from "../PaymentSucces";

export const NewTicketFormTotal = ({
  setTicketProducts = () => {},
  ticketProducts = [],
  sumToggled = false,
  setSumToggled = null,
  inputRef = "",
  onInputRef = () => {},
  inputRefErrors = [],
}) => {
  const allTicketsStatus = {
    PAYMENT_ERROR: 5,
    PAID: 4,
    PAYMENT_PROCESSING: 3,
    AWAITING_PAYMENT: 2,
    NOT_PAID: 1,
  };

  const currentUser = useSelector((state) => state.currentUser.value);
  const [ticketTotal, setTicketTotal] = React.useState(0);
  const [ticketTotalTaxes, setTicketTotalTaxes] = React.useState(0);
  const [ticketTotalTaxesExcluded, setTicketTotalTaxesExcluded] =
    React.useState(0);
  const [ticketStatus, setTicketStatus] = React.useState(
    allTicketsStatus.NOT_PAID
  );
  const [tag, setTag] = React.useState("");
  const [paymentTimeoutRef, setPaymentTimeoutRef] = React.useState(null);

  React.useEffect(() => {
    setTicketTotal(calculateSum(ticketProducts));
  }, [ticketProducts]);

  React.useEffect(() => {
    setTicketTotalTaxes(calculateTaxes(ticketProducts));
  }, [ticketProducts]);

  React.useEffect(() => {
    if (ticketTotal && ticketTotalTaxes) {
      setTicketTotalTaxesExcluded(ticketTotal - ticketTotalTaxes);
    }
  }, [ticketTotal, ticketTotalTaxes]);

  function calculateSum(ticketProducts = []) {
    return ticketProducts.reduce((sum, ticketProduct) => {
      return sum + ticketProduct.product.price * ticketProduct.quantity;
    }, 0);
  }

  function calculateTaxes(ticketProducts = []) {
    return ticketProducts.reduce((sum, ticketProduct) => {
      return (
        sum +
        ((ticketProduct.product.price * ticketProduct.product.tva) / 100) *
          ticketProduct.quantity
      );
    }, 0);
  }

  async function handlePay() {
    setTicketStatus(allTicketsStatus.AWAITING_PAYMENT);
  }

  const handleResetTicket = () => {
    setTicketStatus(allTicketsStatus.NOT_PAID);
    setTicketProducts([]);
  };

  const processPayment = async (key = "", customerAccountId = "") => {
    setTicketStatus(allTicketsStatus.PAYMENT_PROCESSING);
    // log into bank from merchant account credentials
    const loginData = await login({
      email: env.BANK_MERCHANT_ID,
      password: env.BANK_MERCHANT_PASSWORD,
    });

    // sign tx
    const signature = signTx(
      {
        from: customerAccountId,
        to: env.BANK_MERCHANT_ACCOUNT,
        amount: ticketTotal,
      },
      key
    );

    // send transaction and wait for tx status
    const transactionData = await sendTransaction(
      {
        from: customerAccountId,
        to: env.BANK_MERCHANT_ACCOUNT,
        amount: ticketTotal,
        signature: signature,
      },
      loginData.token
    );

    if (transactionData.transactionStatus === transactionStatus.APPROVED) {
      setTicketStatus(allTicketsStatus.PAID);
      // send ticket creation to cash-manager
      await registerTicket(
        {
          user: currentUser.user,
          products: ticketProducts.map((ticketProduct) => ({
            id: ticketProduct.product._id,
            quantity: ticketProduct.quantity,
          })),
        },
        currentUser.accessToken
      );
    } else {
      setTicketStatus(allTicketsStatus.PAYMENT_ERROR);
    }
  };

  React.useEffect(() => {
    if (
      ticketStatus === allTicketsStatus.AWAITING_PAYMENT &&
      !paymentTimeoutRef
    ) {
      setPaymentTimeoutRef(
        setTimeout(() => {
          setTag("");
          paymentTimeoutRef && clearInterval(paymentTimeoutRef);
          setPaymentTimeoutRef(null);
          setTicketStatus(allTicketsStatus.PAYMENT_ERROR);
        }, 30000)
      );
    }
  }, [ticketStatus]);

  React.useEffect(() => {
    if (tag && ticketStatus === allTicketsStatus.AWAITING_PAYMENT) {
      // read nfc tag containing account id customer and private key customer
      // const key =
      //   "7k9X1n9K+rO+Dl+pgxyaek6fylBO2qHq7vgEa09Jy/LUYHB2dQ1Ec/5eQayhkmuWFzUMcwqcAoT1MuHqU+9fCg==";
      // const customerAccountId = "63bd0e75f798f29c0c88fc92";
      try {
        const { key, id } = JSON.parse(tag);
        processPayment(key, id).then(() => {
          setTag("");
          setPaymentTimeoutRef(null);
          paymentTimeoutRef && clearTimeout(paymentTimeoutRef);
        });
      } catch (error) {
        setTag("");
        setTicketStatus(allTicketsStatus.PAYMENT_ERROR);
        setPaymentTimeoutRef(null);
        paymentTimeoutRef && clearTimeout(paymentTimeoutRef);
      }
    }
    return () => {
      if (paymentTimeoutRef) {
        setPaymentTimeoutRef(null);
        clearTimeout(paymentTimeoutRef);
      }
    };
  }, [tag, ticketStatus, ticketProducts]);

  return (
    <NFCManager setTag={setTag}>
      {ticketStatus === allTicketsStatus.PAID ? (
        <PaymentSuccess onClose={handleResetTicket} />
      ) : null}
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <InputGroupScan
            label={"ref"}
            isError={inputRefErrors.length ? true : false}
            errors={inputRefErrors}
            value={inputRef}
            onInputOrScannedData={onInputRef}
          />
        </View>
        {sumToggled ? (
          <>
            <View style={styles.priceContainer}>
              <Text variant="headlineMedium" style={styles.priceHeader}>
                Total
              </Text>
              <View>
                {ticketStatus === allTicketsStatus.NOT_PAID ? (
                  <>
                    <View style={styles.totalItem}>
                      <Text>Taxes excluded</Text>
                      <Badge
                        size={36}
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          alignSelf: "flex-end",
                          backgroundColor: "#f9f9f9",
                          color: "#000",
                        }}
                      >
                        {`${Math.floor(ticketTotalTaxesExcluded * 100) / 100}`}{" "}
                        ${" "}
                      </Badge>
                    </View>
                    <View style={styles.totalItem}>
                      <Text>Taxes</Text>
                      <Badge
                        size={36}
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          alignSelf: "flex-end",
                          backgroundColor: "#f9f9f9",
                          color: "#000",
                        }}
                      >
                        {`${Math.floor(ticketTotalTaxes * 100) / 100}`} ${" "}
                      </Badge>
                    </View>
                    <View style={styles.totalItem}>
                      <Text>Total</Text>
                      <Badge
                        size={36}
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          alignSelf: "flex-end",
                          backgroundColor: "#f9f9f9",
                          color: "#000",
                        }}
                      >
                        {`${Math.floor(ticketTotal * 100) / 100}`} ${" "}
                      </Badge>
                    </View>
                    <Button onPress={handlePay} mode="contained">
                      Pay
                    </Button>
                  </>
                ) : (
                  <View style={styles.action}>
                    {ticketStatus === allTicketsStatus.AWAITING_PAYMENT ? (
                      <>
                        <ActivityIndicator size={64} />
                        <Text style={{ marginTop: 16 }}>Awaiting payment</Text>
                      </>
                    ) : ticketStatus === allTicketsStatus.PAYMENT_PROCESSING ? (
                      <>
                        <ActivityIndicator size={64} />
                        <Text style={{ marginTop: 16 }}>
                          Payment processing
                        </Text>
                      </>
                    ) : ticketStatus === allTicketsStatus.PAID ? (
                      <>
                        <Ionicons
                          name={"checkmark-outline"}
                          size={64}
                          color={"#f44336"}
                        />
                        <Text style={{ marginTop: 16 }}>Payment success</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons
                          name={"alert-outline"}
                          size={64}
                          color={"#f44336"}
                        />
                        <Text style={{ marginTop: 16, marginBottom: 16 }}>
                          Payment Error
                        </Text>
                        <Button onPress={handlePay} mode="contained">
                          Retry
                        </Button>
                      </>
                    )}
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <IconButton
                onPress={() => setSumToggled(false)}
                icon="chevron-up"
                size={48}
                color={"#f44336"}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                ...styles.priceContainer,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text variant="headlineMedium" style={styles.priceHeader}>
                Total
              </Text>
              <Text variant="headlineMedium" style={styles.priceHeader}>
                {Math.floor(ticketTotal * 100) / 100} $
              </Text>
              <View style={styles.action}>
                {ticketStatus === allTicketsStatus.NOT_PAID ? (
                  <Button onPress={handlePay} mode="contained">
                    Pay
                  </Button>
                ) : ticketStatus === allTicketsStatus.AWAITING_PAYMENT ? (
                  <ActivityIndicator />
                ) : ticketStatus === allTicketsStatus.PAYMENT_PROCESSING ? (
                  <ActivityIndicator />
                ) : ticketStatus === allTicketsStatus.PAID ? (
                  <Ionicons
                    name={"checkmark-outline"}
                    size={36}
                    color={"#f44336"}
                  />
                ) : (
                  <Ionicons
                    name={"alert-outline"}
                    size={36}
                    color={"#f44336"}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <IconButton
                onPress={() => setSumToggled(true)}
                icon="chevron-down"
                size={48}
                color={"#f44336"}
              />
            </View>
          </>
        )}
      </View>
    </NFCManager>
  );
};

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  priceContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  priceHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalItem: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
  },
});
