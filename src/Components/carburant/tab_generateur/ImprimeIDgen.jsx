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
const ImprimerIDGen = () => {
    //carburant function
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [car, setcar] = useState([])
    const [carss, setcarsss] = useState([])
    const [imm, setimm] = useState([])
    const [n, setn] = useState(0)
    const sites = JSON.parse(localStorage.getItem("site"))
    const [loading, setloading] = useState(true)
    const datanow = new Date()
    const formattedDate = dateFormat(datanow, "dd/mm/yyyy");

    const { genID } = useParams();
    useEffect(() => {
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}pleingenID/${sit.idSite}/${genID}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    alert(response.data.data);
                    setloading(false)
                }).catch((error) => {
                    alert(error)
                })
            })
        }
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
                                    <Text style={{fontSize : 15}}>LOGinSmart</Text>
                                    <Text style={{fontSize : 15}}>Kinshasa/Gombe</Text>
                                    <Text style={{fontSize : 15}}>Republique Dem du Congo</Text>
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
                                <Text style={{fontSize : 15}}>BON DE CARBURANT Numero 9500/2015          Date : { formattedDate}</Text>
                                <Text> </Text>

                            </div>
                            <div>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Marque / Modele</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Immatriculation / Num. ord</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Type Carburant</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Quantité</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Kilometrage</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Chauffeur</Text>
                                        </View>
                                        <View style={styles.tableColHeader}>
                                            <Text style={styles.tableCellHeader}>Utiliateur</Text>
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
                                                <Text style={styles.tableCell}>{item.marque +'/' + item.modele}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.codegroupe + "/" + item.id}</Text>
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
                                                <Text style={styles.tableCell}>{item.nom + " " + item.prenom}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{item.noms}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </div>
                            <View>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                                <Text> </Text>
                            </View>
                            <View>
                                <Text style={{fontSize : 15}}>Accord Direction               Dept.Logistique              Chauffeur</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    )
}

export default ImprimerIDGen;