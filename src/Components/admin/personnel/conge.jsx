import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Conge = () => {
    const [chauffeur, setchauffeur] = useState([]);
    const [type_conge, settype_conge] = useState([]);
    const [debut, setdebut] = useState("");
    const [chauffeurs, setchauffeurs] = useState("");
    const [fin, setfin] = useState("");
    const [nbrJr, setnbrJs] = useState("");
    const [anneConge, setanneConge] = useState("");
    const [typeconge, settypeconge] = useState("");
    const [commentaire, setcommentaire] = useState("NULL");
    let token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.REACT_APP_SERVICE_API}conge`;
    const valider = () => {
           axios.post(url,
                {
                    datedebut: debut,
                    datefin: fin,
                    nbr_jrs_ouv: nbrJr,
                    annee: anneConge,
                    typ_cong: typeconge,
                    comm: commentaire,
                    martricule_ch: chauffeurs
                },
                {
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
            }).catch((error) => {
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Veillez choisir une date de debut et de fin !!!',
                    })
                } else if (error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Veillez saisir tout les champs !!!',
                    })
                } 
                else {
                    alert(error)
                }
            })
        
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
                    }).catch((error) => {
                        alert(error)
                    })

        }, [])
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_SERVICE_API}type_conges`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            ).then((response) => {
                settype_conge(response.data.data);
            }).catch((error) => {
                alert(error)
            })
        }, [])
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <h2><center>Enregistrer conge</center></h2>
                        <div className="row">
                            <div className="col-md-6">
                                <label for="">Chauffeur</label>
                                <select  onChange={(e) => setchauffeurs(e.target.value)} className="form-control">
                                    {
                                        chauffeur.map((chaf) => {
                                            return (
                                                <>
                                                    <option key={chaf.id} value={chaf.id}>{chaf.nom + " " + chaf.prenom}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label for="">Debut congé</label>
                                <input type="date" onChange={(e) => setdebut(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Fin congé</label>
                                <input type="date" onChange={(e) => setfin(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Nbr jours ouvrables</label>
                                <input type="number" onChange={(e) => setnbrJs(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Anne de congé</label>
                                <input type="number" onChange={(e) => setanneConge(e.target.value)} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label for="">Type de congé</label>
                                <select name="site" onChange={(e) => settypeconge(e.target.value)} className="form-control">
                                    {
                                        type_conge.map((tg) => {
                                            return (
                                                <>
                                                    <option key={tg.id} value={tg.id}>{tg.lib_typ_cong}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label for="">Commentaire</label>
                                <textarea name="commentaire" onChange={(e) => setcommentaire(e.target.value)} id="" className="form-control" cols="30" rows="3"></textarea> <br />
                            </div>
                            <button onClick={valider} className="btn btn-primary col-md-2">Valider</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default Conge;