import React from "react";
import EditAction from "./edition/editAction";
import Navbar from "../Navbar";
import Tous from "./edition/tous";
import FicheTechnique from "./edition/ficheTechnique";
import Recherche_generateur from "./edition/recherche_generateur";

const Edition = () => {
    return(
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
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Creer</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#affecte"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Afficher tous</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#conge"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-book"></i>Fiche techinique</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#recherche"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-search"></i>Recherche</span></a
                                >
                            </li>
                            
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <EditAction />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="affecte" role="tabpanel">
                                 <Tous />
                            </div>
                            <div class="tab-pane p-20" id="conge" role="tabpanel">
                                <FicheTechnique />
                            </div>
                            <div class="tab-pane p-20" id="recherche" role="tabpanel">
                                <Recherche_generateur />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Edition;