
import React from "react";
import Conge from "../admin/personnel/conge";
import Affecter from "../admin/personnel/affecter";
import Navbar from "../Navbar";
import Chauffeur from "../admin/personnel/chauffeur";

const PersonneP  = () => {
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
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Personnel</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#affecte"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-exchange"></i>Affecter</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#conge"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-book"></i>Conge</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                  <Chauffeur />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="affecte" role="tabpanel">
                                <Affecter/>
                            </div>
                            <div class="tab-pane p-20" id="conge" role="tabpanel">
                                <Conge />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  default PersonneP;