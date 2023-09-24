import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
const Site = () => {
    const [ville, setville] = useState([]);
    const [zonev, setzone] = useState([]);
    const [site, setsite] = useState([]);
    const [codesite, setcodesite] = useState("");
    const [nomsite, setnomsite] = useState("");
    const [villesite, setvillesite] = useState("");
    const [zonesite, setzonesite] = useState("");
    const [adresse, setadresse] = useState("");
    const [tel, settel] = useState("");
    const [loading, setLoading] = useState(true);
    const [siteDelete, setsiteDelete] = useState([]);

    let token = `Bearer ${localStorage.getItem("token")}`;

    let ns = 1;
    const ajouterSite = () => {
        if (codesite === "" || nomsite === "" || adresse === "" || tel === "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        } else {
            axios.post(`${process.env.REACT_APP_SERVICE_API}site`,
                {
                    CodeSite: codesite,
                    nom_site: nomsite,
                    IdVille: villesite,
                    IdZone: zonesite,
                    adress: adresse,
                    tel: tel,
                    ref_site: codesite
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
        axios.get(`${process.env.REACT_APP_SERVICE_API}zone`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((responses) => {
            setzone(responses.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])



    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVICE_API}site`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setsite(response.data.data);
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}siteDelete`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setsiteDelete(response.data.data);
            setLoading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const DeleteSite = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}site/${id}`, {
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

    const RestaurationSite = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}siterestaurer/${id}`, {
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
    const [detailupdatedata, setdetailupdatedata] = useState([]);
    const [loadingupdate, setloadingupdate] = useState(false)
    const DetailUpdateAdmin = (id) => {
        setloadingupdate(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}siteID/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((response) => {
            setdetailupdatedata(response.data.data)
            setloadingupdate(false)
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h2 className="text-center">LISTE DES SITES</h2>
                        <hr />
                        <h5 className="card-title col-md-1"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary">  Ajout site</a></h5>
                        <h5 className="card-title col-md-11"> <a href="" data-bs-toggle="modal" data-bs-target="#corbelAdmin" className="btn btn-primary"> <i className="mdi mdi-delete"></i> Corbeille</a></h5>
                    </div>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Code</th>
                                    <th>Nom site</th>
                                    <th>Ville</th>
                                    <th>Province</th>
                                    <th>Zone</th>
                                    <th>Adresse</th>
                                    <th>Telephone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    site.map((e) => {
                                        return (
                                            <tr>
                                                <td>{ns++}</td>
                                                <td>{e.CodeSite}</td>
                                                <td>{e.nom_site}</td>
                                                <td>{e.ville}</td>
                                                <td>{e.province}</td>
                                                <td>{e.NomZone}</td>
                                                <td>{e.adress}</td>
                                                <td>{e.tel}</td>
                                                <td>
                                                    <button onClick={() => DeleteSite(e.id)} className="btn btn-danger"><i className="mdi mdi-delete"></i></button> &nbsp;
                                                    <button data-bs-toggle="modal" data-bs-target="#DetailUpdateAdmin" onClick={() => DetailUpdateAdmin(e.id)} className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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


            <div className="modal fade" id="addadmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajout site</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label for="">Code site</label>
                                <input type="text" onChange={(e) => setcodesite(e.target.value)} className="form-control" />
                                <label for="">Nom site</label>
                                <input type="text" onChange={(e) => setnomsite(e.target.value)} className="form-control" />
                                <label for="">Ville</label>
                                <select name="site" onChange={(e) => setvillesite(e.target.value)} className="form-control">
                                    {
                                        ville.map((e) => {
                                            return (
                                                <option key={e.id} value={e.id}>{e.ville}</option>
                                            );
                                        })
                                    }
                                </select>
                                <label for="">Zone</label>
                                <select name="site" onChange={(e) => setzonesite(e.target.value)} className="form-control">
                                   
                                </select>
                                <div>
                                    <label for="">Adresse</label>
                                    <input type="text" onChange={(e) => setadresse(e.target.value)} className="form-control" />
                                    <label for="">Telephone</label>
                                    <input type="text" onChange={(e) => settel(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={ajouterSite} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="corbelAdmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Liste de sites supprimés</h5>
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
                                                <th>Code</th>
                                                <th>Nom site</th>
                                                <th>Ville</th>
                                                <th>Province</th>
                                                <th>Zone</th>
                                                <th>Adresse</th>
                                                <th>Telephone</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                siteDelete.map((e) => {
                                                    return (
                                                        <tr>
                                                            <td>{ns++}</td>
                                                            <td>{e.CodeSite}</td>
                                                            <td>{e.nom_site}</td>
                                                            <td>{e.ville}</td>
                                                            <td>{e.nom_site}</td>
                                                            <td>{e.NomZone}</td>
                                                            <td>{e.adress}</td>
                                                            <td>{e.tel}</td>
                                                            <td>
                                                                <button onClick={() => RestaurationSite(e.id)} className="btn btn-success"><i class="fa fa-history"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <center>
                                        {
                                            siteDelete.length <= 0 && (
                                                <h5 className="text-center">Pas des données</h5>
                                            )
                                        }
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
                </div>
            </div>

            <div className="modal fade" id="DetailUpdateAdmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier un site</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center>
                                {
                                    loadingupdate === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                    )
                                }
                            </center>
                            {
                                detailupdatedata.map((datupd) => {
                                    return (
                                        <div>
                                            <div>
                                                <label for="">Code site</label>
                                                <input type="text" value={datupd.CodeSite} onChange={(e) => setcodesite(e.target.value)} className="form-control" />
                                                <label for="">Nom site</label>
                                                <input type="text" value={datupd.nom_site} onChange={(e) => setnomsite(e.target.value)} className="form-control" />
                                                <label for="">Ville</label>
                                                <select name="site" onChange={(e) => setvillesite(e.target.value)} className="form-control">
                                                    <option value={datupd.id} >{datupd.ville} </option>
                                                    {
                                                        ville.map((e) => {
                                                            return (
                                                                <option key={e.id} value="{e.id}">{e.ville}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <label for="">Zone</label>
                                                <select name="site" onChange={(e) => setzonesite(e.target.value)} className="form-control">
                                                    <option value={datupd.id} >{datupd.NomZone} </option>
                                                    {
                                                        zonev.map((e) => {
                                                            return (
                                                                <option key={e.id} value="{e.id}">{e.NomZone}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                <div>
                                                    <label for="">Adresse</label>
                                                    <input type="text" value={datupd.adress} onChange={(e) => setadresse(e.target.value)} className="form-control" />
                                                    <label for="">Telephone</label>
                                                    <input type="text" value={datupd.tel} onChange={(e) => settel(e.target.value)} className="form-control" />
                                                </div>
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
export default Site;