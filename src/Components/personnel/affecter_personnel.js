
import React from "react";
import Navbar from "../Navbar";

const Affecter_personnel  = () => {
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
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Afecter</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                class="nav-link"
                                data-bs-toggle="tab"
                                href="#affecte"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-exchange"></i>voir</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                  
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="affecte" role="tabpanel">
                                
                            </div>
                            <div class="tab-pane p-20" id="conge" role="tabpanel">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export  default Affecter_personnel;