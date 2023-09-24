import React, { useEffect, useState } from "react";
import axios from "axios";



const RechercheGroupe = () => {
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [marque, setmarque] = useState([])
    const [displayModele, setdisplayModele] = useState('none')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}marque`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmarque(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const [modele, setmodele] = useState([])
    const handleOnchageMarque = (e) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}model/${e}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmodele(response.data.data);
            setdisplayModele(displayModele === 'none' ? 'block' : 'block')
        }).catch((error) => {
            alert(error)
        })
    }

    const [province, setprovince] = useState([])
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

    const [ville, setville] = useState([])
    const [displayVille, setdisplayVille] = useState('none')
    const handleOnchageVille = (e) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}villeProvince/${e}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setville(response.data.data);
            setdisplayVille(displayVille === 'none' ? 'block' : 'block')
        }).catch((error) => {
            alert(error)
        })
    }

    //groupe
    const [groupe, setgroupe] = useState([])
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}site/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setgroupe(response.data.data);
                }).catch((error) => {
                    alert(error)
                })
            })
        }
    }, [])

    //site
    const [siteR, setsiteR] = useState([])
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
            setsiteR(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    //type carburant
    const [typec, settypec] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}type_carburant`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settypec(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    const [Loading, setLoading] = useState(false)
    const [rechgroupe, setrechgroupe] = useState([])
    const [displayRecherche, setdisplayRecherche] = useState('none')
    const [resultat, setresultat] = useState('')
    //button affichage
    const afficher = () => {
        const sites = JSON.parse(localStorage.getItem("site"))
        setLoading(true);
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}pleingenrecherche/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setrechgroupe(response.data.data);
                    setLoading(false);
                    setdisplayRecherche(displayRecherche === 'none' ? 'block' : 'block')
                    setresultat('Resultat de votre recherche')
                }).catch((error) => {
                    alert(error + 'd')
                })
            })
        }
    }
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <center>
                        <h5 class="card-title">RECHERCHE SUR LES PRELEVEMENTS CARBURANT</h5>
                    </center>
                    <hr />
                    <div class="table-responsive">
                        <div className="row">
                            <div className="col-md-1">
                                <label>Période</label>
                            </div>
                            <div className="col-md-3">
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-5">
                            </div>
                            <div className="col-md-3">
                                <label>Marque</label>
                                <select className="form-control" onChange={(e) => handleOnchageMarque(e.target.value)}>
                                    <option>--marque--</option>
                                    {
                                        marque.map((mq) => {
                                            return (
                                                <option value={mq.id} key={mq.id}>{mq.marque}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Modele</label>
                                <select style={{ display: displayModele }} className="form-control">
                                    {
                                        modele.map((mdl) => {
                                            return (
                                                <option value={mdl.modele} key={mdl.modele}>{mdl.modele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Province</label>
                                <select className="form-control" onClick={(e) => handleOnchageVille(e.target.value)}>
                                    <option>--choisir Province--</option>
                                    {
                                        province.map((pc) => {
                                            return (
                                                <option value={pc.id} key={pc.id}>{pc.province}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Ville</label>
                                <select style={{ display: displayVille }} className="form-control">
                                    {
                                        ville.map((vl) => {
                                            return (
                                                <option value={vl.id} key={vl.id}>{vl.ville}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Generateur</label>
                                <select className="form-control">
                                    <option>--choisir Groupe --</option>
                                    {
                                        groupe.map((gr) => {
                                            return (
                                                <option value={gr.id} key={gr.id}>{gr.nom_site}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Numero BC</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label>Agent</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label>Quantité</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label>Site</label>
                                <select className="form-control">
                                    <option>--Choisir site---</option>
                                    {
                                        siteR.map((stss) => {
                                            return (
                                                <option value={stss.id} key={stss.id}>{stss.nom_site}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>Carburant</label>
                                <select className="form-control">
                                    <option>--choisir carburant---</option>
                                    {
                                        typec.map((tp) => {
                                            return (
                                                <option value={tp.id} key={tp.id}>{tp.nom_carb}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <br />
                                <button onClick={afficher} className="btn btn-primary">Afficher</button>
                            </div>
                            <div className="col-md-3">
                            <br />

                                <h5>{resultat}</h5>
                            </div>
                        </div>
                    </div>
                    <center>
                        {
                            Loading === true && (
                                <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                            )
                        }
                    </center>
                    <div className="responsive" style={{ display: displayRecherche }} >
                        <table
                            id="zero_config"
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Ref</th>
                                    <th>Code</th>
                                    <th>Groupe</th>
                                    <th>Modele</th>
                                    <th>Date_pelin</th>
                                    <th>Index</th>
                                    <th>Quantité</th>
                                    <th>Carburant</th>
                                    <th>Agent</th>
                                    <th>Utilisateur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rechgroupe.map((e) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {e.id}
                                                </td>
                                                <td>{e.codegroupe}</td>
                                                <td>
                                                    {e.nom_site + e.id}
                                                </td>
                                                <td>{e.modele}</td>
                                                <td>{e.date_plein}</td>
                                                <td>{e.heures}</td>
                                                <td>{e.qteplein}</td>
                                                <td>{e.nom_carb}</td>
                                                <td>{e.agent}</td>
                                                <td>{e.user}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RechercheGroupe
