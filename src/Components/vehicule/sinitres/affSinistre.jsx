import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import dateFormat from "dateformat";


const Afficher_Sinistre = () => {
    const [sinsitre, setsinistre] = useState([]);
    const [update, setupdate] = useState([]);
    const [loading, setloading] = useState(true)
    const [loadingD, setloadingD] = useState(true)
    const [test, settest] = useState()
    let token = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}sinistre`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setsinistre(response.data.data);
            setloading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])



    const UpdateId = (id) => {
        setloadingD(true)
        let urlDetail = `${process.env.REACT_APP_SERVICE_API}sinistre/${id}`;
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

    const UpdateValide = () => {
        alert('salut');
    }
    const [conclusion, setConclution] = useState([]);
    const Cloture = (e) => {
        let urlSinistre = `${process.env.REACT_APP_SERVICE_API}sinistreIDcloture/${e}`
        axios.get(urlSinistre,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setConclution(response.data.data);
            alert(response.data.data)
            setloadingD(false)
        }).catch((error) => {
            alert(error)
        })
    }

    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 22;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = sinsitre
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>

                    <td>{e.id}</td>
                    <td>{e.vehicule}</td>
                    <td>{dateFormat(e.dat_sinistre, 'dd/mm/yyyy')}</td>
                    <td>{e.lieu}</td>
                    <td>{e.nom}-{e.prenom}</td>
                    <td>{e.commentaire}</td>
                    <td>
                        {
                            e.status_sinistre == 1 ? (
                                <button data-bs-toggle="modal" data-bs-target="#UpdateCloture" onClick={() => Cloture(e.id)}>Cloturé : Conclu</button>
                            ) : (
                                <button data-bs-toggle="modal" data-bs-target="#UpdateCloture" onClick={() => Cloture(e.id)}>Ouvert : non definit</button>
                            )
                        }
                    </td>
                    <td>
                        <button data-bs-toggle="modal" data-bs-target="#Update" className="fa fa-edit btn btn-primary"></button>
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#Detail">
                            <i className="mdi mdi-eye"></i>
                        </button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(sinsitre.length / pleinPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    let active = pageNumber;
    let items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setPageNumber(number - 1)}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <center>
                        <h5 class="card-title"> DIFFERENTS SINISTRES</h5>
                        <hr />
                    </center>
                    <div class="table-responsive">
                        <table
                            id="zero_config"
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Numero</th>
                                    <th>Immatriculation</th>
                                    <th>Date</th>
                                    <th>Lieu</th>
                                    <th>Chauffeur</th>
                                    <th>Commenttaires</th>
                                    <th>Suivi</th>
                                    <th>Action</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>{displayPlein}</tbody>
                        </table>
                        <Pagination>{items}</Pagination>;
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
            <div className="modal fade" id="Detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail : {update.vehicule} </h5>
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
                                <div className="col-md-4">
                                    <label htmlFor="">Immatriculation</label><br />
                                    <input type="text" value={update.vehicule} className="form-control" />

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Lieu</label><br />
                                    <input type="text" value={update.lieu} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Cheuffeur</label><br />
                                    <input type="text" value={update.chauffeur} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Piece</label><br />
                                    <input type="text" value={update.ptierce_vehicule} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Delit de fuit</label><br />
                                    <input type="text" value={update.delit_fuite} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Temoin</label><br />
                                    <input type="text" value={update.temoin} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Nombre de passage au bord</label><br />
                                    <input type="text" value={update.passag_a_bord_p} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Utilisateur</label><br />
                                    <input type="text" value={update.user} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.matricule_ch} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Plage horraire</label><br />
                                    <input type="text" value={update.plage_horaire} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Ville</label><br />
                                    <input type="text" value={update.ville} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce_vehicule} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.delit_fuite} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce_objet} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.passag_a_bord_p} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.passag_a_bord_tiers} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.blesse} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.temoin} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_passag_bord_p} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_passag_bord_ties} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_blesse} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.pv_oui} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.num_pv} className="form-control" />
                                </div>


                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.dat_etab_pv} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.agent} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.gendarmerie} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.commentaire} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.service} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.chauff_t} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.vehicule_t} className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="Update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail : {update.vehicule} </h5>
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
                                <div className="col-md-4">
                                    <label htmlFor="">Immatriculation</label><br />
                                    <input type="text" value={update.vehicule} className="form-control" />

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Lieu</label><br />
                                    <input type="text" value={update.lieu} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Cheuffeur</label><br />
                                    <input type="text" value={update.chauffeur} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Piece</label><br />
                                    <input type="text" value={update.ptierce_vehicule} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Delit de fuit</label><br />
                                    <input type="text" value={update.delit_fuite} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Temoin</label><br />
                                    <input type="text" value={update.temoin} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Nombre de passage au bord</label><br />
                                    <input type="text" value={update.passag_a_bord_p} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Utilisateur</label><br />
                                    <input type="text" value={update.user} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.matricule_ch} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Plage horraire</label><br />
                                    <input type="text" value={update.plage_horaire} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Ville</label><br />
                                    <input type="text" value={update.ville} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce_vehicule} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.delit_fuite} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.ptierce_objet} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.passag_a_bord_p} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.passag_a_bord_tiers} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.blesse} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.temoin} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_passag_bord_p} className="form-control" />
                                </div><div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_passag_bord_ties} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.nbr_blesse} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.pv_oui} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.num_pv} className="form-control" />
                                </div>


                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.dat_etab_pv} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.agent} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.gendarmerie} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.commentaire} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.service} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.chauff_t} className="form-control" />
                                </div> <div className="col-md-4">
                                    <label htmlFor="">Matricule</label><br />
                                    <input type="text" value={update.vehicule_t} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={UpdateValide} className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="UpdateCloture" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SUIVI DE SINISTRE DE N° {conclusion.id} DU {dateFormat(conclusion.dat_sinistre, 'dd-mm-yyyy')} </h5>
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
                                <h6 style={{ backgroundColor: 'gray', padding: '5px' }}>Information générales</h6>
                                <table id="zero_config"
                                    className="table table-striped table-bordered">
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Lieu</td>
                                            <td>{conclusion.lieu}</td>
                                            <td style={{ fontWeight: 'bold' }}>Heure</td>
                                            <td>{conclusion.plage_horaire}</td>
                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Ville</td>
                                            <td>{conclusion.ville}</td>
                                            <td style={{ fontWeight: 'bold' }}>Véhecule</td>
                                            <td>{conclusion.vehicule}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>Chauffeur</td>
                                            <td>{conclusion.nom} {conclusion.prenom}</td>
                                            <td style={{ fontWeight: 'bold' }}> <a href="">plus...</a> </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h6 style={{ backgroundColor: 'gray', padding: '5px' }} className="text-center">EVOLUTION <br /> Etat : </h6>
                                <h6 className="text-center">Type de réglement : </h6>
                                <div className="row">
                                    <div className="col-md-2">
                                        <h6 className="btn btn-primary">555</h6>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Numero</th>
                                            <th>Oberservation</th>
                                            <th>Conclusion</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Afficher_Sinistre;