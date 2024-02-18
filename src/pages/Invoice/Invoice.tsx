// import MyInvoice from "./MyInvoice";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useAppSelector } from "../../redux/hook";
import { useGetSingleSalesQuery } from "../../redux/features/sales/salesApi";

const Invoice = () => {
  const salesId = useAppSelector((state) => state.sales.salesId);
  const { data: salesData } = useGetSingleSalesQuery(salesId);

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 35,
      paddingHorizontal: 35,
    },
    page: {
      flex: "none",
    },
    section: {
      padding: 10,
    },
    header: {
      backgroundColor: "#172554",
      fontSize: 30,
      textAlign: "center",
      color: "white",
      padding: 10,
    },
    subHeader: {
      backgroundColor: "#172554",
      fontSize: 20,
      textAlign: "center",
      color: "white",
      padding: 2,
      marginTop: 50,
    },
    twoColumn: {
      flexDirection: "row",
      flexGrow: 1,
      justifyContent: "space-between",
      marginTop: 10,
    },
    textTitle: {
      marginTop: 5,

      fontStyle: "bold",
    },
  });
  return (
    <div className="py-10">
      <PDFViewer width={550} height={700}>
        <Document>
          <Page size="A4" style={styles.body}>
            <Text style={styles.header}>Sales Invoice</Text>
            <Text style={styles.subHeader}>Product Information</Text>
            <View style={styles.twoColumn}>
              <View>
                <Text style={styles.textTitle}>Product Name:</Text>
                <Text style={styles.textTitle}>Product Quantity:</Text>
                <Text style={styles.textTitle}>Product Price:</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>
                  {salesData?.data?.productName}
                </Text>
                <Text style={styles.textTitle}>
                  {salesData?.data?.quantity}
                </Text>
                <Text style={styles.textTitle}>
                  {salesData?.data?.productPrice} $
                </Text>
              </View>
            </View>
            <Text style={styles.subHeader}>Seller Information</Text>
            <View style={styles.twoColumn}>
              <View>
                <Text style={styles.textTitle}>Seller Name:</Text>
                <Text style={styles.textTitle}>Seller Role:</Text>
                <Text style={styles.textTitle}>Date:</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>{salesData?.data?.seller}</Text>
                <Text style={styles.textTitle}>{salesData?.data?.role}</Text>
                <Text style={styles.textTitle}>{salesData?.data?.date}</Text>
              </View>
            </View>
            <Text style={styles.subHeader}>Buyer Information</Text>
            <View style={styles.twoColumn}>
              <View>
                <Text style={styles.textTitle}>Buyer Name:</Text>
                <Text style={styles.textTitle}>Total Price: </Text>
                <Text style={styles.textTitle}>Applied Coupon:</Text>
                <Text style={styles.textTitle}>Discount Price:</Text>
                <Text style={styles.textTitle}>Grand Total</Text>
              </View>
              <View>
                <Text style={styles.textTitle}>{salesData?.data?.buyer}</Text>
                <Text style={styles.textTitle}>
                  {salesData?.data?.totalPrice} $
                </Text>
                <Text style={styles.textTitle}>{salesData?.data?.coupon}</Text>
                <Text style={styles.textTitle}>
                  {salesData?.data?.discountPrice} $
                </Text>
                <Text style={styles.textTitle}>
                  {salesData?.data?.grandTotal} $
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text>
                This Invoice is made with very patience and lot's of hard work.
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default Invoice;
