import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import { format } from 'date-fns';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";


const Prelevement_generateur = () => {
    const [loading, setLoading] = useState(true);
    const [numBon, setnumBon] = useState("");
    const [groupeAgence, setgroupeAgence] = useState("");
    const [dates, setdates] = useState("");
    const [indexs, setindexs] = useState("");
    const [Qte, setQte] = useState("");
    const [carburant, setcarburant] = useState("");
    const [update, setupdate] = useState([]);
    const [loadingD, setloadingD] = useState(false);

    let token = `Bearer ${localStorage.getItem("token")}`;
    const [pleingen, setpleingen] = useState([]);
    const [agence, setagence] = useState([]);
    let n = 1;

    const date = new Date();
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#d11fb6",
            color: "white",
        },
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: window.innerWidth, //the pdf viewer will take up all of the width and height
            height: window.innerHeight,
        },
    });
    //https://blog.logrocket.com/generating-pdfs-react/
    const enregistrer = () => {
        if (numBon == "" || indexs == "" || Qte == "") {
            Swal.fire({
                icon: 'error',
                title: 'Attention',
                text: 'Veillez remplir tous les champs !!!',
            })
        } else {

            setloadingD(true)
            axios.post(`${process.env.REACT_APP_SERVICE_API}pleingen`, {
                numero: numBon,
                agent: groupeAgence,
                date_plein: dates,
                heures: indexs,
                qteplein: Qte,
                type_carb: carburant,
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
                if (error.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        text: `${error.response.data.message}`,
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert(error)
                }
            })
            setloadingD(false)


        }
    }



    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))
        if (sites != "") {
            sites.map((sit) => {
                axios.get(`${process.env.REACT_APP_SERVICE_API}pleingens/${sit.idSite}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    }
                ).then((response) => {
                    setpleingen(response.data.data);
                    setLoading(false);
                }).catch((error) => {
                    alert(error)
                })
            })
        }
    }, [])
    useEffect(() => {
        const sites = JSON.parse(localStorage.getItem("site"))

        axios.get(`${process.env.REACT_APP_SERVICE_API}agence`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setagence(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    const DeleteUser = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}pleingen/${id}`, {
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

    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}pleingen/${id}`;
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
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [vehicule_veh, setvehicule_veh] = useState([])
    const [essance, setessance] = useState("");
    const [display_prevgen, setdisplay_prevgen] = useState('none');
    const [loadingV, setloadingV] = useState(false)
    const handleChange = (e) => {
        setSelectedVehicule(e.value);
        setloadingV(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}pleingen_vehicule/${e.value}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvehicule_veh(response.data.data);
            setloadingV(false);
            setdisplay_prevgen(display_prevgen === 'none')
        }).catch((error) => {
            alert(error)
            setloadingV(false);
        })
    }
    const autocompleteVehicule = () => {
        const options = agence.map((vh) => ({
            label: vh.nom_ag,
            value: vh.id,
        }));
        return (
            <Select
                options={options}
                onChange={handleChange}
            />
        );
    };
    const [isDisabled, setIsDisabled] = useState(false);
    const handleDisable = () => {
        setIsDisabled(true);
    }

    

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <h3 className="text-center">ENREGISTREMENT PLEIN GENERATEUR</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div >
                                    <label for="">Numero de bon</label>
                                    <input type="text" onChange={(e) => setnumBon(e.target.value)} className="form-control" />
                                </div>
                                <div >
                                    <label for="">Groupe Agence</label>
                                    {autocompleteVehicule()}
                                </div>
                                <div >
                                    <label for="">Date</label>
                                    <input type="date" onChange={(e) => setdates(e.target.value)} className="form-control" />
                                </div>
                                <div >
                                    <label for="">Index</label>
                                    <input type="number" onChange={(e) => setindexs(e.target.value)} className="form-control" />
                                </div>
                                <div >
                                    <label for="">Quantité</label>
                                    <input type="number" onChange={(e) => setQte(e.target.value)} className="form-control" />
                                </div>
                                <div >
                                    <label for="">Carburant</label>
                                    <select onChange={(e) => setcarburant(e.target.value)} className="form-control">
                                        <option>---Choissir un carburant---</option>
                                        <option value="essence" key="essence">Essence</option>
                                        <option value="gasoil" key="gasoil">Gasoil</option>
                                    </select>
                                </div>
                                <br />
                                <button onClick={enregistrer} className="btn btn-primary">Enregistrer</button>
                            </div>
                            <div className="col-md-6">
                                <table
                                    id="example" className="table table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Groupe</th>
                                            <th>Date</th>
                                            <th>Qte</th>
                                            <th>Heure</th>
                                            <th>User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pleingen.map((e) => {
                                                return (
                                                    <tr>
                                                        <td>{n++}</td>
                                                        <td>{e.nom_site}</td>
                                                        <td>{e.date_plein}</td>
                                                        <td>{e.qteplein}</td>
                                                        <td>{e.heures}</td>
                                                        <td>{e.user}</td>
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
                            <br />
                            <center>
                                {
                                    loadingV === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                    )
                                }
                            </center>
                            <div className="col-md-12" style={{ display: display_prevgen }}>
                                <div style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}>
                                    <table
                                        id="example" className="table table-striped"
                                    >
                                        <thead>
                                            <tr>
                                                <th>Num</th>
                                                <th>Groupe</th>
                                                <th>Date</th>
                                                <th>Qte</th>
                                                <th>Heure</th>
                                                <th>User</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vehicule_veh.map((vehicule_vehs) => {
                                                    return (
                                                        <tr>
                                                            <td>{vehicule_vehs.nom_site}</td>
                                                            <td>{vehicule_vehs.nom_site}</td>
                                                            <td>{vehicule_vehs.date_plein}</td>
                                                            <td>{vehicule_vehs.qteplein}</td>
                                                            <td>{vehicule_vehs.heures}</td>
                                                            <td>{vehicule_vehs.user}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updatePrelevementGen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="">Numero</label><br />
                                    <input type="text" value={update.numero} className="form-control" />

                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Date plein</label><br />
                                    <input type="text" value={update.date_plein} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Quantite</label><br />
                                    <input type="text" value={update.qteplein} className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Heure</label><br />
                                    <input type="text" value={update.heures} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Type carburant</label><br />
                                    <input type="text" value={update.type_carb} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Agent</label><br />
                                    <input type="text" value={update.agent} className="form-control" />
                                </div><div className="col-md-6">
                                    <label htmlFor="">Observation</label><br />
                                    <input type="text" value={update.observation} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Prelevement_generateur;