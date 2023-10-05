import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
import Select from "react-select";


const AffTous_maintenance_vehicule = () => {
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [interventions, setinterventions] = useState([]);
    const [interventions2, setinterventions2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingD, setloadingD] = useState(false)
    const [titre, settitre] = useState('');
    const [update, setupdate] = useState([])
    let n = 1;
    const siteSession = localStorage.getItem("siteSession");
    const [inputList, setInputList] = useState([{ tache: '', piece: '', montant: '' }]);

    const [commentaire, setcommentaire] = useState("NULL")
    const [evaluation, setevaluation] = useState("")

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { tache: '', piece: '', montant: '' }]);
    };

    //update
    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}interventionID/${id}`;
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
            alert(error + 'mode')
        })
    }
    //onchage
    const handleChange = (e) => {
        setloadingD(true);
        axios.get(`${process.env.REACT_APP_SERVICE_API}intervention/${siteSession}/${e}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setinterventions(response.data.data)
            setloadingD(false)
        }).catch((error) => {

        })
    }
    //delete
    const Deleteprelevement = (id) => {
        setloadingD(true)
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cette reparation ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Non, annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_SERVICE_API}intervention/${id}`, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    })
                    .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            text: `${response.data.message}`,
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch((error) => {
                        alert(error + 'bouton');
                    });
            }
        });
    }

    const [reparationIdd, setreparationIdd] = useState([]);
    const [reparationIddR, setreparationIddR] = useState([]);
    const [decriptionTravail, setdecriptionTravail] = useState([]);
    const reparationIDBtn = (id) => {
        setloadingD(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}reparationID/${siteSession}/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setreparationIdd(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })
        //pour le detail de reparation
        axios.get(`${process.env.REACT_APP_SERVICE_API}reparationIDR/${siteSession}/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setreparationIddR(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })
        //pour description du travail effectue
        axios.get(`${process.env.REACT_APP_SERVICE_API}reparationIDTRAVAUX/${siteSession}/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setdecriptionTravail(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })

    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}reparation_index/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setinterventions(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error + 'affmainteance')
        })
    }, [])
    //evaluation
    const [evaluationTableau, setevaluationTableau] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}evaluationReparation`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setevaluationTableau(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })
    }, [])
    //evaluation
    const [tacheTableau, settacheTableau] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}tacheReparation`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settacheTableau(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })
    }, [])

    const [pieceReparation, setpieceReparation] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}pieceReparation`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setpieceReparation(response.data.data);
            setloadingD(false)
        }).catch((error) => {
            alert(alert(error + 'reparationID'))
        })
    }, [])
    const [selectedVehicules, setSelectedVehicules] = useState("");
    const handleChanges = (e) => {
        setSelectedVehicules(e.value);
    }
    const autocompleteVehicules = () => {
        const options = pieceReparation.map((vh) => ({
            label: vh.nom,
            value: vh.id,
        }));
        return (
            <Select
                options={options}
                onChange={handleChanges}
            />
        );
    };
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 100;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = interventions
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>{e.reparationID}</td>
                    <td>{e.immatriculation}</td>
                    <td>{e.marque}</td>
                    <td>{e.daterep}</td>
                    <td>{e.dtsorti}</td>
                    <td>{e.nbre}</td>
                    <td>{e.intitule}</td>
                    <td>{e.titre}</td>
                    <td>{e.nom}</td>
                    {
                        (e.state_cat_rep === "Terminé") && (
                            <td>{e.state_cat_rep}</td>
                        )
                    }
                    {
                        (e.state_cat_rep === "En cours") && (
                            <td style={{ backgroundColor: "red" }}>En cours</td>
                        )
                    }
                    {
                        (e.state_cat_rep !== "En cours") && (e.state_cat_rep !== "Terminé") && (
                            <td style={{ backgroundColor: "blue" }}>Terminé(R)</td>
                        )
                    }
                    <td>
                        <a href={e.reparationID} onClick={() => reparationIDBtn(e.reparationID)} data-bs-toggle="modal" data-bs-target="#Carbs">
                            <i class="mdi mdi-eye" style={{ fontSize: 30 }}></i>
                        </a>
                    </td>
                    <td>
                        <a href={`/MaintenancePdf/${e.id}`}>
                            <i class="mdi mdi-file-pdf" style={{ fontSize: 30 }}></i>
                        </a>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(interventions.length / pleinPerPage);

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
    const url = `${process.env.REACT_APP_SERVICE_API}travaux_recl`;
    const Enregistrer = () => {
        setloadingD(true);
        inputList.forEach((dsav, index) => {
            axios.post(url, {
                IDop: evaluation,
                type_travail: dsav.tache,
                IDsub_mat: 1,
                cout: dsav.montant,
                observation: commentaire,
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
                setloadingD(false);

            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                    });
                    setloadingD(false);
                } else if (error.response.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Erreur de la connexion !!!',
                        confirmButtonText: 'OK'
                    })
                    setloadingD(false);
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                        confirmButtonText: 'OK'
                    })
                    setloadingD(false);
                }
            });

        });

    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="modal-header">
                        <div className="table-responsive">
                            <h3 className="text-center">LISTE DE TOUTES LES REPARATIONS ET ENTRETIENS</h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-2">Séléctionner :</div>
                                <div className="col-md-4">
                                    <select className="form-control" onChange={(e) => handleChange(e.target.value)}>
                                        <option value="Tous">Tous</option>
                                        <option value="Encours">En cours</option>
                                        <option value="Termine">Terminé</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    {loadingD && (<i style={{ fontSize: '25px' }} className="fa fa-spinner fa-pulse"></i>)}
                                </div>
                                <br />
                                <br />
                            </div>
                            <table id="zero_config" className="table table-striped table-bordered table-sm">
                                <thead>
                                    <tr style={{ background: 'silver' }}>
                                        <th>N°</th>
                                        <th>immatriculation</th>
                                        <th>Marque</th>
                                        <th>Date entreée</th>
                                        <th>Date sortie</th>
                                        <th>Jrs</th>
                                        <th width={1}>Libelle de repatition</th>
                                        <th>Type Réparation</th>
                                        <th>Fournisseur</th>
                                        <th>Etat</th>
                                        <th>Suivi</th>
                                        <th>BDC</th>
                                    </tr>
                                </thead>
                                <tbody>{displayPlein}</tbody>
                            </table>
                            <Pagination>{items}</Pagination>
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
            </div>
            <div className="modal fade" id="Carbs" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SUIVI INTERVENTION BON N° {reparationIdd.id}: VEHECULE N°{reparationIdd.marque} {reparationIdd.modele} {reparationIdd.immatriculation}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <center>
                                        {
                                            loadingD === true && (
                                                <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 20 }} ></i></p>
                                            )
                                        }
                                    </center>
                                    <h5 style={{ backgroundColor: "silver" }}>INFORMATIONS GENERALES</h5>
                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>Releve Actuel</td>
                                                <td>{reparationIdd.kilometrage}</td>
                                                <td>Date debut</td>
                                                <td>{reparationIdd.daterep}</td>
                                                <td>Fournisseur</td>
                                                <td>Auto center</td>
                                            </tr>
                                            <tr>
                                                <td>Prochaine Intervention (Hrs)</td>
                                                <td>200</td>
                                                <td>Date fin</td>
                                                <td>{reparationIdd.dtsorti}</td>
                                                <td>BC emis par</td>
                                                <td>{reparationIdd.nom}</td>
                                            </tr>
                                            <tr>
                                                <td>Cout (devis)</td>
                                                <td>200</td>
                                                <td>Fin prevue</td>
                                                <td>12</td>
                                                <td>Fin encodée par</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5 style={{ backgroundColor: "silver" }}>DETAILS DE REAPARATION </h5>
                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <thead>
                                            <tr>
                                                <th>Ref</th>
                                                <th>Libelle de réparation</th>
                                                <th>Categorie</th>
                                                <th>Statut</th>
                                                <th>Statut final</th>
                                                <th>Suivi</th>
                                                <th>Réclamation?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                reparationIddR.map((rp) => {
                                                    return (
                                                        <tr>
                                                            <td>{rp.reparationID}</td>
                                                            <td>{rp.intitule}</td>
                                                            <td>{rp.titre}</td>
                                                            <td>{rp.state}</td>
                                                            <td>{rp.state_cat_rep}</td>
                                                            <td>
                                                                <button data-bs-toggle="modal" data-bs-target="#accesadmin">
                                                                    <i class="fa fa-user"></i>
                                                                </button>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        (reparationIdd.state_cat_rep === "Terminé") && (
                                            <>
                                                <h5 style={{ backgroundColor: "silver" }}>DESCRIPTION DU TRAVAIL EFFECTUE </h5>
                                                <table
                                                    id="zero_config"
                                                    class="table table-striped table-bordered"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Ref</th>
                                                            <th>Taches accomplie</th>
                                                            <th>Montant</th>
                                                            <th>BCD</th>
                                                            <th>Utilisateur</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            decriptionTravail.map((dts) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{dts.reparationID}</td>
                                                                        <td>{dts.trav_desc}</td>
                                                                        <td>{dts.nom}</td>
                                                                        <td>{dts.cout}</td>
                                                                        <td>
                                                                            <i className="fa fa-pdf"></i>
                                                                        </td>
                                                                        <td>{dts.user1}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <h5 style={{ backgroundColor: "silver" }}>DETAIL DE RECLAMATION</h5>
                                                <table
                                                    id="zero_config"
                                                    class="table table-striped table-bordered"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Ref</th>
                                                            <th>Reclammation:</th>
                                                            <th>Motif</th>
                                                            <th>Description</th>
                                                            <th>Date Reclammation</th>
                                                            <th>Date Fin</th>
                                                            <th>Statut réclammation</th>
                                                            <th>Fin</th>
                                                            <th>BRD</th>
                                                            <th>Utilisateur</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="accesadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{ height: '100vh', overflowY: 'scroll' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SUIVI INTERVENTION BON N° {reparationIdd.id}: VEHECULE N°{reparationIdd.marque} {reparationIdd.modele} {reparationIdd.immatriculation}</h5>
                            <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#Carbs"></button>

                        </div>
                        <div className="modal-body">
                            <div className='card-body'>
                                <div className="table-responsives">
                                    <h5 style={{ backgroundColor: "silver" }}>INFORMATIONS GENERALES</h5>

                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>Releve Actuel</td>
                                                <td>{reparationIdd.kilometrage}</td>
                                                <td>Date debut</td>
                                                <td>{reparationIdd.daterep}</td>
                                                <td>Fournisseur</td>
                                                <td>Auto center</td>
                                            </tr>
                                            <tr>
                                                <td>Prochaine Intervention (Hrs)</td>
                                                <td>200</td>
                                                <td>Date fin</td>
                                                <td>{reparationIdd.dtsorti}</td>
                                                <td>BC emis par</td>
                                                <td>{reparationIdd.nom}</td>
                                            </tr>
                                            <tr>
                                                <td>Cout (devis)</td>
                                                <td>200</td>
                                                <td>Fin prevue</td>
                                                <td>12</td>
                                                <td>Fin encodée par</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <u>Veuillez mettre à jour les données</u>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <h6>Evaluation:</h6>
                                                </div>
                                                <div className="col-md-8">
                                                    <select className="form-control" onChange={(e) => setevaluation(e.target
                                                        .value)} name="" id="">
                                                        <option value="">--Choisir--</option>
                                                        {
                                                            evaluationTableau.map((ev) => {
                                                                return (
                                                                    <option value={ev.id} key={ev.id}>{ev.state}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <h6>Tache</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6>Piece</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6>Cout</h6>
                                                    </div>
                                                    {
                                                        inputList.map((x, i) => {
                                                            return (
                                                                <>
                                                                    <div className="col-md-4">
                                                                        <select value={x.tache} name="tache" className="form-control" onChange={e => handleInputChange(e, i)} id="">
                                                                            <option value="">Travail Effectué</option>
                                                                            {
                                                                                tacheTableau.map((tt) => {
                                                                                    return (
                                                                                        <option value={tt.id}>{tt.trav_desc}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        {autocompleteVehicules()}
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="row">
                                                                            <div className="col-md-7">
                                                                                <input value={x.montant} name="montant" type="number" className="form-control" onChange={e => handleInputChange(e, i)} />
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <p>usd</p>
                                                                            </div>
                                                                            <div className="col-md-2">
                                                                                {inputList.length - 1 === i && (
                                                                                    <button className="ml10" onClick={handleAddClick}>
                                                                                        +
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <label htmlFor="">Commentaires</label>
                                                <textarea name="" className="form-control" onChange={(e) => setcommentaire(e.target.value)} id="" cols="30" rows="2"></textarea>
                                                <br />

                                                <div className="modal-footer">
                                                    {
                                                        loadingD === true && (
                                                            <p><i style={{ fontSize: '35px' }} className="fa fa-spinner fa-pulse text-primary" ></i></p>
                                                        )
                                                    }
                                                    <button className="float-end btn btn-primary" onClick={Enregistrer}>Enregistrer </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AffTous_maintenance_vehicule;