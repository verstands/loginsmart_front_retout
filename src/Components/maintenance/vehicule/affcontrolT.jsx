import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import dateFormat from "dateformat";

const AffControlT_vehicule = () => {
    const [loading, setLoading] = useState(true);
    const [loadingD, setloadingD] = useState(false)
    const [titre, settitre] = useState(false)
    const [check, setcheck] = useState([]);
    const [update, setupdate] = useState([]);
    const [detail, setdetail] = useState([]);
    let n = 1;
    let token = `Bearer ${localStorage.getItem("token")}`;
    const siteSession = localStorage.getItem("siteSession");



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}check_auto/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setcheck(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    //detail
    const detailControl = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}check_autoID/${id}`;
        axios.get(urlDetail,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            //setdetail(response.data.data);
            setdetail(response.data.data)
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }
    //update
    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}check_auto/${id}`;
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
    //delete
    const Deleteprelevement = (id) => {
        setloadingD(true)
        axios.delete(`${process.env.REACT_APP_SERVICE_API}check_autoID/${id}`, {
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
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 100;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = check
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>{n++}</td>
                    <td>{e.immat_check}</td>
                    <td>{e.marque}</td>
                    <td>{dateFormat(e.date_check, 'dd/mm/yyyy')}</td>
                    <td>{dateFormat(e.delai_check, 'dd/mm/yyyy')}</td>
                    <td>{e.lib_check}</td>
                    <td>{e.titre}</td>
                    <td>{e.prenom + " " + e.nom}</td>
                    <td>
                        <button onClick={() => detailControl(e.id)} data-bs-toggle="modal" data-bs-target="#Detail" className="mdi mdi-apps btn btn-primary"></button>&nbsp;
                    </td>
                    <td>
                        {e.user_cr}
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(check.length / pleinPerPage);

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

    const handleChange = (e) => {
        setloadingD(true);
        axios.get(`${process.env.REACT_APP_SERVICE_API}check_autoSelect/${siteSession}/${e}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setcheck(response.data.data)
            setloadingD(false);
        }).catch((error) => {

        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="modal-header">
                        <div className="table-responsive">
                            <h3 className="text-center">LISTE DE TOUS LES CONTROLES TECHNIQUES</h3>
                            <div className="row">
                            <div className="col-md-4">
                                <select className="form-control" onChange={(e) => handleChange(e.target.value)}>
                                    <option value="Tous">Tous</option>
                                    <option value="COURS">En cours</option>
                                    <option value="EXPIRE">Expire dans les 3 mois</option>
                                </select>
                            </div>
                            <br />
                            <br />
                        </div>
                            <hr />
                            <table id="zero_config" className="table table-striped table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>immatriculation</th>
                                        <th>Marque/Model</th>
                                        <th>Date controle</th>
                                        <th>Validité</th>
                                        <th>Libelle</th>
                                        <th>Categirie</th>
                                        <th>Chauffeurs</th>
                                        <th>Detail</th>
                                        <th>Utilisateur</th>
                                    </tr>
                                </thead>
                                <tbody>{displayPlein}</tbody>
                            </table>
                            <Pagination></Pagination>
                            <center>
                                {
                                    loading === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                    )
                                }
                            </center>
                            <center>
                                {
                                    loadingD === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                    )
                                }
                            </center>
                            <center>
                                {
                                    check.length <= 0 && (
                                       <h5>Pas d'information</h5>
                                    )
                                }
                            </center>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">DETAIL DE CONTROLE DE TECHNIQUE </h5>
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

                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Reference centre</label><br />
                                        <input type="text" value={detail.ref_centre} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Nom centre</label><br />
                                        <input type="text" value={detail.nom_centre} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Date check</label><br />
                                        <input type="text" value={detail.date_check} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Immatriculation</label><br />
                                        <input type="text" value={detail.immat_check} className="form-control" />
                                    </div><div className="col-md-4">
                                        <label htmlFor="">Kilometrage</label><br />
                                        <input type="text" value={detail.km_check} className="form-control" />
                                    </div><div className="col-md-4">
                                        <label htmlFor="">Chauffeur</label><br />
                                        <input type="text" value={detail.chauff_check} className="form-control" />
                                    </div><div className="col-md-4">
                                        <label htmlFor="">Agent</label><br />
                                        <input type="text" value={detail.agent_check} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Prix</label><br />
                                        <input type="text" value={detail.cout_ht} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Delai</label><br />
                                        <input type="text" value={detail.delai_check} className="form-control" />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="">Observation</label><br />
                                        <input type="text" value={detail.observation} className="form-control" />
                                    </div>

                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AffControlT_vehicule;