import React, { useState, useEffect } from "react"
import axios from 'axios';
import Swal from 'sweetalert2';
import QRcode from 'qrcode.react';
import { useNavigate } from "react-router-dom";

const Chauffeur = () => {
    const [chauffeur, setchauffeur] = useState([]);
    const [dt, setdt] = useState([]);
    const [fonction, setfonction] = useState([]);
    const [typecontrat, settypecontrat] = useState([]);
    let token = `Bearer ${localStorage.getItem("token")}`;
    const url = '${process.env.REACT_APP_SERVICE_API}chauffeur';
    const [nom, setnom] = useState("");
    const [prenom, setprenom] = useState("");
    const [telephone, settelephone] = useState("");
    const [daten, setdaten] = useState("");
    const [datee, setdatee] = useState("");
    const [etatcivil, setetatcivil] = useState("");
    const [sexe, setsexe] = useState("");
    const [fonctions, setfonctions] = useState("");
    const [typecontrats, settypecontrats] = useState("");
    const [permi, setpermi] = useState("");
    const [catpermi, setcatpermi] = useState("");
    const [validite, setvalidite] = useState("");
    const [adresse, setadresse] = useState("");
    const [photo, setphoto] = useState("kkk");
    const [travail, settravail] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingD, setLoadingD] = useState(false);

    const valider = () => {
        if (nom == "" || prenom == "" || telephone == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Veuillez remplir tous les champs !!!',
            })
        } else {
            axios.post(url, {
                matricule_ch: nom,
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                adresse: adresse,
                etaciv: etatcivil,
                date_eng: datee,
                date_fin: datee,
                statut: 0,
                profil: photo,
                date_nais: daten,
                date_cr: daten,
                user_cr: nom,
                sexe: sexe,
                type_contrat: typecontrats,
                typ_trav: travail,
                commentaire: travail,
                telephon_serv: telephone,
                id_permi: catpermi,
                ville: sexe,
                champ_modif: sexe
            },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }).then((response) => {

                })
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}chauffeur`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setchauffeur(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error + 'chauffeur')
        })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}contrat`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settypecontrat(response.data.data);
        }).catch((error) => {
            alert(error + 'contrat')
        })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}fonction`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setfonction(response.data.data);
        }).catch((error) => {
            alert(error + 'fonction')
        })
    }, [])
    const Deletechauffeur = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}chauffeur/${id}`, {
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
            window.location.reload()
        }).catch((error) => {
            alert(error + 'delete')
        })
    }

    const DetailChauffeur = (id) => {
        setLoadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}chauffeurID/${id}`;
        axios.get(urlDetail,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {

            setdt(response.data.data);
            setLoadingD(false)
        }).catch((error) => {
            alert(error + 'detail')
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h2><center>LiISTE DES CHAUFFEURS & MECANICIENS</center></h2>
                    <hr />
                    <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addadmin" className="btn btn-primary"> Ajouter chauffeur</a></h5>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Matricule</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Telephone</th>
                                    <th>Fonction</th>
                                    <th>Affectation</th>
                                    <th>Conges</th>
                                    <th>Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    chauffeur.map((e) => {
                                        return (
                                            <tr>
                                                <td>{e.matricule_ch}</td>
                                                <td>{e.nom}</td>
                                                <td>{e.prenom}</td>
                                                <td>{e.telephone}</td>
                                                <td>{e.typ_trav}</td>
                                                <td>{e.nom_site}</td>
                                                <td>{e.id_permi}</td>
                                                <td>
                                                    <button onClick={() => DetailChauffeur(e.id)} data-bs-toggle="modal" data-bs-target="#Detail" className="btn btn-primary"> <i className="mdi mdi-apps"></i></button>
                                                </td>
                                                <td>

                                                    <button onClick={() => Deletechauffeur(e.id)} className="mdi mdi-delete btn btn-danger"></button>
                                                    &nbsp;
                                                    <button onClick={() => DetailChauffeur(e.id)} className="fa fa-edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#UpdateC"></button>
                                                </td>
                                            </tr>
                                        );
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
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ajout d'un chauffeur </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div>
                                        <label for="">Nom</label>
                                        <input type="text" onChange={(e) => setnom(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <label for="">Prenom</label>
                                        <input type="text" onChange={(e) => setprenom(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <label for="">Telephone</label>
                                        <input type="number" onChange={(e) => settelephone(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <label for="">Date de naissance</label>
                                        <input type="date" onChange={(e) => setdaten(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <label for="">Date engagement</label>
                                        <input type="date" className="form-control" onChange={(e) => setdatee(e.target.value)} />
                                    </div>
                                    <div>
                                        <label for="">Etat civil</label>
                                        <select name=" site" onChange={(e) => setetatcivil(e.target.value)} className="form-control">
                                            <option value="admin">Admin</option>
                                            <option value="utilisateur">Utilisateur</option>
                                            <option value="manager">Menager</option>
                                            <option value="auditeur">Auditeur</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Sexe</label>
                                        <select name=" site" onChange={(e) => setsexe(e.target.value)} className="form-control">
                                            <option value="admin">Admin</option>
                                            <option value="utilisateur">Utilisateur</option>
                                            <option value="manager">Menager</option>
                                            <option value="auditeur">Auditeur</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Fonction</label>
                                        <select name="site" onChange={(e) => setfonctions(e.target.value)} className="form-control">
                                            {
                                                fonction.map((e) => {
                                                    return (
                                                        <option value="{ e.NomFonc }">{e.NomFonc}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Type de contrat</label>
                                        <select name=" site" onChange={(e) => settypecontrats(e.target.value)} className="form-control">
                                            {
                                                typecontrat.map((e) => {
                                                    return (
                                                        <option value="{ e.nom_contr }">{e.nom_contr}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Type de travail</label>
                                        <select name="site" onChange={(e) => settravail(e.target.value)} className="form-control">
                                            <option value="admin">Admin</option>
                                            <option value="utilisateur">Utilisateur</option>
                                            <option value="manager">Menager</option>
                                            <option value="auditeur">Auditeur</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">N° Permis de conduire</label>
                                        <input type="text" className="form-control" onChange={(e) => setpermi(e.target.value)} />
                                    </div>
                                    <div>
                                        <label for="">Categorie Permis</label>
                                        <select name=" site" className="form-control" onChange={(e) => setcatpermi(e.target.value)}>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="">Validité</label>
                                        <input type="Date" className="form-control" onChange={(e) => setvalidite(e.target.value)} />
                                    </div>
                                    <div>
                                        <label for="">Adresse</label>
                                        <textarea name="" className="form-control" onChange={(e) => setadresse(e.target.value)} id="" cols="20" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <center>
                                        <i className="fa fa-user-circle" style={{ fontSize: 100 }}></i><br />
                                    </center>
                                    <input type="file" className="form-control" />
                                    <br />
                                    <br />
                                    <p>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={valider} className="btn btn-primary">Valider</button>
                        </div>
                    </div>
                </div>
            </div>




           

            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail :  </h5>
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
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="">Photo</label><br />
                                    <i className="fa fa-user-circle" style={{ fontSize: 40 }}></i>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" desabled className="form-control" value={dt.matricule_ch} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Nom</label><br />
                                    <input type="text" desabled className="form-control" value={dt.nom} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Telephone</label><br />
                                    <input type="text" desabled className="form-control" value={dt.telephone} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Adrsse</label><br />
                                    <input type="text" desabled className="form-control" value={dt.adresse} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Etat civil</label><br />
                                    <input type="text" desabled className="form-control" value={dt.etaciv} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date Enregistrement</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_eng} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date fin</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_fin} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date de naissance</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_nais} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date cr</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_cr} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">User</label><br />
                                    <input type="text" desabled className="form-control" value={dt.user_cr} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Prenom</label><br />
                                    <input type="text" desabled className="form-control" value={dt.prenom} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="UpdateC" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail :  </h5>
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
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="">Photo</label><br />
                                    <i className="fa fa-user-circle" style={{ fontSize: 40 }}></i>
                                    <input type="file" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text"  className="form-control" value={dt.matricule_ch} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Nom</label><br />
                                    <input type="text" desabled className="form-control" value={dt.nom} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Telephone</label><br />
                                    <input type="text" desabled className="form-control" value={dt.telephone} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Adrsse</label><br />
                                    <input type="text" desabled className="form-control" value={dt.adresse} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Etat civil</label><br />
                                    <input type="text" desabled className="form-control" value={dt.etaciv} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date Enregistrement</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_eng} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date fin</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_fin} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date de naissance</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_nais} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Date cr</label><br />
                                    <input type="text" desabled className="form-control" value={dt.date_cr} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">User</label><br />
                                    <input type="text" desabled className="form-control" value={dt.user_cr} />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Prenom</label><br />
                                    <input type="text" desabled className="form-control" value={dt.prenom} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Chauffeur