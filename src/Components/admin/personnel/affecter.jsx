import React, { useState, useEffect } from "react"
import axios from "axios";
import Swal from "sweetalert2";

const Affecter = () => {
    const [chauffeur, setchauffeur] = useState([]);
    const [affectation, setaffectation] = useState([]);
    const [chauffeurs, setchauffeurs] = useState('');
    const [site, setsite] = useState('');
    const [dates, setdates] = useState('');
    const [commenttaire, setcommentaire] = useState('NULL');
    let token = `Bearer ${localStorage.getItem("token")}`;
    const url = `${process.env.REACT_APP_SERVICE_API}affectation`;

    const enregistrer = () => {
            axios.post(url, {
                id_site: site,
                id_chauf: chauffeurs,
                commentaire: commenttaire,

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

            }).catch((err) => {
                alert('Erreur' + err);
                console.log('erreur' + err)
            });
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
        axios.get(`${process.env.REACT_APP_SERVICE_API}site`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setaffectation(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="text-center">Affecter un Agent</h3>
                            <div>
                                <label for="">Site d'affecation</label>
                                <select name="site" onChange={(e) => setsite(e.target.value)} className="form-control">
                                    {
                                        affectation.map((e) => {
                                            return (
                                                <>
                                                    <option key={e.id} value={e.id}>{e.nom_site}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="">Chauffeur</label>
                                <select name="site" onChange={(e) => setchauffeurs(e.target.value)} className="form-control">
                                    {
                                        chauffeur.map((e) => {
                                            return (
                                                <>
                                                    <option key={e.id} value={e.id}>{e.nom + " " + e.prenom}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="">Commentaire</label>
                                <textarea rows="3" onChange={(e) => setcommentaire(e.target.value)} className="form-control"></textarea>
                            </div>
                            <br />
                            <button onClick={enregistrer} className="btn btn-primary">Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Affecter;