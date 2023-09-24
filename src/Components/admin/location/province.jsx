import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Province = () => {
    const [province, setprovince] = useState([]);
    const [pays, setpays] = useState([]);
    const [pay, setpay] = useState("");
    const [provinc, setprovinc] = useState("");

    let np = 1
    let token = `Bearer ${localStorage.getItem("token")}`;


    const ajouterProvince = () => {
        if (provinc == "") {
            Swal.fire({
                icon: 'error',
                text: 'Veuillez remplir tous les champs',
            });
        } else {
            axios.post(`${process.env.REACT_APP_SERVICE_API}province`,
                {
                    province: provinc,
                    id_pays: pay,
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
            }).catch((error) => {
                alert(error)
            })
        }
    }
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

    const [restoreProvince, setrestoreProvince] = useState([]);
    const [loadingPro, setloadingPro] = useState(false);
    useEffect(() => {
        setloadingPro(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}provinceRes`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setrestoreProvince(response.data.data);
            setloadingPro(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}pays`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setpays(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])



    const DeleteProvince = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}province/${id}`, {
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
            window.location.reload()
        }).catch((error) => {
            alert(error)
        })
    }

    const RestProvince = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}provinceRes/${id}`, {
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
            window.location.reload()
        }).catch((error) => {
            alert(error)
        })
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title col-md-2"> <a href="" data-bs-toggle="modal" data-bs-target="#addprovince" className="btn btn-primary"> Ajout Province</a></h5>
                        <h5 className="card-title col-md-10"> <a href="" data-bs-toggle="modal" data-bs-target="#CorbeilleProvince" className="btn btn-primary"> <i className="mdi mdi-delete"></i> corbeille</a></h5>
                    </div>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Province</th>
                                    <th>Pays</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    province.map((e) => {
                                        return (
                                            <tr>
                                                <td>{np++}</td>
                                                <td>{e.province}</td>
                                                <td>{e.pays}</td>
                                                <td>
                                                    <button onClick={() => DeleteProvince(e.id)} className="btn btn-danger"><i className="mdi mdi-delete"></i></button> &nbsp;
                                                    <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addprovince" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Province + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label for="">Pays</label>
                                <select onChange={(e) => setpay(e.target.value)} name="site" className="form-control">
                                    {
                                        pays.map((py) => {
                                            return (
                                                <option key={py.id} value={py.id}>{py.pays}</option>
                                            );
                                        })
                                    }
                                </select>
                                <div>
                                    <label for="">Province</label>
                                    <input type="text" onChange={(e) => setprovinc(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={ajouterProvince} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="CorbeilleProvince" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">LISTE DE PROVINCES SUPPRIMES </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table
                                id="zero_config"
                                className="table table-striped table-bordered"
                            >
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Province</th>
                                        <th>Pays</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        restoreProvince.map((e) => {
                                            return (
                                                <tr>
                                                    <td>{np++}</td>
                                                    <td>{e.province}</td>
                                                    <td>{e.pays}</td>
                                                    <td>
                                                        <button onClick={() => RestProvince(e.id)} className="btn btn-success"><i className="fa fa-history"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <center>
                                    {
                                        restoreProvince.length <= 0 && (
                                            <h5 className="text-center">Pas des données</h5>
                                        )
                                    }
                                    {
                                        loadingPro === true && (
                                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                        )
                                    }
                                </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Province;