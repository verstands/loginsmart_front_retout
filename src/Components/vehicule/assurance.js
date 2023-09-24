import React from "react";
import Navbar from "../Navbar";
import Assurer_vehicule from "./assurance/assurer_vehicule";
import Leassurance from "./assurance/lesassurance";
import Renouveller_assurance from "./assurance/renouveller";
const Assurance_vehicule = () => {
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
                                    <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Assurer vehicule</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#ren"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Renouveller une assurance</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#ret"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Retirer véhecule(s) d'une police</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#lesa"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Les assurances</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                   <Assurer_vehicule />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="ren" role="tabpanel">
                                 <Renouveller_assurance  />
                            </div>
                            <div class="tab-pane p-20" id="ret" role="tabpanel">
                                    
                            </div>
                            <div class="tab-pane p-20" id="lesa" role="tabpanel">
                                <Leassurance /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assurance_vehicule; 