import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


const Vehicule_vehicule = () => {
    const [num_ref, setnum_ref] = useState("");
    const [marqu, setmarqu] = useState("");
    const [model, setmodel] = useState("");
    const [num_serie, setnum_serie] = useState("");
    const [anne_fab, setanne_fab] = useState("");
    const [anne_mise, setanne_mise] = useState("");
    const [date_fin, setdate_fin] = useState("");
    const [photo, setphoto] = useState("");
    const [longeur, setlongeur] = useState("");
    const [largeur, setlargeur] = useState("");
    const [hauteur, sethauteur] = useState("");
    const [poid, setpoid] = useState("");
    const [capacite_carb, setcapacite_carb] = useState("");
    const [capacite_radia, setcapacite_radia] = useState("");
    const [capacite_carter, setcapacite_carter] = useState("");
    const [valeur_ac, setvaleur_ac] = useState("");
    const [nombre_cilyndre, setnombre_cilyndre] = useState("");
    const [disposition, setdisposition] = useState("");
    const [type_carb, settype_carb] = useState("");
    const [regime, setregime] = useState("");
    const [consommation, setconsommation] = useState("");
    const [refroidissement, setrefroidissement] = useState("");
    const [puissance_ac, setpuissance_ac] = useState("");
    const [pression_ac, setpression_ac] = useState("");
    const [puissance_n, setpuissance_n] = useState("");
    const [puissance_sec, setpuissance_sec] = useState("");
    const [frequence, setfrequence] = useState("");
    const [tension, settension] = useState("");
    const [nmb_phase, setnmb_phase] = useState("");
    const [tension_bat, settention_bat] = useState("");
    const [cos, setcos] = useState("");
    const [demarrage, setdemarrage] = useState("");
    const [sortie, setsortie] = useState("");
    const [lubrifiant, setlubrifiant] = useState("");
    let token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.REACT_APP_SERVICE_API}vahicule/`;
    const [marques, setmarques] = useState([]);
    const [marque, setmarque] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [type_carbs, settype_carbs] = useState([]);
    const [type_huile_mots, settype_huile_mots] = useState([]);
    const [type_refroidissement, settype_refroidissements] = useState([]);
    const [frequance_maintenance, setfrequance_maintenance] = useState([]);
    const [type_demarrage, settype_demarrage] = useState([]);


    const Enregistrer = () => {
        axios.post(url, {
                
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
                    text: 'Success',
                    confirmButtonText: 'OK'
                });

            }).catch((err) => {
                if (err.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Le numero de bon  existe',
                        confirmButtonText: 'OK'
                    });
                } else if (err.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Erreur du serveur',
                        confirmButtonText: 'OK'
                    });
                } else if (err.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Veuillez remplire tous les champs !!!',
                        confirmButtonText: 'OK'
                    });
                }

            });
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}marque_gen`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmarques(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_carburant`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_carbs(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_huile_mot`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_huile_mots(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_refroidissement`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_refroidissements(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}frequance_maintenance`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setfrequance_maintenance(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_demarrage`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_demarrage(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    }, [])


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        axios.get(`${process.env.REACT_APP_SERVICE_API}marque_gen_model/${selectedValue}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmarque(response.data.data);
        }).catch((err) => {
            alert(err);
        })
    };

    const handeleOptionChnage = (event) => {
        setsortie(event.target.value);
    }
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h1>EREGISTREMENT NOUVEAU GROUPE ELECTRONIQUE</h1>
                    <div class="row">
                        <div class="col-md-3">
                            <label>Numerod de ref</label>
                            <input type="text" onChange={(e) => setnum_ref(e.target.value)} class="form-control" placeholder="Numero de ref" />
                        </div>
                        <div class="col-md-3">
                            <label>Marque</label>
                            <select className="form-control" onChange={handleChange}>
                                {
                                    marques.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.Marque}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Model</label>
                            <select className="form-control" onChange={(e) => setmodel(e.target.value)}>
                                {
                                    marque.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.model}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Numero serie</label>
                            <input type="text" onChange={(e) => num_serie(e.target.value)} class="form-control" placeholder="Numero serie" />
                        </div>
                        <div class="col-md-3">
                            <label>Annee fabrication</label>
                            <input type="number" onChange={(e) => setanne_fab(e.target.value)} class="form-control" placeholder="2014" />
                        </div>
                        <div class="col-md-3">
                            <label>Annee mise en service</label>
                            <input type="number" onChange={(e) => setanne_mise(e.target.value)} class="form-control" placeholder="2014" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Date fin garanti</label>
                            <input type="text" onChange={(e) => setdate_fin(e.target.value)} class="form-control" placeholder="Date fin garanti" />
                        </div>
                        <div class="col-md-3">
                            <label>Image</label>
                            <input type="file" onChange={(e) => setphoto(e.target.value)} class="form-control" placeholder="Categorie" />
                        </div>
                        <div class="col-md-9">
                        </div>
                        <br />
                        <h5>Dimension et poids</h5>
                        <div class="col-md-3">
                            <label>Longeur</label>

                            <input type="text" onChange={(e) => setlongeur(e.target.value)} class="form-control" placeholder="Longeur" />
                        </div>
                        <div class="col-md-3">
                            <label>Largeur</label>

                            <input type="text" onChange={(e) => setlongeur(e.target.value)} class="form-control" placeholder="Largeur" />
                        </div>
                        <div class="col-md-3">
                            <label>Hauteur</label>

                            <input type="text" onChange={(e) => sethauteur(e.target.value)} class="form-control" placeholder="Hauteur" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Poids</label>

                            <input type="text" onChange={(e) => setpoid(e.target.value)} class="form-control" placeholder="Poids" />
                        </div>
                        <div class="col-md-3">
                            <label>Capacité carburant</label>

                            <input type="number" onChange={(e) => setcapacite_carb(e.target.value)} class="form-control" placeholder="Capacité carburant" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Capacité radiateur</label>

                            <input type="number" onChange={(e) => setcapacite_radia(e.target.value)} class="form-control" placeholder="Capacite radiateur" />
                        </div>
                        <div class="col-md-3">
                            <label>Capacité carter</label>

                            <input type="number" class="form-control" onChange={(e) => setcapacite_carter(e.target.value)} placeholder="Capacité carter" />
                        </div>
                        <div class="col-md-3">
                            <label>Valeur d'acquisition</label>

                            <input type="number" class="form-control" onChange={(e) => setvaleur_ac(e.target.value)} placeholder="Nombre de places" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <h5>Moteur</h5>
                        <div class="col-md-3">
                            <label>Nombre de Cylindre</label>
                            <input type="text" onChange={(e) => setnombre_cilyndre(e.target.value)} class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label>Disposition Cylindre</label>
                            <input type="text" class="form-control" onChange={(e) => setdisposition(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Carburant</label>
                            <select className="form-control" onChange={(e) => settype_carb(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_carbs.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.nom_carb}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Lubrifiant recommandée</label>
                            <select className="form-control" onChange={(e) => setlubrifiant(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_huile_mots.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.nom}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Regime moteur</label>
                            <select className="form-control" onChange={(e) => setregime(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_huile_mots.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.nom}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Consommation carb.</label>
                            <input type="text" class="form-control" onChange={(e) => setconsommation(e.target.value)}/>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Refroidissement</label>
                            <select className="form-control" onChange={(e) => setrefroidissement(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_refroidissement.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.detail_type}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Puissance accoustique</label>
                            <input type="text" class="form-control"onChange={(e) => setpuissance_ac(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Pression accoustique</label>
                            <input type="text" class="form-control" onChange={(e) => setpression_ac(e.target.value)}/>
                        </div>
                        <br />
                        <h5>Moteur</h5>
                        <div class="col-md-3">
                        <label>Puissance</label>

                            <input type="text" class="form-control" onChange={(e) => setpuissance_n(e.target.value)}/>
                        </div>
                        <div class="col-md-3">
                        <label>Puissance de secours</label>

                            <input type="text" class="form-control" onChange={(e) => setpuissance_sec(e.target.value)}/>
                        </div>
                        <div class="col-md-3">
                        <label>Frequence</label>

                        <select className="form-control" onChange={(e) => setfrequence(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    frequance_maintenance.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.libel_op}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                        <label>Tension</label>

                        <select className="form-control" onChange={(e) => settension(e.target.value)}>
                                <option>--Choisir--</option>
                                <option value="230" key="230">230 Volts</option>
                                <option value="400" key="400">400 Volts</option>
                                
                            </select>
                        </div>
                        <div class="col-md-3">
                        <label>Nombre de phases</label>

                        <select className="form-control" onChange={(e) => setnmb_phase(e.target.value)}>
                                <option>--Choisir--</option>
                                <option value="230" key="230">230 Volts</option>
                                <option value="400" key="400">400 Volts</option>
                                
                            </select>
                        </div>
                        <div class="col-md-3">
                        <label>Tension batterie</label>

                        <select className="form-control" onChange={(e) => settention_bat(e.target.value)}>
                                <option>--Choisir--</option>
                                <option value="230" key="230">230 Volts</option>
                                <option value="400" key="400">400 Volts</option>
                                
                            </select>
                        </div>
                        <div class="col-md-3">
                        <label>Cos-phi</label>

                            <input type="text" class="form-control" />
                        </div>
                        <div class="col-md-3">
                        <label>Demarrage</label>

                        <select className="form-control" onChange={(e) => setdemarrage(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_demarrage.map((mp) => {
                                        return (
                                            <option value={mp.id} key={mp.id}>{mp.det_type}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                        <label>Sortie 12 Vois</label><br />

                            <input 
                                type="radio"  
                                value="Oui"
                                checked={sortie === 'Oui'}
                                onChange={handeleOptionChnage}
                            />Oui
                            &nbsp;
                            &nbsp;
                            <input 
                                type="radio"  
                                value="Non"
                                checked={sortie === 'Non'}
                                onChange={handeleOptionChnage}
                            />Non
                        </div>
                    </div>
                    <br />
                    <div class="col-md-3">
                        <button class="btn btn-primary" onClick={Enregistrer}> Enregistrer Generateur</button>
                    </div>
                </div>
            </div>
        </>
    );
}

