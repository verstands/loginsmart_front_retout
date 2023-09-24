import React from "react";

const EditAction = () => {
  return(
    <>
        <div className="card">
        <div class="card-body">
            <center>
            <h2>Enregistrer un nouveau vehicule</h2>
            </center>
              <h5>Identification</h5>
              <div class="row">
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Immatriculation" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Numero d'ordre" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Model" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Variante" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Numero chassis" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Annee de fabrication" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Mise en circulation" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Categorie" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Sous categorie" /> 
                </div>
                <div class="col-md-9">
                </div>
                <br />
                <h5>Dimension et poids</h5>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Longeur" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Largeur" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Hauteur" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Poids" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Couleur" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Capacité carburant" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Capacite radiateur" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Capacité carter" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nombre de places" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nombre de portes" /> 
                </div>
                <div class="col-md-6">
                    <input type="File" class="form-control" placeholder="Largeur" />             
                </div>
                <br />
                <h5>Moteur</h5>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Numero moteur" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Cylindré" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nimbre de cylindre" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Disposition" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Type de carburant" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Rgimee moteur" /> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Consommation carburant" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Turbo" /> 
                </div>
                <br />
                <h5>Moteur</h5>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Mise en service" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Km initial" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Puissance" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Transmission fiscale"/> 
                </div>
                <br />
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Climatisation" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Type de pneu" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Valeur d'acquisition" /> 
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Librifiant" /> 
                </div>
                <br />
                <br />
                <div class="col-md-3">
                    <button class="btn btn-primary"> Enregistrer</button>
                </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default EditAction;