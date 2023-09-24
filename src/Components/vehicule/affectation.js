import React from "react";
import Navbar from "../Navbar";

const Affectation_vehicule = () => {
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
                        <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Affecter</span></a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#aff"
                        role="tab"
                        ><span class="hidden-sm-up"></span>
                        <span class="hidden-xs-down"><i class="fas fa-exchange"></i> Affectation</span></a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        href="#aff"
                        role="tab"
                        ><span class="hidden-sm-up"></span>
                        <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Historique Affectation</span></a
                        >
                    </li>
                </ul>
                <div class="tab-content tabcontent-border">
                    <div class="tab-pane active" id="home" role="tabpanel">
                        <div class="p-20">
                            
                        </div>
                    </div>
                    <div class="tab-pane p-20" id="aff" role="tabpanel">
                          
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Affectation_vehicule; 