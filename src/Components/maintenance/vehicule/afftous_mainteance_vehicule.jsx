import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import dateFormat from "dateformat";


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
                    <td>
                        {
                            (e.state_cat_rep !== "En cours") && (
                                <button className="btn btn-defaults">{e.state_cat_rep}</button>
                            )
                        }
                        {
                            (e.state_cat_rep === "En cours") && (
                                <button className="btn btn-danger">En cours</button>
                            )
                        }
                    </td>
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
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="modal-header">
                        <div className="table-responsive">
                            <h3 className="text-center">LISTE DE TOUTES LES REPARATIONS ET ENTRETIENS</h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <select className="form-control" onChange={(e) => handleChange(e.target.value)}>
                                        <option value="Tous">Tous</option>
                                        <option value="Encours">En cours</option>
                                        <option value="Termine">Terminé</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    { loadingD && (<i style={{fontSize : '25px'}} className="fa fa-spinner fa-pulse"></i>) }  
                                </div>
                                <br />
                                <br />
                            </div>
                            <table
                                class="table table-striped table-bordered"
                            >
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="card-body">
                                <center>
                                    <h6 class="card-title"> SUIVI INTERVENTION BON N° {reparationIdd.id}: VEHECULE N°{reparationIdd.marque} {reparationIdd.modele} {reparationIdd.immatriculation}</h6>
                                </center>
                                <hr />
                                <div class="table-responsive">
                                    <center>
                                        {
                                            loadingD === true && (
                                                <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 20 }} ></i></p>
                                            )
                                        }
                                    </center>
                                    <h5 style={{backgroundColor : "silver"}}>INFORMATIONS GENERALES</h5>
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
                                                <td>d</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5 style={{backgroundColor : "silver"}}>DETAILS DE REAPARATION </h5>
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
                                    </table>
                                    <h5 style={{backgroundColor : "silver"}}>DESCRIPTION DU TRAVAIL EFFECTUE </h5>
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
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AffTous_maintenance_vehicule;