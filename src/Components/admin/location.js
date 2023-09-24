import React from "react";
import Navbar from "../Navbar";
import Site from "./location/site";
import Ville from "./location/ville";
import Province from "./location/province";
import Zone from "./location/zone";

const Location = () => {
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
                           <span class="hidden-xs-down"><i class="mdi mdi-bulletin-board"></i>Site</span></a
                           >
                       </li>
                       <li class="nav-item">
                           <a
                           class="nav-link"
                           data-bs-toggle="tab"
                           href="#ville"
                           role="tab"
                           ><span class="hidden-sm-up"></span>
                           <span class="hidden-xs-down"><i class="mdi mdi-city"></i>Ville</span></a
                           >
                       </li>
                       <li class="nav-item">
                           <a
                           class="nav-link"
                           data-bs-toggle="tab"
                           href="#zone"
                           role="tab"
                           ><span class="hidden-sm-up"></span>
                           <span class="hidden-xs-down"><i class="mdi mdi-amazon-clouddrive"></i>Zone</span></a
                           >
                       </li>
                       <li class="nav-item">
                           <a
                           class="nav-link"
                           data-bs-toggle="tab"
                           href="#province"
                           role="tab"
                           ><span class="hidden-sm-up"></span>
                           <span class="hidden-xs-down"><i class="mdi mdi-bulletin-board"></i>Province</span></a
                           >
                       </li>
                   </ul>
                   <div class="tab-content tabcontent-border">
                       <div class="tab-pane active" id="home" role="tabpanel">
                           <div class="p-20">
                            <Site />
                           </div>
                       </div>
                       <div class="tab-pane p-20" id="ville" role="tabpanel">
                            <Ville />
                       </div>
                       <div class="tab-pane p-20" id="zone" role="tabpanel">
                            <Zone />
                       </div>
                       <div class="tab-pane p-20" id="province" role="tabpanel">
                         <Province />
                       </div>
                   </div>
               </div>
           </div>
       </div>
     </>
   );
}

export default Location