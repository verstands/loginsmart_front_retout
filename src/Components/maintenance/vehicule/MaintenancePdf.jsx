import React, { Component, useState, useEffect } from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import axios
    from "axios";
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';


const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        color: "black",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    Titre: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
    },
    body: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        size: 2
    },
    table: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        fontSize: 15
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    table: { display: "table", width: "auto", borderStyle: "solid", borderColor: "#bfbfbf", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row", fontSize: 1 },
    tableColHeader: { width: "9%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomColor: "#000", borderWidth: 1, backgroundColor: "#f0f0f0" },
    tableCol: { width: "9%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomWidth: 1 },
    tableCellHeader: { margin: 4, fontSize: 8, fontWeight: 'bold' },
    tableCell: { margin: 1, fontSize: 9 },
    tableRow2: { margin: "auto", flexDirection: "row", fontSize: 1 },
    tableColHeader2: { width: "16%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomColor: "#000", borderWidth: 1, backgroundColor: "#f0f0f0" },
    tableCol2: { width: "15%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomWidth: 1 },
    tableCellHeader2: { margin: 4, fontSize: 8, fontWeight: 'bold' },
    tableCell2: { margin: 1, fontSize: 9 },
    
});
const MaintenancePdf = () => {
    //carburant function
    const [loading, setloading] = useState(true)

    const datanow = new Date()
    const formattedDateNow = dateFormat(datanow, "dd/mm/yyyy");
    
    return (
        <>
            <PDFViewer style={styles.viewer}>
                {/* Start of the document*/}
                <Document>
                    {/*render a single page*/}
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Text>Image                                                                          Date: {formattedDateNow}</Text>
                                </div>
                                <div className="col-md-6">
                                    <Text style={{ fontSize: 10 }}>LOGinSmart</Text>
                                    <Text style={{ fontSize: 10 }}>Kinshasa/Gombe</Text>
                                    <Text style={{ fontSize: 10 }}>Republique Democratique du Congo</Text>
                                </div>
                            </div>
                        </View>
                        <View style={styles.Titre}>
                            <div className="text-center">
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>BON DE COMMANDE N°/</Text>
                            </div>
                        </View>
                        <View style={styles.body}>
                            <div className="text-center">
                                <Text></Text>
                                <View>
                                    <Text></Text>
                                </View>
                            </div>
                            
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    )
}

export default MaintenancePdf;