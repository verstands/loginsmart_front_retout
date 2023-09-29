import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { blue, red } from "@mui/material/colors";
import Recherche_multiple_prelevement from "./imprimer";
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const AffchageTous = () => {
    const [plein, setplain] = useState([])
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [loadingD, setloadingD] = useState(false);
    const [loading, setloading] = useState(true);
    const [update, setupdate] = useState([]);
    let n = 1
    //creattion de variable carburant
    const [PamatreCar, setPamatreCar] = useState("")
    const [PamatreCarDate, setPamatreCarDate] = useState("")
    const siteSession = localStorage.getItem("siteSession");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}plein/${siteSession}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then((response) => {
                setplain(response.data.data);
                setloading(false)
            })
            .catch((error) => {
                alert(error)
            })
    }, [])

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}pleinID/${id}`;
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
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer ce Plein ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Non, annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_SERVICE_API}plein/${id}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        text: `${response.message}`,
                        confirmButtonText: 'OK'
                    });
                    window.location.reload();
                }).catch((error) => {
                    alert(error)
                })
            }
        });
    }
    const [dates, setdates] = useState([])
    const [datess, setdatess] = useState("")
    const DatePrelevement = (dates) => {
        setloadingD(true)

        axios.get(`${process.env.REACT_APP_SERVICE_API}pleinDate/${siteSession}/${dates}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            setdates(response.data.data)
            setdatess(dates)
            setPamatreCarDate(dates)
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }
    //carburant function
    const [car, setcar] = useState([])
    const [carss, setcarss] = useState("")
    const CarPrelevement = (carburant) => {
        setloadingD(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}pleinCarb/${siteSession}/${carburant}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            setcar(response.data.data)
            setcarss(carburant)
            setPamatreCar(carburant)
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })

    }
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 100;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = plein
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>
                        <Link to={`/ImprimerID/${e.id}`}>
                            {e.id}
                        </Link>
                    </td>
                    <td>{e.immatriculation}</td>
                    <td>{e.nom}</td>
                    <td>{e.nom_carb}</td>
                    <td>
                        <button onClick={() => DatePrelevement(e.date_plein)} data-bs-toggle="modal" data-bs-target="#Dates">
                            {dateFormat(e.date_plein, "dd/mm/yyyy")}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => CarPrelevement(e.nom_carb)} data-bs-toggle="modal" data-bs-target="#Carbs">
                            {e.nom_carb}
                        </button>

                    </td>
                    <td>{e.qteplein}</td>
                    <td>{e.kilometrage}</td>
                    <td>{e.num}</td>
                    <td>
                        <button className="btn btn-primary" onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#Detail" >
                            <i className="mdi mdi-eye"></i>
                        </button>
                    </td>
                    <td>
                        <button onClick={() => Deleteprelevement(e.id)} className="mdi mdi-delete btn btn-danger"></button>&nbsp;
                        <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#updatePrelevement" className="fa fa-edit btn btn-primary"></button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(plein.length / pleinPerPage);

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
            <div class="card">
                <div class="card-body">
                    <center>
                        <h3 class="card-title"> LISTE DE TOUS LES PRELEVEMENTS CARBURANT</h3>
                    </center>
                    <hr />
                    <div class="table-responsive">
                    <table id="zero_config" className="table table-striped table-bordered table-sm">
                            <thead>
                                <tr style={{ background: 'silver' }}>
                                    <th>N°</th>
                                    <th>immatriculation</th>
                                    <th>Chauffeur</th>
                                    <th>Modele</th>
                                    <th>Date</th>
                                    <th>Carburant</th>
                                    <th>Qte</th>
                                    <th>Kilometrage</th>
                                    <th>Numero</th>
                                    <th>Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{displayPlein}</tbody>
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
            <div className="modal fade" id="updatePrelevement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">MODIFICATION D'UN PLEIN </h5>
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
                            {
                                update.map((cds) => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="">Immatriculation</label><br />
                                                <input type="text" value={cds.immatriculation} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Date plein</label><br />
                                                <input type="text" value={cds.date_plein} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Quantite</label><br />
                                                <input type="text" value={cds.qteplein} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Kilometrage</label><br />
                                                <input type="text" value={cds.kilometrage} className="form-control" />
                                            </div><div className="col-md-4">
                                                <label htmlFor="">Type carburant</label><br />
                                                <input type="text" value={cds.nom_carb} className="form-control" />
                                            </div><div className="col-md-4">
                                                <label htmlFor="">Chauffeur</label><br />
                                                <input type="text" value={cds.nom} className="form-control" />
                                            </div><div className="col-md-4">
                                                <label htmlFor="">Observation</label><br />
                                                <input type="text" value={cds.observation} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Model</label><br />
                                                <input type="text" value={cds.modele} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Marque</label><br />
                                                <input type="text" value={cds.marque} className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="">Observation</label><br />
                                                <input type="text" value={cds.observation} className="form-control" />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary"><i className="fa fa-edit"></i> Modifier</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">DETAIL D'UN PRELEVEMENT </h5>
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
                            {
                                update.map((cd) => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="">Immatriculation</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.immatriculation} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Date plein</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.date_plein} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Quantite</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.qteplein} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Kilometrage</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.kilometrage} className="form-control" />
                                            </div><div className="col-md-3">
                                                <label htmlFor="">Type carburant</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.nom_carb} className="form-control" />
                                            </div><div className="col-md-3">
                                                <label htmlFor="">Chauffeur</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.nom} className="form-control" />
                                            </div><div className="col-md-3">
                                                <label htmlFor="">Observation</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.observation} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Model</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.modele} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Marque</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.marque} className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="">Observation</label><br />
                                                <input type="text" style={{border : "none"}} value={cd.observation} className="form-control" />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="Dates" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="card-body">
                                <center>
                                    <h3 class="card-title"> TOUS LES PRELEVEMENTS DU {datess}</h3>
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
                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>immatriculation</th>
                                                <th>Chauffeur</th>
                                                <th>Modele</th>
                                                <th>Date</th>
                                                <th>Carburant</th>
                                                <th>Qte</th>
                                                <th>Kilometrage</th>
                                                <th>Numero</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                dates.map((datess) => {
                                                    return (
                                                        <tr>
                                                            <td>{n++}</td>
                                                            <td>{datess.immatriculation}</td>
                                                            <td>{datess.nom}</td>
                                                            <td>{datess.nom_carb}</td>
                                                            <td>{datess.date_plein}</td>
                                                            <td>{datess.nom_carb}</td>
                                                            <td>{datess.qteplein}</td>
                                                            <td>{datess.kilometrage}</td>
                                                            <td>{datess.num}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link className="btn btn-primary" to={`/ImprimerDate/${PamatreCarDate}`}>
                                <i className="fas fa-print"></i>
                                Impimer resultatss
                            </Link>
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
                                    <h3 class="card-title"> TOUS LES PRELEVEMENTS POUR {carss}</h3>
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
                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>immatriculation</th>
                                                <th>Chauffeur</th>
                                                <th>Modele</th>
                                                <th>Date</th>
                                                <th>Carburant</th>
                                                <th>Qte</th>
                                                <th>Kilometrage</th>
                                                <th>Numero</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                car.map((datess) => {
                                                    return (
                                                        <tr>
                                                            <td>{n++}</td>
                                                            <td>{datess.immatriculation}</td>
                                                            <td>{datess.nom}</td>
                                                            <td>{datess.nom_carb}</td>
                                                            <td>{datess.date_plein}</td>
                                                            <td>{datess.nom_carb}</td>
                                                            <td>{datess.qteplein}</td>
                                                            <td>{datess.kilometrage}</td>
                                                            <td>{datess.num}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link className="btn btn-primary" to={`/imprimer_prelevement/${PamatreCar}`}>
                                <i className="fas fa-print"></i>
                                Impimer resultatss
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AffchageTous;