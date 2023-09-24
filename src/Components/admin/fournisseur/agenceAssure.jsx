import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";


const AgenceAssurer = () => {
    const [ville, setville] = useState([]);
    const [villes, setvilles] = useState("");
    const [code, setcode] = useState("");
    const [assurer, setassurer] = useState([]);
    const [tel, settel] = useState("");
    const [nomagence, setnomagence] = useState("");
    const [adresse, setadresse] = useState("");
    const [assurers, setassurers] = useState("")
    const [agenceAssurer, setagenceAssurer] = useState([]);
    const [update, setupdate] = useState([]);
    const [loading, setloading] = useState(true);
    const [loadingD, setloadingD] = useState(false);
    let n = 1;
    let token = `Bearer ${localStorage.getItem("token")}`;

    const handleSave = () => {
        if (code == "" || tel == "" || nomagence == "" || adresse == "") {
            Swal.fire({
                icon: 'error',
                text: 'Success',
            });
        } else {
            axios.post(`${process.env.REACT_APP_SERVICE_API}agence_assureur`,
                {
                    'nom_assur': nomagence,
                    'adresse_assur': adresse,
                    'teleph_assur': tel,
                    'assureur': assurers,
                    'code_agence_assur': code,
                    'ville': villes,
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
        axios.get(`${process.env.REACT_APP_SERVICE_API}assureur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setassurer(response.data.data);
        }).catch((error) => {
            alert(error)
        })

    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}agence_assureur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setagenceAssurer(response.data.data);
            setloading(false)
        }).catch((error) => {
            alert(error)
        })

    }, [])
    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}agence_assureur/${id}`;
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
        axios.delete(`${process.env.REACT_APP_SERVICE_API}agence_assureur/${id}`, {
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
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 10;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = agenceAssurer
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                    <td>{n++}</td>
                    <td>{e.nom_assur}</td>
                    <td>{e.code_agence_assur}</td>
                    <td>{e.ville}</td>
                    <td>{e.adresse_assur}</td>
                    <td>{e.nom}</td>
                    <td>{e.teleph_assur}</td>
                    <td>
                        <button onClick={() => Deleteprelevement(e.id)} className="mdi mdi-delete btn btn-danger"></button>&nbsp;
                        <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#updateAgence" className="fa fa-edit btn btn-primary"></button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(agenceAssurer.length / pleinPerPage);

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
                            <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addagences" className="btn btn-primary">Ajouter une agence d'assurance</a></h5>
                        </div>
                    </div>
                    <h3 className="text-center">LISTE DES AGENCES D'ASSURANCE</h3>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Numero</th>
                                    <th>Nom</th>
                                    <th>Code</th>
                                    <th>Ville</th>
                                    <th>Adresses</th>
                                    <th>Assurer</th>
                                    <th>Telephone</th>
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

            <div className="modal fade" id="addagences" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">AJOUTER UNE NOUVELLE AGENCE D'ASSURANCE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="">Code agence</label>
                                    <input type="number" onChange={(e) => setcode(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Nom d'agence</label>
                                    <input type="text" onChange={(e) => setnomagence(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Adresse</label>
                                    <input type="email" onChange={(e) => setadresse(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Ville</label>
                                    <select className="form-control" onChange={(e) => setvilles(e.target.value)} >
                                        <option>-- Choisir  --</option>
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
                                    <label for="">Telephone</label>
                                    <input type="text" onChange={(e) => settel(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label for="">Assureur</label>
                                    <select className="form-control" onChange={(e) => setassurers(e.target.value)} >
                                        <option>-- Choisir --</option>
                                        {
                                            assurer.map((vls) => {
                                                return (
                                                    <option value={vls.id} key={vls.id}>{vls.nom}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSave} className="btn btn-primary">Ajouter Fournisseur</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updateAgence" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">MOFICATION   </h5>
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
                                                <label htmlFor="">Code agence</label><br />
                                                <input type="text" value={update.code_agence_assur} className="form-control" />

                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Nom agence </label><br />
                                                <input type="text" value={update.nom_assur} className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Adresse</label><br />
                                                <input type="text" value={update.adresse_assur} className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="">Ville</label><br />
                                                <input type="text" value={update.ville} className="form-control" />
                                            </div><div className="col-md-6">
                                                <label htmlFor="">Telephone</label><br />
                                                <input type="text" value={update.teleph_assur} className="form-control" />
                                            </div><div className="col-md-6">
                                                <label htmlFor="">Assureur</label><br />
                                                <input type="text" value={update.nom} className="form-control" />
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
    )
}

export default AgenceAssurer;