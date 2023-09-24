import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const Ville = () => {
    const [ville, setville] = useState([]);
    const [province, setprovince] = useState([]);
    const [ref_ville, setrefville] = useState("");
    const [villes, setvilles] = useState("");
    const [ref_prov, setrefprov] = useState("");
    let nv = 1;
    let token = `Bearer ${localStorage.getItem("token")}`;

    const ajouterVille = () => {
        if (villes == "" || ref_ville == "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        } else {
            axios.post(`${process.env.REACT_APP_SERVICE_API}ville`,
                {
                    ref_ville: ref_ville,
                    ville: villes,
                    ref_prov: ref_prov
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
    const [villeres, setvilleres] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}villerestauration`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvilleres(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}province`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setprovince(response.data.data);
        }).catch((error) => {
            alert(error)
        })

    }, [])

    const Deleteville = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}ville/${id}`, {
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
    const [detailupdatedataville, setdetailupdatedataville] = useState([]);
    const [loadingupdateville, setloadingupdateville] = useState(false)

    const UpadateVille = (id) => {
        setloadingupdateville(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}villeID/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            setdetailupdatedataville(response.data.data)
            setloadingupdateville(false)
        }).catch((error) => {
            alert(error)
        })
    }
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 10;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = ville
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>{nv++}</td>
                    <td>{e.ville}</td>
                    <td>{e.province}</td>
                    <td>
                        <button onClick={() => Deleteville(e.id)} className="btn btn-danger"><i className="mdi mdi-delete"></i></button> &nbsp;
                        <button  onClick={() => UpadateVille(e.id)} data-bs-toggle="modal" data-bs-target="#DetailUpdateVille" className="btn btn-primary"><i className="fa fa-edit"></i></button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(ville.length / pleinPerPage);

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

    const RestaurationVille = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}resville/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            Swal.fire({
                icon: 'success',
                text: `${response.data.message}`,
            });
            window.location.reload();
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center">LISTE DES VILLES</h2>
                    <hr />
                    <div className="row">
                        <h5 className="card-title col-md-1"> <a href="" data-bs-toggle="modal" data-bs-target="#addville" className="btn btn-primary"> Ajout ville</a></h5>
                        <h5 className="card-title col-md-11 "> <a href="" data-bs-toggle="modal" data-bs-target="#corbeilleville" className="btn btn-primary"><i className="mdi mdi-delete"></i> Corbeille</a></h5>
                    </div>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Ville</th>
                                    <th>Province</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{displayPlein}</tbody>
                        </table>
                        <Pagination>{items}</Pagination>;
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajouter une ville- </h5>
                            <h5 className="card-title col-md-11"> <a href="" data-bs-toggle="modal" data-bs-target="#corbeilleville" className="btn btn-primary"> <i className="mdi mdi-delete"></i> Corbeille</a></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label for="">Province</label>
                                <select name="site" onChange={(e) => setrefprov(e.target.value)} className="form-control">
                                    {
                                        province.map((e) => {
                                            return (
                                                <option key={e.id} value="{e.id}">{e.province}</option>
                                            );
                                        })
                                    }
                                </select>
                                <div>
                                    <label for="">Ville</label>
                                    <input type="text" onChange={(e) => setvilles(e.target.value)} className="form-control" />
                                    <label for="">Reference ville</label>
                                    <input type="text" onChange={(e) => setrefville(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={ajouterVille} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="corbeilleville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Liste des villes supprimés</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="table-responsive">
                                    <table
                                        id="zero_config"
                                        class="table table-striped table-bordered"
                                    >
                                        <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>Ville</th>
                                                <th>Province</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                villeres.map((e) => {
                                                    return (
                                                        <tr>
                                                            <td>{nv++}</td>
                                                            <td>{e.ville}</td>
                                                            <td>{e.province}</td>
                                                            <td>
                                                                <button onClick={() => RestaurationVille(e.id)} className="btn btn-success"><i className="fa fa-history"></i></button> &nbsp;
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <center>
                                        {
                                            villeres.length <= 0 && (
                                                <h5 className="text-center">Pas des données</h5>
                                            )
                                        }
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="DetailUpdateVille" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier une ville</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center>
                                {
                                    loadingupdateville === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                    )
                                }
                            </center>
                            {
                                detailupdatedataville.map((datupdz) => {
                                    return (
                                        <div>
                            
                                                <label for="">Province</label>
                                                <select name="site"  onChange={(e) => setrefprov(e.target.value)} className="form-control">
                                                     <option value={datupdz.province}>{datupdz.province}</option>
                                                    {
                                                        province.map((e) => {
                                                            return (
                                                                <option key={e.id} value="{e.id}">{e.province}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <div>
                                                    <label for="">Ville</label>
                                                    <input value={datupdz.ville} type="text" onChange={(e) => setvilles(e.target.value)} className="form-control" />
                                                    <label for="">Reference ville</label>
                                                    <input type="text" value={datupdz.ref_ville} onChange={(e) => setrefville(e.target.value)} className="form-control" />
                                                </div>
                                        
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ville;