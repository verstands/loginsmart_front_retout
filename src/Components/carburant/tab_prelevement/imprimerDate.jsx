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
        size: 50
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
    tableRow: { margin: "auto", flexDirection: "row" },
    tableColHeader: { width: "15%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomColor: "#000", borderWidth: 1, backgroundColor: "#f0f0f0" },
    tableCol: { width: "15%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomWidth: 1 },
    tableCellHeader: { margin: 5, fontSize: 12, fontWeight: 500 },
    tableCell: { margin: 5, fontSize: 10 }
});
const ImprimerDate = () => {
    //carburant function
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [car, setcar] = useState([])
    const [carss, setcarss] = useState([])
    const [imm, setimm] = useState([])
    const [n, setn] = useState(0)
    const siteSession = localStorage.getItem("siteSession");
    const [loading, setloading] = useState(true)

    const { carURL } = useParams();
    useEffect(() => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}pleinCarDate/${siteSession}/${carURL}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setcarss(response.data.data);
                    setloading(false)
                }).catch((error) => {
                    alert(error)
                })
    }, [])
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
                                    <Text>Image</Text>
                                </div>
                                <div className="col-md-6">
                                    <Text>LOGinSmart</Text>
                                    <Text>Kinshasa/Gombe</Text>
                                    <Text>Republique Democratique du Congo</Text>
                                </div>
                            </div>
                        </View>
                        <View style={styles.Titre}>
                            <div className="text-center">
                                <Text></Text>
                            </div>
                        </View>
                        <View style={styles.body}>
                            <div className="text-center">
                                <Text>BON DE CARBURANT Numero 9500/2015          Date : 22-05-2023</Text>
                            </div>
                            <div>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>N°</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Immatriculation</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Chauffeur</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Modele</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Date</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Carburant</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Quantite</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Kilometrage</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Numero de bon</Text>
                                        </View>
                                    </View>
                                    <center>
                                        {
                                            loading === true && (
                                                <View>
                                                    <Text  style={{ fontSize: 10 }} >Chargement...</Text>
                                                </View>
                                            )
                                        }
                                    </center>
                                    {carss.map((item) => (
                                        <View key={item.id} style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.id}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.immatriculation}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.nom}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.nom_carb}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.date_plein}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.nom_carb}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.qteplein}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.kilometrage}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.num}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </div>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    )
}

export default ImprimerDate;