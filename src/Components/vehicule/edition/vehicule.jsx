import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


const Vehicule_vehicules = () => {
    const [immatriculation, setimmatriculation] = useState("");
    const [num_ordre, setnum_ordre] = useState("");
    const [marquec, setmarquec] = useState("");
    const [modele, setmodel] = useState("");
    const [variante, setvariante] = useState("");
    const [numero_class, setnumero_class] = useState("");
    const [ann_fab, setanne_fab] = useState("");
    const [mise_circ, setmise_circ] = useState("");
    const [categorie, setcategorie] = useState("");
    const [souscategorie, setsouscategorie] = useState("");
    const [longeur, setlongeur] = useState("");
    const [largeur, setlargeur] = useState("");
    const [hauteur, sethauteur] = useState("");
    const [poid, setpoid] = useState("");
    const [couleur, setcouleur] = useState("");
    const [capacite_carb, setcapacite_carb] = useState("");
    const [capacite_rad, setcapacite_rad] = useState("");
    const [capacite_carter, setcapacite_carter] = useState("");
    const [nombre_place, setnombre_place] = useState("");
    const [nombre_porte, setnombre_porte] = useState("");
    const [photo, setphoto] = useState("");
    const [numero_moteur, setnumero_monteur] = useState("");
    const [cylindre, setcylindre] = useState("");
    const [nombre_cylindre, setnombre_cilyndre] = useState("");
    const [disposition, setdisposition] = useState("");
    const [type_carburant, settype_ca] = useState("");
    const [regime_moteur, setregime_moteur] = useState("");
    const [consommation_carb, setconsommation_carb] = useState("");
    const [mise_service, setmise_service] = useState("");
    const [km, setkm] = useState("");
    const [puissance, setpuissance] = useState("");
    const [transmission_fiscale, settransmission_fiscal] = useState("");
    const [climatisation, setclimation] = useState("");
    const [type_pneu, setty_pneu] = useState("");
    const [valeur_ac, setvaleur_ac] = useState("");
    const [lubrifiant, setlubrifiant] = useState("");
    let token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.REACT_APP_SERVICE_API}vehicule`;
    const [marques, setmarques] = useState([]);
    const [marquex, setmarquex] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [type_carbs, settype_carbs] = useState([]);
    const [type_huile_mots, settype_huile_mots] = useState([]);
    const [type_refroidissement, settype_refroidissements] = useState([]);
    const [frequance_maintenance, setfrequance_maintenance] = useState([]);
    const [type_demarrage, settype_demarrage] = useState([]);
    const [modelss, setmodelss] = useState([]);
    const [modelstyle, setmodelstyle] = useState('none');
    const [marquess, setmarquess] = useState([]);
    const [categorie_vehicule, setcategorie_vehicule] = useState([]);
    const [souscategories, setsouscategories] = useState('none');
    const [souscategoriess, setsouscategoriess] = useState([]);
    const [loadingE, setloadingE] = useState(false);
    const [imageBase64, setImageBase64] = useState('');



    // immatr, anne, mise cir, nombre de place, nombre de porte, mise en service

    const Enregistrer = () => {
        setloadingE(true)
        axios.post(url, {
            'immatriculation': immatriculation,
            'numero_ord': num_ordre,
            'id_marque': marquec,
            'id_modele': modele,
            'variante': variante,
            'chassis': numero_class,
            'anne_fab': ann_fab,
            'anne_circ': mise_circ,
            'categorie': categorie,
            'type_permi_veh': 'type_permi_veh',
            'foto': imageBase64,
            'longueur': longeur,
            'largeur': largeur,
            'taille': 'taille',
            'poids': poid,
            'couleur': couleur,
            'Qmax': 'required',
            'cap_rad': capacite_rad,
            'cap_carter_veh': capacite_carter,
            'nbre_place': nombre_place,
            'nbre_port': nombre_porte,
            'num_mot': numero_moteur,
            'cylindre_circ': cylindre,
            'nbre_cyl': nombre_cylindre,
            'disposition_cyl': disposition,
            'type_carb': type_carburant,
            'regim_mot_veh': regime_moteur,
            'cons_carb_veh': consommation_carb,
            'turbo': '-',
            'km_initial': km,
            'nbre_chev': '-',
            'transm': transmission_fiscale,
            'clim': climatisation,
            'pneus': type_pneu,
            'valeur_acq': valeur_ac,
            'lubri_mot': lubrifiant,
            'etat': '1',
            'modele': modele,
            'marque': marquec,
            'id_veh': immatriculation
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
                text: `${response.data.message}`,
                confirmButtonText: 'OK'
            });
            setloadingE(false)

        }).catch((err) => {
            if (err.response.status === 403) {
                Swal.fire({
                    icon: 'error',
                    text: 'Le numero de bon  existe',
                    confirmButtonText: 'OK'
                });
                setloadingE(false)
            } else if (err.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    text: 'Erreur du serveur',
                    confirmButtonText: 'OK'
                });
                setloadingE(false)
            } else if (err.response.status === 422) {
                Swal.fire({
                    icon: 'error',
                    text: `${err.response.data.message}`,
                    confirmButtonText: 'OK'
                });
                setloadingE(false)
            } else {
                alert(err)
                setloadingE(false)
            }

        });
    }

    //marque 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}marque`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmarquess(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const handelOnchangeMarque = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}model/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmodelss(response.data.data);
            setmodelstyle(modelstyle === 'none' ? 'block' : 'none')

        }).catch((error) => {
            alert(error)
        })
    }

    //cotegorie
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}categorie_vehicule`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setcategorie_vehicule(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const handeleSousCategorie = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}s_categorie_veh/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            alert(event)
            setsouscategoriess(response.data.data);
            setsouscategories(souscategories === 'none' ? 'block' : 'none')
        }).catch((error) => {
            alert(error)
        })
    }
    //couleur
    const [couleurs, setcouleurs] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}couleur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setcouleurs(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //type de cylindre
    const [type_cylindre, settype_cylindre] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_cylindre_veh`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_cylindre(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //disposition 
    const [disposition_cylindre, setdisposition_cylindre] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}disposition_cylindre`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setdisposition_cylindre(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //type de carburant
    const [type_carburants, settype_carburants] = useState([])
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
            settype_carburants(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //transmission
    const [transmission, settransmission] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}transmission`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settransmission(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //type climatisation
    const [type_climatisation, settype_climatisation] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_climatisation`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_climatisation(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //type de pneu
    const [type_pneus, settype_pneus] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_pneu`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settype_pneus(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //type d'huile 
    const [type_huile, settype_huile] = useState([])
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
            settype_huile(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            setImageBase64(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h3 className="text-center">EREGISTREMENT UN NOUVEAU VEHICULE</h3>
                    <h5>Identification</h5>
                    <hr />
                    <div class="row">
                        <div class="col-md-3">
                            <label>Immatriculation</label>
                            <input type="text" class="form-control" onChange={(e) => setimmatriculation(e.target.value)} placeholder="Numero serie" />
                        </div>
                        <div class="col-md-3">
                            <label>Numero ordre de ref</label>
                            <input type="text" onChange={(e) => setnum_ordre(e.target.value)} class="form-control" placeholder="Numero de ref" />
                        </div>
                        <div class="col-md-3">
                            <label>Marque</label>
                            <select className="form-control" onChange={(e) => { setmarquec(e.target.value); handelOnchangeMarque(e.target.value) }}>
                                <option>--Choissisez une marque</option>
                                {
                                    marquess.map((mod) => {
                                        return (
                                            <option value={mod.id} key={mod.id}>{mod.marque}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3" >
                            <label>Modele</label>
                            <select onChange={(e) => setmodel(e.target.value)} className="form-control" style={{ display: modelstyle }}>
                                {
                                    modelss.map((modeles) => {
                                        return (
                                            <option>{modeles.modele}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Variante</label>
                            <input type="text" onChange={(e) => setvariante(e.target.value)} class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label>Numero chassis</label>
                            <input type="text" onChange={(e) => setnumero_class(e.target.value)} class="form-control" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Annee de fabrication</label>
                            <input type="number" class="form-control" onChange={(e) => setanne_fab(e.target.value)} placeholder="2014" />
                        </div>
                        <div class="col-md-3">
                            <label>Mise en circulation</label>
                            <input type="number" class="form-control" onChange={(e) => setmise_circ(e.target.value)} placeholder="2014" />
                        </div>
                        <div class="col-md-3">
                            <label>Categorie</label>
                            <select className="form-control" onChange={(e) => { setcategorie(e.target.value); handeleSousCategorie(e.target.value) }}>
                                <option>--Choisir--</option>
                                {
                                    categorie_vehicule.map((catv) => {
                                        return (
                                            <option value={catv.id} key={catv.id}>{catv.nom_cat}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Sous categorie</label>
                            <select className="form-control" onChange={(e) => setsouscategorie(e.target.value)} style={{ display: souscategories }}>
                                {
                                    souscategoriess.map((cousCat) => {
                                        return (
                                            <option value={cousCat.id} key={cousCat.id}>{cousCat.nom_scat_veh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-9">

                        </div>
                        <br />
                        <h5>Dimension et poids</h5>
                        <hr />
                        <div class="col-md-3">
                            <label>Longeur</label>
                            <input type="number" onChange={(e) => setlongeur(e.target.value)} class="form-control" placeholder="Longeur" />
                        </div>
                        <div class="col-md-3">
                            <label>Largeur</label>

                            <input type="number" onChange={(e) => setlargeur(e.target.value)} class="form-control" placeholder="Largeur" />
                        </div>
                        <div class="col-md-3">
                            <label>Hauteur</label>

                            <input type="number" onChange={(e) => sethauteur(e.target.value)} class="form-control" placeholder="Hauteur" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Poids</label>
                            <input type="number" onChange={(e) => setpoid(e.target.value)} class="form-control" placeholder="Poids" />
                        </div>
                        <div class="col-md-3">
                            <label>Couleur</label>
                            <select className="form-control" onChange={(e) => setcouleur(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    couleurs.map((couls) => {
                                        return (
                                            <option value={couls.id} key={couls.id}>{couls.nom_coul}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Capacité carburant</label>
                            <input type="number" onChange={(e) => setcapacite_carb(e.target.value)} class="form-control" placeholder="Capacité carburant" />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Capacité radiateur</label>
                            <input type="number" onChange={(e) => setcapacite_rad(e.target.value)} class="form-control" placeholder="Capacite radiateur" />
                        </div>
                        <div class="col-md-3">
                            <label>Capacité carter</label>
                            <input type="number" onChange={(e) => setcapacite_carter(e.target.value)} class="form-control" placeholder="Capacité carter" />
                        </div>
                        <div class="col-md-3">
                            <label>Nombre de places</label>
                            <input type="number" onChange={(e) => setnombre_place(e.target.value)} class="form-control" placeholder="Nombre de places" />
                        </div>
                        <div class="col-md-3">
                            <label>Nombre de portes</label>
                            <input type="number" onChange={(e) => setnombre_porte(e.target.value)} class="form-control" placeholder="Nombre de places" />
                        </div>
                        <div class="col-md-3">
                            <label>Photo</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} class="form-control" placeholder="Nombre de places" />
                        </div>
                        <div class="col-md-3">
                            <label>Image</label>
                            <br />
                            <img src={imageBase64} alt="Uploaded" style={{ maxWidth: '200px' }} />
                        </div>

                        <h5>Moteur</h5>
                        <hr />
                        <div class="col-md-3">
                            <label>Nombre de moteur</label>
                            <input type="number" class="form-control" onChange={(e) => setnumero_monteur(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label> Cylindre</label>
                            <input type="number" class="form-control" onChange={(e) => setcylindre(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Nombre de cylindre</label>
                            <select className="form-control" onChange={(e) => setnombre_cilyndre(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_cylindre.map((type_c) => {
                                        return (
                                            <option value={type_c.id} key={type_c.id}>{type_c.det_cyl_veh} Cylindre</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Disposition</label>
                            <select className="form-control" onChange={(e) => setdisposition(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    disposition_cylindre.map((dis) => {
                                        return (
                                            <option value={dis.id} key={dis.id}>{dis.detail_dispo}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Type carburant</label>
                            <select className="form-control" onChange={(e) => settype_ca(e.target.value)} >
                                <option>--Choisir--</option>
                                {
                                    type_carburants.map((type_cs) => {
                                        return (
                                            <option value={type_cs.id} key={type_cs.id}>{type_cs.nom_carb}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Regime moteur</label>
                            <input type="text" class="form-control" onChange={(e) => setregime_moteur(e.target.value)} />
                        </div>
                        <br />
                        <div class="col-md-3">
                            <label>Consommation carburant</label>
                            <input type="text" class="form-control" onChange={(e) => setconsommation_carb(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Turbo</label><br />
                            <input type="radio" />Oui &nbsp;&nbsp;
                            <input type="radio" />Non
                        </div>
                        <br />
                        <h5>Information complementaires</h5>
                        <hr />
                        <div class="col-md-3">
                            <label>Mise en service</label>
                            <input type="text" class="form-control" onChange={(e) => setmise_service(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Km initial</label>
                            <input type="text" class="form-control" onChange={(e) => setkm(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Puissance</label>
                            <input type="text" class="form-control" onChange={(e) => setpuissance(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Transmission fiscale</label>
                            <select className="form-control" onChange={(e) => settransmission_fiscal(e.target.value)}>
                                <option>-Choisir--</option>
                                {
                                    transmission.map((trans) => {
                                        return (
                                            <option value={trans.id} key={trans.id}>{trans.typ_transm}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Climatisation</label>
                            <select className="form-control" onChange={(e) => setclimation(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_climatisation.map((typecli) => {
                                        return (
                                            <option value={typecli.id} key={typecli.id}>{typecli.type_clim}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Type de pneu</label>
                            <select className="form-control" onChange={(e) => setty_pneu(e.target.value)}>
                                <option>--Choisir--</option>
                                {
                                    type_pneus.map((typeP) => {
                                        return (
                                            <option value={typeP.detail_pneu} key={typeP.id}>{typeP.detail_pneu}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Valeur d'acquisision</label>
                            <input type="text" class="form-control" onChange={(e) => setvaleur_ac(e.target.value)} />
                        </div>
                        <div class="col-md-3">
                            <label>Lubrifiant</label>
                            <select className="form-control" onChange={(e) => setlubrifiant(e.target.value)}>
                                {
                                    type_huile.map((tyeph) => {
                                        return (
                                            <option value={tyeph.id} key={tyeph.id}>{tyeph.type}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <br />


                    <div class="modal-footer">
                        {
                            loadingE === true && (
                                <p><i style={{ fontSize: '35px' }} className="fa fa-spinner fa-pulse text-primary" ></i></p>
                            )
                        }
                        <button onClick={Enregistrer} class="btn btn-primary" > Enregistrer</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Vehicule_vehicules;