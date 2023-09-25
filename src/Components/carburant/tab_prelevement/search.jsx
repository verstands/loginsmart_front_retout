import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Search_vehicule = () => {
    const [immatriculation, setimmatriculation] = useState([]);
    const [chauffeur, setchauffeur] = useState([]);
    const [marque, setmarque] = useState([]);
    const [province, setprovince] = useState([]);
    const [ville, setville] = useState([]);
    const [sitevariable, setsitevariable] = useState([]);
    const [loadingR, setLoadingR] = useState(false);
    //*************************************************** */
    const [dateDebut, setdateDebut] = useState("null");
    const [dateFin, setdateFin] = useState("null");
    const [immatriculations, setimmatriculations] = useState("null");
    const [numerobc, setnumerobc] = useState("null");
    const [chauffeurs, setchauffeurs] = useState("null");
    const [marques, setmarques] = useState("null");
    const [modeles, setmodeles] = useState("null");
    const [provinces, setprovinces] = useState("null");
    const [villes, setvilles] = useState("null");
    const [quantites, setquantites] = useState("null");
    const [carburant, setcarburant] = useState("null");
    const [sites, setsites] = useState("null");
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [searchs, setsearchs] = useState([]);
    const siteSession = localStorage.getItem("siteSession");


    const recherche = () => {
        setLoadingR(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}recherche_carburant/${dateDebut}/${dateFin}/${immatriculations}/${numerobc}/${chauffeurs}/${marques}/${modeles}/${provinces}/${villes}/${quantites}/${carburant}/${sites}/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setsearchs(response.data.data);
            setLoadingR(false)
        }).catch((error) => {
            alert(error)
            setLoadingR(false)

        })
    }

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setimmatriculation(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVICE_API}chauffeur/${siteSession}`,
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

        })

    }, [])

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

        })
    }, [])
    const [type_carb, settype_carb] = useState([]);
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
            settype_carb(response.data.data);
        }).catch((error) => {

        })
    }, [])
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVICE_API}site/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setsitevariable(response.data.data);
        }).catch((error) => {

        })

    }, [])
    const [modelstyle, setmodelstyle] = useState('none');
    const [modelss, setmodelss] = useState([]);
    const handelOnchangeMarque = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}model/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setmodelss(response.data.data);
            setmodelstyle(modelstyle === 'none' ? 'block' : 'none')
        }).catch((error) => {
            alert(error)
        })
    }

    const [villestyle, setvillestyle] = useState('none');
    const [villess, setvilless] = useState([]);
    const handelOnchangeVille = (event) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}villeProvince/${event}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvilless(response.data.data);
            setvillestyle(modelstyle === 'none' ? 'block' : 'none')
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="">Periode</label>
                            <input type="date" onChange={(e) => setdateDebut(e.target.value)} className="form-control" /><br />
                            <input type="date" onChange={(e) => setdateFin(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Immatriculation</label>
                            <select name="" onChange={(e) => setimmatriculations(e.target.value)} className="form-control">
                                {
                                    immatriculation.map((imm) => {
                                        return (
                                            <option value={imm.id} key={imm.id}>{imm.immatriculation}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Numero BC</label>
                            <input type="text" onChange={(e) => setnumerobc(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Chauffeur</label>
                            <select onChange={(e) => setchauffeurs(e.target.value)} id="" className="form-control">
                                {
                                    chauffeur.map((chauf) => {
                                        return (
                                            <>
                                                <option key={chauf.id} value={chauf.id}>{chauf.nom + " " + chauf.prenom}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Marque</label>
                            <select onChange={(e) => { setmarques(e.target.value); handelOnchangeMarque(e.target.value) }} id="" className="form-control">
                                <option>--Marque--</option>
                                {
                                    marque.map((mar) => {
                                        return (
                                            <option key={mar.id} value={mar.id}>{mar.marque}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Model</label>
                            <select onChange={(e) => setmodeles(e.target.value)} className="form-control" style={{ display: modelstyle }}>
                                {
                                    modelss.map((modeles) => {
                                        return (
                                            <option value={modeles.id} key={modeles.id}>{modeles.modele}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Province</label>
                            <select name="" onChange={(e) => { setprovinces(e.target.value); handelOnchangeVille(e.target.value) }} className="form-control">
                                <option>--province---</option>
                                {
                                    province.map((pro) => {
                                        return (
                                            <option value={pro.id} key={pro.id}>{pro.province}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Ville</label>
                            <select onChange={(e) => setvilles(e.target.value)} className="form-control" style={{ display: villestyle }}>
                                {
                                    villess.map((vill) => {
                                        return (
                                            <option value={ville.id} key={vill.id}>{vill.ville}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Quantite</label>
                            <input type="text" onChange={(e) => setquantites(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Carburant</label>
                            <select onChange={(e) => setcarburant(e.target.value)} className="form-control">
                                {
                                    type_carb.map((vill) => {
                                        return (
                                            <option value={ville.id} key={vill.id}>{vill.nom_carb}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">Site</label>
                            <select onChange={(e) => setsites(e.target.value)} className="form-control">
                                {
                                    sitevariable.map((sitv) => {
                                        return (
                                            <option value={sitv.id} key={sitv.id}>{sitv.nom_site}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <br />
                            <button onClick={recherche} className="btn btn-primary"> <i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
                <center>
                    {
                        loadingR === true && (
                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                        )
                    }
                </center>
                <div className="table-responsive">
                    <table
                        id="zero_config"
                        className="table table-striped table-bordered"
                    >
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Date</th>
                                <th>Marque</th>
                                <th>Modele</th>
                                <th>Quantité</th>
                                <th>Kilometrage</th>
                                <th>Carburant</th>
                                <th>Chauffeur</th>
                                <th>Site</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchs.map((shs) => {
                                    return (
                                        <tr>
                                            <td>{shs.id}</td>
                                            <td>{shs.dateserv}</td>
                                            <td>{shs.marque}</td>
                                            <td>{shs.modele}</td>
                                            <td>{shs.qteplein}</td>
                                            <td>{shs.kilometrage}</td>
                                            <td>{shs.nom_carb}</td>
                                            <td>{shs.nom + shs.prenom}</td>
                                            <td>{shs.nom_site}</td>
                                            <td>
                                                <button className="mdi mdi-delete btn btn-danger"></button>&nbsp;
                                                <button data-bs-toggle="modal" data-bs-target="#updatePrelevement" className="fa fa-edit btn btn-primary"></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Search_vehicule;