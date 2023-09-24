import React from "react";

const DeclareSinistre = () => {
   return (
      <>
         <div class="card">
            <div class="card-body">
               <h3 className="text-center">ENREGISTRER UN SINISTRE</h3>
               <hr />
               <div class="row container">
                  <div class="col-md-6">
                     <label>Date sinistre</label>
                     <input type="date" class="form-control" placeholder="Numero de ref" />
                  </div>
                  <div class="col-md-6">
                     <label>Lieu</label>
                     <input type="text" class="form-control" placeholder="Numero serie" />
                  </div>
                  <div class="col-md-6">
                     <label>Heure</label>
                     <div className="row">
                        <select class="form-control col-md-6">
                           <option></option>
                        </select>
                        <select class="form-control col-md-6">
                           <option></option>
                        </select>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <label>Vehicule</label>
                     <input type="number" class="form-control" placeholder="2014" />
                  </div>
                  <br />
                  <div class="col-md-6">
                     <label>Ville</label>
                     <input type="text" class="form-control" placeholder="Date fin garanti" />
                  </div>
                  <div class="col-md-6">
                     <label>Chauffeur</label>
                     <input type="text" class="form-control" placeholder="Categorie" />
                  </div>
                  <div class="col-md-6">
                     <label>Partie tierce</label>
                     <select className="form-control">
                        <option>Oui</option>
                        <option>Non</option>
                     </select>
                  </div>
                  <div class="col-md-6">

                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <hr />
                     
                  <h5>Autre information</h5>
                  <div class="col-md-6">
                     <label>Dommage aux tiers</label><br />
                     <input type="checkbox" placeholder="Longeur" />Vehicules<br />
                     <input type="checkbox" placeholder="Longeur" />Objet
                  </div>
                  <div class="col-md-6">
                     <label>Largeur</label><br />
                     <div className="row">
                        <div className="col-md-6">
                           <h6>Passager(s) abord</h6>
                        </div>
                        <div className="col-md-6">
                           <input type="checkbox" placeholder="Longeur" />
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-6">
                           <h6>Passager(s) à bord(tiers)</h6>
                        </div>
                        <div className="col-md-6">
                           <input type="checkbox" placeholder="Longeur" />
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-6">
                           <h6>Blessé(s)</h6>
                        </div>
                        <div className="col-md-6">
                           <input type="checkbox" placeholder="Longeur" />
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-6">
                           <h6> Témoin(s)</h6>
                        </div>
                        <div className="col-md-6">
                           <input type="checkbox" placeholder="Longeur" />
                        </div>
                     </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <hr />
                  <div class="col-md-6 text-center ">
                     <label>Un PV a-t-il été établi?</label><br />
                     <input type="radio" placeholder="Hauteur" />Oui<br />
                     <input type="radio" placeholder="Hauteur" />Non
                  </div>
                  <br />
                  <div class="col-md-6 text-center">
                     <label>Y a-t-il eu Débit de fuite?</label><br></br>
                     <input type="radio"  placeholder="Poids" />Oui <br />
                     <input type="radio"  placeholder="Poids" />Non
                  </div>
                  <div class="col-md-8">
                     <div className="row">
                        <div className="col-md-3">
                            <label>N°Proces verbale</label>
                        </div>
                        <div className="col-md-9">
                           <input type="text" class="form-control" />    
                        </div><br /><br />   
                        <div className="col-md-3">
                            <label>Date Etablissement</label>
                        </div>
                        <div className="col-md-9">
                           <input type="date" class="form-control" />    
                        </div><br /><br />
                        <div className="col-md-3">
                            <label>Nom agent qualité</label>
                        </div>
                        <div className="col-md-9">
                           <input type="text" class="form-control" />    
                        </div><br /><br />
                        <div className="col-md-3">
                            <label>Gandarmerie</label>
                        </div>
                        <div className="col-md-9">
                           <input type="text" class="form-control" />    
                        </div>
                     </div>
                  </div> 
               </div>
               <br />
               <div class="col-md-3">
                  <button class="btn btn-primary" > Enregistrer</button>
               </div>
            </div>
         </div>
      </>
   )
}

export default DeclareSinistre;