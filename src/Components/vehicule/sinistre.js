import React from "react";
import Navbar from "../Navbar";
import Afficher_Sinistre from "./sinitres/affSinistre";
import DeclareSinistre from "./sinitres/declarerSinistre";
import Inspection_journaliere from "./sinitres/inspectionJ";
import ListeInspection from "./sinitres/listeInspection";
const Sinitre_Vehicule = () => {
    return (
        <>
            <Navbar />
            <div class="page-wrapper">
                <div class="row">
                    <div class="card">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    data-bs-toggle="tab"
                                    href="#home"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Declarer Sinistre</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#aff"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Afficher les sinistre</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#affecte"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Inspect journalière</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#liste"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Liste des respection journaliere</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <DeclareSinistre />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="aff" role="tabpanel">
                                <Afficher_Sinistre />
                            </div>
                            <div class="tab-pane p-20" id="affecte" role="tabpanel">
                                <Inspection_journaliere />
                            </div>
                            <div class="tab-pane p-20" id="liste" role="tabpanel">
                                <ListeInspection />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sinitre_Vehicule; 