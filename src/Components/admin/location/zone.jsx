import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const Zone = () => {
    const [zoneVar, setZoneVar] = useState([]);
    const [ZoneA, setZoneA] = useState("");
    let nz = 1;
    const url = '${process.env.REACT_APP_SERVICE_API}zone';
    let token = `Bearer ${localStorage.getItem("token")}`;
    const ajouter = () => {
        if (ZoneA == "") {
            Swal.fire({
                icon: 'info',
                text: 'Veuillez remplire ce champs svp !!!',
                confirmButtonText: 'OK'
            })
        } else {
            axios.post(url, {
                NomZone: ZoneA
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
                    text: 'Success',
                    confirmButtonText: 'OK'
                });

            }).catch((err) => {
                alert('Erreur' + err);
                console.log('erreur' + err)
            });
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}zone`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setZoneVar(response.data.data);
        
        }).catch((error) => {
            alert(error);
        });
    }, []);
    const [zoneRestaure, setzoneRestaure] = useState([]);
    const [loadingZone, setloadingZone] = useState(false)
    useEffect(() => {
        setloadingZone(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}zoneRes`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setzoneRestaure(response.data.data);
            setloadingZone(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])


    const DeleteZone = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVICE_API}zone/${id}`, {
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
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h3 className="text-center">LISTE DES ZONES</h3>
                    <hr />
                    <div className="row">
                        <h5 className="card-title col-md-1"> <a href="" data-bs-toggle="modal" data-bs-target="#addZone" className="btn btn-primary"> Ajout zone</a></h5>
                        <h5 className="card-title col-md-11"> <a href="" data-bs-toggle="modal" data-bs-target="#corbeilleZone" className="btn btn-primary"><i className="mdi mdi-delete"></i> Corbeille</a></h5>

                    </div>
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Zone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    /*zoneVar.map((zone) => {
                                        return (
                                            <tr>
                                                <td>{nz++}</td>
                                                <td>{zone.nomZone}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => DeleteZone(zone.id)}>
                                                        <i className="mdi mdi-delete"></i>
                                                    </button>
                                                    &nbsp;
                                                    <button className="btn btn-primary"><i className="fa fa-edit"></i></button>
                                                </td>
                                            </tr>
                                        );
                                    })*/
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addZone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Zone + </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div>
                                    <label for="">Zone</label>
                                    <input type="text" onChange={(e) => setZoneA(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={ajouter} className="btn btn-primary">Ajouter</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="corbeilleZone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Liste des zones supprimées  </h5>
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
                                        <th>Zone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Zone;