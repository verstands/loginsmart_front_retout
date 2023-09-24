import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const AddFourniseur = () => {
    const [ville, setville] = useState([]);
    const [villes, setvilles] = useState("");
    const [adresse, setadresse] = useState("");
    const [email, setemail] = useState("");
    const [nat, setnat] = useState("");
    const [tel, settel] = useState("");
    const [nomsocial, setnomsocial] = useState("");
    const [fseur, setfseur] = useState([]);
    const [update, setupdate] = useState([]);
    const [loading, setloading] = useState(true);
    const [loadingD, setloadingD] = useState(false);
    let token = `Bearer ${localStorage.getItem("token")}`;

    const handleSave = () => {
        if (adresse == "" || email == "" || nat == "" || tel == "" || nomsocial == "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        } else {
            axios.post(`${process.env.REACT_APP_SERVICE_API}fseur`,
                {
                    'ville': villes,
                    'nom': nomsocial,
                    'adress': adresse,
                    'mail': email,
                    'tel': tel,
                    'num_ident_nat': nat,
                }, {
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
                window.location.reload();
            }).catch((error) => {
                alert(error)
            })
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}ville`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setville(response.data.data);
        }).catch((error) => {
            alert(error)
        })

    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}fseur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setfseur(response.data.data);
            setloading(false)
        }).catch((error) => {
            alert(error)
        })

    }, [])

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}fseur/${id}`;
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
        axios.delete(`${process.env.REACT_APP_SERVICE_API}fseur/${id}`, {
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
            window.location.reload();
        }).catch((error) => {
            alert(error)
        })
    }

    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 10;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = fseur
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>

                    <td>{e.nom}</td>
                    <td>{e.ville}</td>
                    <td>{e.adress}</td>
                    <td>{e.email}</td>
                    <td>{e.tel}</td>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>
                        <button onClick={() => Deleteprelevement(e.id)} className="mdi mdi-delete btn btn-danger"></button>
                        <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#updatePrelevement" className="fa fa-edit btn btn-primary"></button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(fseur.length / pleinPerPage);

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
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addville" className="btn btn-primary">Ajouter Fournisseur</a></h5>
                        </div>
                    </div>
                    <h3 className="text-center">LISTE DES FOURNISSEURS</h3>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Ville</th>
                                    <th>Adresse</th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Ajouter a mes Fseur</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{displayPlein}</tbody>
                        </table>
                        <center>
                            {
                                loading === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                )
                            }
                        </center>
                        <Pagination>{items}</Pagination>;
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">AJOUTER NOUVEAU FOURNISSEUR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="">Nom ou Raison sociale</label>
                                    <input type="text" onChange={(e) => setnomsocial(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Telephone</label>
                                    <input type="text" onChange={(e) => settel(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Email</label>
                                    <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">N° id Nat ou RCCM</label>
                                    <input type="number" onChange={(e) => setnat(e.target.value)} className="form-control" />
                                </div>
                                <br />
                                <div className="col-md-6">
                                    <label for="">Ville</label>
                                    <select className="form-control" onChange={(e) => setvilles(e.target.value)} >
                                        <option>-- Choisir ville --</option>
                                        {
                                            ville.map((vl) => {
                                                return (
                                                    <option value={vl.id} key={vl.id}>{vl.ville}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label for="">Adresse</label>
                                    <input type="text" onChange={(e) => setadresse(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSave} className="btn btn-primary">Ajouter Fournisseur</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updatePrelevement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            {
                                update.map((update) => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="">Numero</label><br />
                                                <input type="text" disabled value={update.id} className="form-control" />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Nome</label><br />
                                                <input type="text" value={update.nom} className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Ville</label><br />
                                                <input type="text" value={update.ville} className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Adresse</label><br />
                                                <input type="text" value={update.adress} className="form-control" />
                                            </div><div className="col-md-6">
                                                <label htmlFor="">Code agence</label><br />
                                                <input type="text" value={update.code_agence_assur} className="form-control" />
                                            </div><div className="col-md-6">
                                                <label htmlFor="">Telephone</label><br />
                                                <input type="text" value={update.tel} className="form-control" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AddFourniseur;