import React from "react";
import Navbar from "../Navbar";
import Prelevement from "./tab_prelevement/prelevement";
import AffchageTous from "./tab_prelevement/AffichageTous";
import Consomation from "./tab_prelevement/consomation";
import Search_vehicule from "./tab_prelevement/search";
import Recherche_carburant from "./tab_prelevement/Recherche";

const Vehicule_carburant = () => {
    
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
                                    href="#consomation"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-history"></i> Consomation</span></a
                                >
                            </li>
                            <li class="nav-item">
                            <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#rechss"
                                role="tab"
                            ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-search"></i> Recherche</span></a
                            >
                        </li>
                            
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <Prelevement />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="profile" role="tabpanel">
                                <div class="p-20">
                                    <AffchageTous />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="messages" role="tabpanel">
                                <Recherche_carburant />
                            </div>
                            <div class="tab-pane p-20" id="consomation" role="tabpanel">
                                <Consomation />
                            </div>
                            <div class="tab-pane p-20" id="rechss" role="tabpanel">
                                <Search_vehicule />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vehicule_carburant; 