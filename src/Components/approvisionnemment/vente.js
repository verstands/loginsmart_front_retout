import React from "react";
import Navbar from "../Navbar";
const Vente = () => {
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
                           <span class="hidden-xs-down"><i class="mdi mdi-bulletin-board"></i>Vente</span></a
                           >
                       </li>
                   </ul>
                   <div class="tab-content tabcontent-border">
                       <div class="tab-pane active" id="home" role="tabpanel">
                           <div class="p-20">
                        
                           </div>
                       </div>
                       <div class="tab-pane p-20" id="ville" role="tabpanel">
                          
                       </div>
                   </div>
               </div>
           </div>
       </div>
     </>
   );
}

export default Vente