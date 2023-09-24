import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const Affiche_vehicule = () => {
    const [vehicule, setvehicule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingD, setloadingD] = useState(true);
    const [update, setupdate] = useState([]);
    let token = `Bearer ${localStorage.getItem("token")}`;
    const siteSession = localStorage.getItem("siteSession");
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

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}vehiculeID/${id}`;
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
    const DeleteVehicule = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cette vehicule ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Non, annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_SERVICE_API}vehicule/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Success',
                    });
                    window.location.reload();
                }).catch((error) => {
                    alert(error)
                })
            }
        });
        
    }


    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 46;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = vehicule
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>{e.numero_ord}</td>
                    <td>{e.immatriculation}</td>
                    <td>{e.marque}</td>
                    <td>{e.modele}</td>
                    <td>{e.anne_fab}</td>
                    <td>{e.categorie}</td>
                    <td>{e.nom_site}</td>
                    <td>
                        <button onClick={() => Clonnage(e.id)} data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg" className="btn btn-primary">Clonner</button>
                    </td>
                    <td>
                        <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#Details" className="btn btn-primary"><i className="mdi mdi-eye"></i></button>
                    </td>
                    <td>
                        <button onClick={() => DeleteVehicule(e.id)} className="btn btn-danger"><i className="mdi mdi-delete"></i></button> &nbsp;
                        <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#Detail" className="btn btn-primary"><i className="fa fa-edit"></i></button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(vehicule.length / pleinPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    let active = pageNumber;
    let items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setPageNumber(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }
    const [vehiculeClone, setvehiculeClone] = useState([])
    const Clonnage = (id) => {
        setloadingD(true)
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
            setloadingD(false)
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
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="text-center">LISTE DES VEHICULES</h4>
                    <hr />
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Num. ord</th>
                                    <th>Immatriculation</th>
                                    <th>Marque</th>
                                    <th>Modèle</th>
                                    <th>Année</th>
                                    <th>Categorie</th>
                                    <th>Affectation</th>
                                    <th>Clonage</th>
                                    <th>Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayPlein}
                            </tbody>
                        </table>
                        <Pagination>{items}</Pagination>;
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

            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier  </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Identification</h5>
                            <hr />
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Immatriculation</label>
                                    <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero de ref" />
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
                                        <option>{vehiculeClone.modele}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Variante</label>
                                    <input type="text" value={vehiculeClone.variante} class="form-control" placeholder="Numero serie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Numero chassis</label>
                                    <input value={vehiculeClone.chassis} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Année de fabrication</label>
                                    <input type="number" value={vehiculeClone.anne_fab} class="form-control" placeholder="2014" />
                                </div>anne_fab
                                <br />
                                <div class="col-md-3">
                                    <label>Mise en circulation</label>
                                    <input type="text" value={vehiculeClone.anne_circ} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Categorie</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.categorie}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Sous categorie</label>
                                    <input type="text" value={vehiculeClone.categorie} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-6">

                                </div>
                                <br />
                                <div class="col-md-12">
                                    <h5>Dimension et poids</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Longeur</label>
                                    <input type="number" value={vehiculeClone.longeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Largeur</label>
                                    <input type="number" value={vehiculeClone.largeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Hauteur</label>
                                    <input type="number" value={vehiculeClone.nbre_cyl} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Poids</label>
                                    <input type="number" value={vehiculeClone.poids} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Couleur</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.couleur}</option>
                                        {
                                            couleurs.map((cour) => {
                                                return (
                                                    <option value={cour.id} key={cour.id}>{cour.nom_coul}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité carburant</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité radiateur</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Capacité carter</label>
                                    <input type="text" value={vehiculeClone.cap_rad} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre Places</label>
                                    <input type="text" value={vehiculeClone.nbre_place} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de portes</label>
                                    <input type="text" value={vehiculeClone.nbre_port} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Photo</label>
                                    <input type="file" class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <img src={vehiculeClone.foto} alt={vehiculeClone.foto} style={{ maxWidth: '200px' }} />
                                </div>
                                <div class="col-md-12">
                                    <h5>Moteur</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Numero moteur</label>
                                    <input type="number" value={vehiculeClone.num_mot} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.cylindre_circ}</option>
                                        {
                                            type_cylindre.map((typecl) => {
                                                return (
                                                    <option value={typecl.id} key={typecl.id}>{typecl.det_cyl_veh} Cylindre</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.nbre_cyl}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Disposition</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.disposition_cyl}</option>
                                        {
                                            disposition_cylindre.map((dispcy) => {
                                                return (
                                                    <option value={dispcy.id} key={dispcy.id}>{dispcy.detail_dispo}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Type carburant</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.type_carb}</option>
                                        {
                                            type_carburants.map((typecarb) => {
                                                return (
                                                    <option value={typecarb.id} key={typecarb.id}>{typecarb.nom_carb}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Regime moteur</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cosommation carb</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Turbo</label>
                                    <input type="text" value={vehiculeClone.turbo} class="form-control" placeholder="Date fin garanti" />
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
                                    <input type="number" value={vehiculeClone.km_initial} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Puissance</label>
                                    <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Transmission fiscale</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.transm}</option>
                                        {
                                            transmission.map((transmi) => {
                                                return (
                                                    <option value={transmi.id} key={transmi.id}>{transmi.typ_transm}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Climatisation</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.clim}</option>
                                        {
                                            type_climatisation.map((typeclis) => {
                                                return (
                                                    <option value={typeclis.id} key={typeclis.id}>{typeclis.type_clim}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Type pneu</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.pneus} </option>
                                        {
                                            type_pneus.map((typePs) => {
                                                return (
                                                    <option value={typePs.detail_pneu} key={typePs.id}>{typePs.detail_pneu}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Valeur d'acquisition</label>
                                    <input type="number" value={vehiculeClone.valeur_acq} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Lubrifiant</label>
                                    <select className="form-control">
                                        <option value={vehiculeClone.id} key={vehiculeClone.id}  >{vehiculeClone.lubri_mot} </option>
                                        {
                                            type_huile.map((tyephs) => {
                                                return (
                                                    <option value={tyephs.id} key={tyephs.id}>{tyephs.type}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" >Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="Details" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail  </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Identification</h5>
                            <hr />
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Immatriculation</label>
                                    <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero de ref" />
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
                                        <option>{vehiculeClone.modele}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Variante</label>
                                    <input type="text" value={vehiculeClone.variante} class="form-control" placeholder="Numero serie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Numero chassis</label>
                                    <input value={vehiculeClone.chassis} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Année de fabrication</label>
                                    <input type="number" value={vehiculeClone.anne_fab} class="form-control" placeholder="2014" />
                                </div>anne_fab
                                <br />
                                <div class="col-md-3">
                                    <label>Mise en circulation</label>
                                    <input type="text" value={vehiculeClone.anne_circ} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Categorie</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.categorie}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Sous categorie</label>
                                    <input type="text" value={vehiculeClone.categorie} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-6">

                                </div>
                                <br />
                                <div class="col-md-12">
                                    <h5>Dimension et poids</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Longeur</label>
                                    <input type="number" value={vehiculeClone.longeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Largeur</label>
                                    <input type="number" value={vehiculeClone.largeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Hauteur</label>
                                    <input type="number" value={vehiculeClone.nbre_cyl} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Poids</label>
                                    <input type="number" value={vehiculeClone.poids} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Couleur</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.couleur}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité carburant</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité radiateur</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Capacité carter</label>
                                    <input type="text" value={vehiculeClone.cap_rad} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre Places</label>
                                    <input type="text" value={vehiculeClone.nbre_place} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de portes</label>
                                    <input type="text" value={vehiculeClone.nbre_port} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Photo</label>
                                    <img src={vehiculeClone.foto} alt={vehiculeClone.foto} style={{ maxWidth: '200px' }} />
                                </div>
                                <div class="col-md-3">
                                    <img scr="" />
                                </div>
                                <div class="col-md-12">
                                    <h5>Moteur</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Numero moteur</label>
                                    <input type="number" value={vehiculeClone.num_mot} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.cylindre_circ}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.nbre_cyl}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Disposition</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.disposition_cyl}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Type carburant</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.type_carb}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Regime moteur</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cosommation carb</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Turbo</label>
                                    <input type="text" value={vehiculeClone.turbo} class="form-control" placeholder="Date fin garanti" />
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
                                    <input type="number" value={vehiculeClone.km_initial} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Puissance</label>
                                    <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Transmission fiscale</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.transm}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Climatisation</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.clim}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Type pneu</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.pneus} </option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Valeur d'acquisition</label>
                                    <input type="number" value={vehiculeClone.valeur_acq} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Lubrifiant</label>
                                    <select className="form-control">
                                        <option value={vehiculeClone.id} key={vehiculeClone.id}  >{vehiculeClone.lubri_mot} </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">EREGISTRER UN NOUVEAU  A PARTIR D'UN MODEL </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <center>
                            {
                                loadingD === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 20 }} ></i></p>
                                )
                            }
                        </center>
                        <div className="modal-body">
                            <h5>Identification</h5>
                            <hr />
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Immatriculation</label>
                                    <input type="text" value={vehiculeClone.immatriculation} class="form-control" placeholder="Numero de ref" />
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
                                        <option>{vehiculeClone.modele}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Variante</label>
                                    <input type="text" value={vehiculeClone.variante} class="form-control" placeholder="Numero serie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Numero chassis</label>
                                    <input value={vehiculeClone.chassis} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Année de fabrication</label>
                                    <input type="number" value={vehiculeClone.anne_fab} class="form-control" placeholder="2014" />
                                </div>anne_fab
                                <br />
                                <div class="col-md-3">
                                    <label>Mise en circulation</label>
                                    <input type="text" value={vehiculeClone.anne_circ} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Categorie</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.categorie}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Sous categorie</label>
                                    <input type="text" value={vehiculeClone.categorie} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-6">

                                </div>
                                <br />
                                <div class="col-md-12">
                                    <h5>Dimension et poids</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Longeur</label>
                                    <input type="number" value={vehiculeClone.longeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Largeur</label>
                                    <input type="number" value={vehiculeClone.largeur} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Hauteur</label>
                                    <input type="number" value={vehiculeClone.nbre_cyl} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Poids</label>
                                    <input type="number" value={vehiculeClone.poids} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Couleur</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.couleur}</option>
                                
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité carburant</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Capacité radiateur</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Capacité carter</label>
                                    <input type="text" value={vehiculeClone.cap_rad} class="form-control" placeholder="Date fin garanti" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre Places</label>
                                    <input type="text" value={vehiculeClone.nbre_place} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de portes</label>
                                    <input type="text" value={vehiculeClone.nbre_port} class="form-control" placeholder="Categorie" />
                                </div>
                                <div class="col-md-3">
                                    <label>Photo</label>
                                    <img src={vehiculeClone.foto} alt="Uploaded" style={{ maxWidth: '200px' }} />
                                </div>
                                <div class="col-md-3">
                                    <img scr="" />
                                </div>
                                <div class="col-md-12">
                                    <h5>Moteur</h5>
                                </div>
                                <hr />
                                <div class="col-md-3">
                                    <label>Numero moteur</label>
                                    <input type="number" value={vehiculeClone.num_mot} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.cylindre_circ}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Nombre de cylindre</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.nbre_cyl}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Disposition</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.disposition_cyl}</option>
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Type carburant</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.type_carb}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Regime moteur</label>
                                    <input value={vehiculeClone.regim_mot_veh} type="number" class="form-control" placeholder="2014" />
                                </div>
                                <div class="col-md-3">
                                    <label>Cosommation carb</label>
                                    <input type="number" value={vehiculeClone.cons_carb_veh} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Turbo</label>
                                    <input type="text" value={vehiculeClone.turbo} class="form-control" placeholder="Date fin garanti" />
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
                                    <input type="number" value={vehiculeClone.km_initial} class="form-control" placeholder="Numero de ref" />
                                </div>
                                <div class="col-md-3">
                                    <label>Puissance</label>
                                    <input type="number" value={vehiculeClone.numero_ord} class="form-control" placeholder="Numero de ref" />

                                </div>
                                <div class="col-md-3">
                                    <label>Transmission fiscale</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.transm}</option>
                                        
                                    </select>
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Climatisation</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.clim}</option>
                                        
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Type pneu</label>
                                    <select className="form-control">
                                        <option>{vehiculeClone.pneus} </option>
                                        
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Valeur d'acquisition</label>
                                    <input type="number" value={vehiculeClone.valeur_acq} class="form-control" placeholder="2014" />
                                </div>
                                <br />
                                <div class="col-md-3">
                                    <label>Lubrifiant</label>
                                    <select className="form-control">
                                        <option value={vehiculeClone.id} key={vehiculeClone.id}  >{vehiculeClone.lubri_mot} </option>
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" >Clonner</button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Affiche_vehicule;