import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Clonage = () => {
    const [vehiculeClone, setvehiculeClone] = useState([])
    const [Loadings, setLoadings] = useState(true)
    let token = `Bearer ${localStorage.getItem("token")}`;
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}vehiculeID/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvehiculeClone(response.data.data);
            setLoadings(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    return (
        <>
            <Navbar />
            <div class="page-wrapper">
                <div class="row">
                    <div class="card card-body">
                        <h3 className="text-center">EREGISTRER UN NOUVEAU  A PARTIR D'UN MODEL</h3>
                        <hr />
                        <center>
                            {
                                Loadings === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                )
                            }
                        </center>
                        <div class="row">
                            <div class="col-md-3">
                                <label>Immatriculation</label>
                                <input type="text" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Numero d'ordre</label>
                                <input type="text" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Marque</label>
                                <select className="form-control" >
                                    <option value={vehiculeClone.marque}>{vehiculeClone.marque}</option>

                                </select>
                            </div>
                            <div class="col-md-3">
                                <label>Model</label>

                                <select className="form-control" >
                                    <option>{vehiculeClone.numero_ord}</option>
                                </select>
                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Variante</label>
                                <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero serie" />
                            </div>
                            <div class="col-md-3">
                                <label>Numero chassis</label>
                                <input value={vehiculeClone.numero_ord} type="number" class="form-control" placeholder="2014" />
                            </div>
                            <div class="col-md-3">
                                <label>Année de fabrication</label>
                                <input type="number" value={vehiculeClone.marque} class="form-control" placeholder="2014" />
                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Mise en circulation</label>
                                <input type="text" value={vehiculeClone.modele} class="form-control" placeholder="Date fin garanti" />
                            </div>
                            <div class="col-md-3">
                                <label>Categorie</label>
                                <input type="text" value={vehiculeClone.numero_ord} class="form-control" placeholder="Categorie" />
                            </div>
                            <div class="col-md-3">
                                <label>Sous categorie</label>
                                <input type="text" value={vehiculeClone.annee} class="form-control" placeholder="Categorie" />
                            </div>
                            <div class="col-md-6">

                            </div>
                            <br />
                            <br />
                            <div class="col-md-12">
                                <h5>Dimension et poids</h5>
                            </div>
                            <hr />
                            <div class="col-md-3">
                                <label>Nomero moteur</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Cylindre</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Nombre de cylindres</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <div class="col-md-3">
                                <label>Disposition</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Type carburant</label>
                                <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero serie" />
                            </div>
                            <div class="col-md-3">
                                <label>Regime moteur</label>
                                <input value={vehiculeClone.numero_ord} type="number" class="form-control" placeholder="2014" />
                            </div>
                            <div class="col-md-3">
                                <label>Consommation carburant</label>
                                <input type="number" value={vehiculeClone.marque} class="form-control" placeholder="2014" />
                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Turbo</label>
                                <input type="text" value={vehiculeClone.modele} class="form-control" placeholder="Date fin garanti" />
                            </div>
                            <div class="col-md-3">
                                <label>Nombre Places</label>
                                <input type="text" value={vehiculeClone.numero_ord} class="form-control" placeholder="Categorie" />
                            </div>
                            <div class="col-md-3">
                                <label>Nombre de portes</label>
                                <input type="text" value={vehiculeClone.annee} class="form-control" placeholder="Categorie" />
                            </div>
                            <div class="col-md-3">
                                <label>Photo</label>
                                <input type="file" value={vehiculeClone.annee} class="form-control" placeholder="Categorie" />
                            </div>
                            <div class="col-md-12">
                                <h5>Moteur</h5>
                            </div>
                            <hr />
                            <div class="col-md-3">
                                <label>Numero moteur</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Cylindre</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Nombre de cylindre</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <div class="col-md-3">
                                <label>Disposition</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Type carburant</label>
                                <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero serie" />
                            </div>
                            <div class="col-md-3">
                                <label>Regime moteur</label>
                                <input value={vehiculeClone.numero_ord} type="number" class="form-control" placeholder="2014" />
                            </div>
                            <div class="col-md-3">
                                <label>Cosommation carburant</label>
                                <input type="number" value={vehiculeClone.marque} class="form-control" placeholder="2014" />
                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Turbo</label>
                                <input type="text" value={vehiculeClone.modele} class="form-control" placeholder="Date fin garanti" />
                            </div>
                            <div class="col-md-12">
                                <h5>Information complementaires</h5>
                            </div>
                            <hr />
                            <div class="col-md-3">
                                <label>Mise en service</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Km initial</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />
                            </div>
                            <div class="col-md-3">
                                <label>Puissance</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <div class="col-md-3">
                                <label>Transmission fiscale</label>
                                <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Climatisation</label>
                                <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero serie" />
                            </div>
                            <div class="col-md-3">
                                <label>Type pneu</label>
                                <input value={vehiculeClone.numero_ord} type="number" class="form-control" placeholder="2014" />
                            </div>
                            <div class="col-md-3">
                                <label>Valeur d'acquisition</label>
                                <input type="number" value={vehiculeClone.marque} class="form-control" placeholder="2014" />
                            </div>
                            <br />
                            <div class="col-md-3">
                                <label>Lubrifiant</label>
                                <input type="text" value={vehiculeClone.modele} class="form-control" placeholder="Date fin garanti" />
                            </div>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <button class="btn btn-primary"> Enregistrer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clonage;