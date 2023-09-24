import React, { Component, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  Titre : {
    margin : 10,
    padding: 10,
    textAlign : 'center',
  },
  Tbodyitre : {
    margin : 10,
    padding: 10,
    textAlign : 'center',
    size : 20
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});
function Recherche_multiple_generateur() {
  let v = 'eeeeeeee';
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
                  <Text>{v}</Text> 
                  </div>
            </View>
            <View style={styles.body}>
                  <div className="text-center">
                  <Text>BON DE CARBURANT Numero 9500/2015          Date : 22-05-2023</Text> 
                  </div>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  )
}

export default Recherche_multiple_generateur;