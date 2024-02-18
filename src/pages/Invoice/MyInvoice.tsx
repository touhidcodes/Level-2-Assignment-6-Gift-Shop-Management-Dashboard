// import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const MyInvoice = () => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    page: {
      flex: "none",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    header: {
      backgroundColor: "blue",
      fontSize: "30px",
      textAlign: "center",
      color: "blue",
    },
  });
  return (
    <Document>
      <Text style={styles.header}>Sales Invoice</Text>
      <View style={styles.section}></View>
      {"\n"}
      <Text>Section #2</Text>
      <Page size="A4">
        <View style={styles.section}></View>
      </Page>
    </Document>
  );
};

export default MyInvoice;
