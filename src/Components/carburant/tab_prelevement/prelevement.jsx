import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import dateFormat from 'dateformat';


const Prelevement = () => {
    //formulaire
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [numBon, setnumBon] = useState("");
    const [immatriculation, setimmatriculation] = useState("");
    const [Qte, setQte] = useState("");
    const [kilometrage, setkilometrage] = useState("");
    const [chauffeurs, setchauffeurs] = useState("");
    const [dates, setDates] = useState("");
    const [carburantt, setcarburantt] = useState("");
    const [commentaire, setcommentaire] = useState("NULL");
    const [loading, setLoading] = useState(true);
    const [loadingD, setloadingD] = useState(false);
    const [update, setupdate] = useState([]);
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [dispat_caburant, setdispat_caburant] = useState("none");
    const [numBonss, setnimBonss] = useState('');


    //condition pour le formulaire
    const updatePrelevements = '${process.env.REACT_APP_SERVICE_API}plein';
    const url = `${process.env.REACT_APP_SERVICE_API}plein`
    const Enregistrer = () => {
        if (Qte == "" || kilometrage == "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplire tous les champs svp !!!',
                confirmButtonText: 'OK'
            })
        } else {
            //alert(numBonss +"*"+ Qte + "*"+ kilometrage  + "*" + carburantt + "*" + commentaire + "*"+ dates +"*"+ selectedVehicule  +"*"+ chauffeurs);
            // alert(url + numBonss +"/"+ Qte + "/"+ kilometrage  + "/" + carburantt + "/" + commentaire + "/"+ dates +"/"+ selectedVehicule  +"/"+ chauffeurs )
            axios.post(url, {
                immatriculation: selectedVehicule,
                date_plein: dates,
                qteplein: Qte,
                kilometrage: kilometrage,
                type_carb: carburantt,
                matricule_ch: chauffeurs,
                observation: commentaire,
                id_veh: selectedVehicule,
                id_chauf: chauffeurs,
                num: numBonss,
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
            ).then((response) => {
                Swal.fire({
                    icon: 'success',
                    text: 'OPERATION EFFECTUEE AVEC SUCCES',
                    confirmButtonText: 'OK'
                });

            }).catch((err) => {
                if (err.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        text: `${err.response.data.message}`,
                        confirmButtonText: 'OK'
                    });
                } else if (err.response.status === 500) {
                    Swal.fire({
                        imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
                        imageWidth: 200,
                        imageHeight: 200,
                        text: 'Erreur de la connexion !!!',
                        confirmButtonText: 'OK'
                    })
                } else if (err.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Veuillez rempliress tous les champs !!!',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert(err)
                }

            });
        }
    }



    //affichage
    const siteSession = localStorage.getItem("siteSession");

    const [pleinx, setplainx] = useState([]);
    const [chauffeur, setchauffeur] = useState([]);
    const [vehicule, setvehicule] = useState([]);
    let n = 1;
    const [datasite, setDatasite] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}pleinLimite/${siteSession}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(response => {
                setplainx(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}chauffeur/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setchauffeur(response.data.data);
            setLoading(false);
        }).catch((error) => {

        })
    }, [])
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
            setvehicule(response.data.data);
            setLoading(false);
        }).catch((error) => {

        })
    }, [])
    const TableauCarburant = [
        { 'nom': "Essence" },
        { 'nom': "ga" },
    ];

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}plein/${id}`;
        axios.get(urlDetail,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setupdate(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }

    const Deleteprelevement = (id) => {
        setloadingD(true)
        axios.delete(`${process.env.REACT_APP_SERVICE_API}plein/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            Swal.fire({
                icon: 'success',
                text: 'Success',
                confirmButtonText: 'OK'
            });
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }
    const [vehicule_veh, setvehicule_veh] = useState([]);
    const [essance, setessance] = useState("");
    const [loadingV, setloadingV] = useState(false);
    const [titreModel, setTitreModel] = useState({});
    const handleChange = (e) => {
        setSelectedVehicule(e.value);
        setloadingV(true);

        axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule_vehicule/${e.value}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
            .then((response) => {
                setvehicule_veh(response.data.data);
                const titre = response.data.data.map(t => ({ nom_carb: t.nom_carb, marque: t.marque, modele: t.modele }));
                setTitreModel(titre[0]);
                setloadingV(false);
                setdispat_caburant(dispat_caburant === 'none');
            })
            .catch((error) => {
                alert(error);
                setloadingV(false);
            });
    };
    const autocompleteVehicule = () => {
        const options = vehicule.map((vh) => ({
            label: vh.immatriculation + " " + vh.marque,
            value: vh.immatriculation,
        }));
        return (
            <Select
                options={options}
                onChange={handleChange}
            />
        );
    };
    const [isDisabled, setIsDisabled] = useState(false);
    const handleDisable = () => {
        setIsDisabled(true);
    }

    const [numBons, setnimBons] = useState('');
    const handelVerifi = (numBon) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}verifieNumBon/${numBon}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setnimBons(response.data.message);
        }).catch((error) => {

        })
    }


    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <h3 className="text-center">ENREGISTREMENT PLEIN VEHICULE</h3>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label for="">Numero de bon</label>
                                            <input type="number" onChange={(e) => { handelVerifi(e.target.value); setnimBonss(e.target.value) }} className="form-control" />
                                            <p style={{ color: 'red' }}>{numBons}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Immatriculation</label>
                                            {autocompleteVehicule()}
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Date</label>
                                            <input type="date" onChange={(e) => setDates(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Quantité</label>
                                            <input type="number" onChange={(e) => setQte(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Kilometrage</label>
                                            <input type="number" onChange={(e) => setkilometrage(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Chauffeur</label>
                                            <select value={chauffeurs} onChange={(e) => setchauffeurs(e.target.value)} className="form-control">
                                                <option>---Choissir un chauffeur---</option>
                                                {
                                                    chauffeur.map((e) => {
                                                        return (
                                                            <option key={e.id} value={e.id}>{e.nom}{e.prenom}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6" >
                                            <label for="">Carburant</label><br />
                                            <select desabled value={carburantt} className="form-control" onChange={(e) => setcarburantt(e.target.value)}>
                                                {
                                                    vehicule_veh.map((df) => {
                                                        return (
                                                            <option value={df.id} key={df.id}>{df.nom_carb}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Commentaire</label>
                                            <textarea name="" id="" onChange={(e) => setcommentaire(e.target.value)} cols="10" rows="3" className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" onClick={Enregistrer} className="btn btn-primary"><i className="fa fa-plus"></i> Enregistrer Plein</button>
                                </div>
                            </div>
                            <div className="col-md-6">

                                <h6>::Tableau de Bord::</h6>
                                <table
                                    id="example" className="table table-striped"
                                >
                                    <thead>
                                        <tr style={{ background: 'silver' }}>
                                            <th>Num</th>
                                            <th>immatriculation</th>
                                            <th>Qte</th>
                                            <th>Km</th>
                                            <th>Date</th>
                                            <th>Utilisateur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pleinx.map((e) => {
                                                return (
                                                    <tr>

                                                        <td>{e.num}</td>
                                                        <td>{e.immatriculation}</td>
                                                        <td>{e.qteplein}</td>
                                                        <td>{e.kilometrage}</td>
                                                        <td>{dateFormat(e.date_plein, "dd-mm-yyyy")}</td>
                                                        <td>{e.nom}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                <center>
                                    {
                                        loading === true && (
                                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                        )
                                    }
                                </center>
                                <center>
                                    {
                                        loadingV === true && (
                                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                        )
                                    }
                                </center>
                                <div className="col-md-12" style={{ display: dispat_caburant }}>
                                    <div style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}>
                                        <h6 className="text-center">{titreModel.marque} {titreModel.modele} ({titreModel.nom_carb})</h6>
                                        <table id="example" className="table table-striped">
                                            <thead>
                                                <tr style={{ background: 'silver' }}>
                                                    <th>Num</th>
                                                    <th>immatriculation</th>
                                                    <th>Qte</th>
                                                    <th>Km</th>
                                                    <th>Date</th>
                                                    <th>Utilisateur</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vehicule_veh.map((vehicule_vehs) => {
                                                    return (
                                                        <tr key={vehicule_vehs.num}> {/* Ajout de la clé unique pour chaque élément de la liste */}
                                                            <td>{vehicule_vehs.num}</td>
                                                            <td>{vehicule_vehs.immatriculation}</td>
                                                            <td>{vehicule_vehs.qteplein}</td>
                                                            <td>{vehicule_vehs.kilometrage}</td>
                                                            <td>{dateFormat(vehicule_vehs.date_plein, "dd-MM-yyyy")}</td> {/* Correction du format de la date */}
                                                            <td>{vehicule_vehs.nom}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="addadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Prelevement + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updatePrelevements" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update  </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center>
                                {
                                    loadingD === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 20 }} ></i></p>
                                    )
                                }
                            </center>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="">Immatriculation</label><br />
                                    <input type="text" value={update.immatriculation} className="form-control" />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Date plein</label><br />
                                    <input type="text" value={update.date_plein} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Quantite</label><br />
                                    <input type="text" value={update.qteplein} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Kilometrage</label><br />
                                    <input type="text" value={update.kilometrage} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Type carburant</label><br />
                                    <input type="text" value={update.type_carb} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Chauffeur</label><br />
                                    <input type="text" value={update.matricule_ch} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Observation</label><br />
                                    <input type="text" value={update.observation} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Prelevement;