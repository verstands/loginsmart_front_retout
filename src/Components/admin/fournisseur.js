import React from "react";
import Navbar from "../Navbar";
import AddFourniseur from "./fournisseur/affFourniseur";
import AgenceAssurer from "./fournisseur/agenceAssure";

const Fournisseur = () => {
    return (
        <div>
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
                                    <span class="hidden-xs-down"><i class="mdi mdi-bulletin-board"></i>Fournisseur</span></a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    data-bs-toggle="tab"
                                    href="#aga"
                                    role="tab"
                                ><span class="hidden-sm-up"></span>
                                    <span class="hidden-xs-down"><i class="mdi mdi-bulletin-board"></i>Agence assureur</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    <AddFourniseur />
                                </div>
                            </div>
                            <div class="tab-pane p-20" id="aga" role="tabpanel">
                                    <AgenceAssurer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fournisseur