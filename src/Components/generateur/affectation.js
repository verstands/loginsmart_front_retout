import React from "react";
import Navbar from "../Navbar";
import Affacter_generateur from "./affectation/affecter_generateur";
import AfficherTous_general from "./affectation/afficherTous";

const AffectationGeneral = () => {
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
                                href="#affecter"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Affecter</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#affiche"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-book"></i>Affiche tous</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#conge"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-book"></i>Congés</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#recherche"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-book"></i>Recherche</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="affecter" role="tabpanel">
                                <div class="p-20">
                                    <Affacter_generateur />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="affiche" role="tabpanel">
                                <AfficherTous_general />
                            </div>
                            <div class="tab-pane p-20" id="conge" role="tabpanel">
                                conge 
                            </div>
                            <div class="tab-pane p-20" id="recherche" role="tabpanel">
                               Recherche
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    </>
  )
}
export default AffectationGeneral;