import React from "react";
import Navbar from "../Navbar";
import Prelevement_generateur from "./tab_generateur/prelevement";
import AffeichageTous_generateur from "./tab_generateur/affichage_generateur";
import Recherche_multiple_generateur from "./tab_generateur/RechercheM";
import RechercheGroupe from "./tab_generateur/RechercheGroupe";

const Generateur_vehicule = () => {
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
                                    <span class="hidden-xs-down"><i class="fas fa-save"></i>Prelevement</span></a
                                >
                            </li>

                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#profile"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-book"></i> Afficher tous</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#messages"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-search"></i> Recherche mutliple</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#rech"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-search"></i>Recherche groupe</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#pdf"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down">.</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <Prelevement_generateur />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="profile" role="tabpanel">
                                <div class="p-20">
                                    <AffeichageTous_generateur />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="messages" role="tabpanel">
                                <Recherche_multiple_generateur />
                            </div>
                            <div class="tab-pane p-20" id="consomation" role="tabpanel">

                            </div>

                            <div class="tab-pane p-20" id="rech" role="tabpanel">
                               <RechercheGroupe />
                            </div>
                            <div class="tab-pane p-20" id="pdf" role="tabpanel">
                                <Recherche_multiple_generateur />   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Generateur_vehicule;