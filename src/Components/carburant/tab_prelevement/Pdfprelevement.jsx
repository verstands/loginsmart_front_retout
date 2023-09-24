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
    tableRow: { margin: "auto", flexDirection: "row", fontSize : 1 },
    tableColHeader: { width: "9%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomColor: "#000", borderWidth: 1, backgroundColor: "#f0f0f0" },
    tableCol: { width: "9%", borderStyle: "solid", borderColor: "#bfbfbf", borderBottomWidth: 1 },
    tableCellHeader: { margin: 4, fontSize: 8, fontWeight: 'bold' },
    tableCell: { margin: 1, fontSize: 9}
});
const Pdfprelevement = () => {
    //carburant function
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [car, setcar] = useState([])
    const [carss, setcarss] = useState([])
    const [imm, setimm] = useState([])
    const [n, setn] = useState(0)
    const siteSession = localStorage.getItem("siteSession");
    const [loading, setloading] = useState(true)

    const  immatriculation  = localStorage.getItem("ImmSession");
    const  debut  = localStorage.getItem("debutSession")
    const  fin  = localStorage.getItem("finSession")
    useEffect(() => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}recherche_consomation/${debut}/${fin}/${siteSession}/${immatriculation}`,
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
                                    <Text style={{fontSize : 10}}>LOGinSmart</Text>
                                    <Text style={{fontSize : 10}}>Kinshasa/Gombe</Text>
                                    <Text style={{fontSize : 10}}>Republique Democratique du Congo</Text>
                                </div>
                            </div>
                        </View>
                        <View style={styles.Titre}>
                            <div className="text-center">
                                <Text style={{fontSize : 10, fontWeight : "bold"}}>RESULTATS DE RECHERCHE POUR PRELEVEMENTS VEHICULES</Text>
                            </div>
                        </View>
                        <View style={styles.body}>
                            <div className="text-center">
                                <Text></Text>
                                <View>
                                    <Text></Text>
                                </View>
                            </div>
                            <div>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Immatriculation</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Marque</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Modèle</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Carburant</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Sites</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Période</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Nbr plein</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Nbre jours</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Total L</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Total Km</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Fréquence</Text>
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
                                                <Text style={styles.tableCell}>{item.immatriculationY}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.marque}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.modele}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.type_carb}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.nom_site}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{dateFormat(item.nombrMin, "dd/mm/yyyy") +" au " + dateFormat(item.nombrMax, "dd/mm/yyyy") }</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.NbrePlein}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.jour}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.TotalL}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.totalKm}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.frequence}</Text>
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

export default Pdfprelevement;