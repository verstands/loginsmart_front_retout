import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const FicheTechniqueVehicule = () => {
    const [un, setun] = useState(0);
    const [fiche, setfiche] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vehicule, setvehicule] = useState([])
    const [vehicules, setvehicules] = useState([]);
    const [vehiculess, setvehiculess] = useState([]);
    const [selectedVehicule, setSelectedVehicule] = useState("");
    let token = `Bearer ${localStorage.getItem("token")}`;
    let n = 1;
    const url = `${process.env.REACT_APP_SERVICE_API}ficheID/${selectedVehicule}/${un}`;
    const siteSession = localStorage.getItem("siteSession");

    const [display, setDisplay] = useState("none");


    if(un === ""){
        setun(0)
    }
    const RechercheBtn = () => {
        setLoading(true)
        axios.get(url,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setfiche(response.data.data);
            setLoading(false)
            setDisplay(display === "none");

        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez remplir tous les champs',
                });
            } else if (error.response && error.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: `${error.response.data.message}`,
                });
            }
            else {
                alert(error);
                alert(url)

            }
            setLoading(false)
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvehicules(response.data.data);
        }).catch((error) => {

        })

    }, [])
    const handleChange = (e) => {
        setSelectedVehicule(e.value);
    }
    const autocompleteVehicule = () => {
        const options = vehicules.map((vh) => ({
            label: vh.immatriculation,
            value: vh.immatriculation,
        }));
        return (
            <Select
                options={options}
                onChange={handleChange}
            />
        );
    };
    return (
        <>
            <div class="card card-body">
                <br />
                <h5 className="text-center"> FICHE TECHNIQUE : {fiche.marque}</h5><hr />
                <div class="d-flex flex-row">
                    <div class="col-md-3">
                        <label htmlFor="">Immatriculation</label>
                        {autocompleteVehicule()}
                    </div>
                    <div class="col-md-3">
                        <label htmlFor="">Numero d'ordre</label>
                        <input type="number" onChange={(e) => setun(e.target.value)} class="form-control" placeholder="Numero d'ordre" />
                    </div>
                    <div class="col-md-3">
                        <br />
                        <button onClick={RechercheBtn} class="btn btn-primary"> <i class="fas fa-search"></i> Afficher</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">

                        <center>
                            {
                                loading === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                )
                            }
                        </center>
                    </div>
                </div>
            </div>
            <div disabled class="container-fluid">

                <div class="row" style={{ display: display }}>
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <div>
                                    <h5 class="card-title">IDENTIFICATION</h5>
                                    <hr />
                                    <p>
                                        <tr>
                                            <h6>Immatriculation : {fiche.immatriculation}</h6>
                                            <h6>Numero d'ordre : {fiche.numero_ord}</h6>
                                            <h6>Marque : {fiche.marque}</h6>
                                            <h6>Modele : {fiche.modele}</h6>
                                            <h6>Variante : {fiche.variante}</h6>
                                            <h6>Numero chassis : {fiche.chassis}</h6>
                                            <h6>Année de la fabrication : {fiche.anne_fab}</h6>
                                            <h6>Mise en circulation : {fiche.anne_circ}</h6>
                                            <h6>Categorie : {fiche.categorie}</h6>
                                        </tr>
                                    </p>
                                </div>
                                <div>
                                    <h5 class="card-title">DIMENSION ET POIDS</h5>
                                    <hr />
                                    <p>
                                        <tr>
                                            <h6>Longeur : {fiche.longueur}</h6>
                                            <h6>Largeur : {fiche.largeur}</h6>
                                            <h6>Hauteur : {fiche.categorie}</h6>
                                            <h6>Poids : {fiche.poids}</h6>
                                            <h6>Couleur : {fiche.couleur}</h6>
                                            <h6>Capacité carburant : {fiche.categorie}</h6>
                                            <h6>Capacité radiateur : {fiche.cap_rad}</h6>
                                            <h6>Capacité carter : {fiche.cap_carter_veh}</h6>
                                            <h6>Nombre de places : {fiche.nbre_place}</h6>
                                            <h6>Nombre de portes : {fiche.nbre_port}</h6>
                                        </tr>
                                    </p>
                                </div>
                                <div>
                                    <h5 class="card-title">MOTEUR</h5>
                                    <hr />
                                    <p>
                                        <tr>
                                            <h6>Numero moteur : {fiche.num_mot}</h6>
                                            <h6>Cylindre : {fiche.cylindre_circ}</h6>
                                            <h6>Nombre de cylindre : {fiche.nbre_cyl}</h6>
                                            <h6>Disposition : {fiche.disposition_cyl}</h6>
                                            <h6>Carburant : {fiche.type_carb}</h6>
                                            <h6>Regime moteur : {fiche.regim_mot_veh}</h6>
                                            <h6>Consommation du carburant : {fiche.cons_carb_veh}</h6>
                                            <h6>Turbo : {fiche.turbo}</h6>

                                        </tr>
                                    </p>
                                </div>
                                <div>
                                    <h5 class="card-title">AFFECTATION</h5>
                                    <hr />
                                    <p>
                                        <tr>
                                            <h6>Mise en service : {fiche.turbo}</h6>
                                            <h6>Km initial : {fiche.km_initial}</h6>
                                            <h6>Puissane : {fiche.turbo}</h6>
                                            <h6>Transmission : {fiche.transm}</h6>
                                            <h6>Climatisation : {fiche.clim}</h6>
                                            <h6>Type pneus : {fiche.turbo}</h6>
                                            <h6>Valeur d'acquisition : {fiche.valeur_acq}</h6>
                                            <h6>Lubrifiant : {fiche.lubri_mot}</h6>
                                        </tr>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Photo</h5>
                                <p>
                                    <img src={fiche.foto} width={350} height={350} style={{objectFit : 'cover'}} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </>
    );
}

export default FicheTechniqueVehicule;