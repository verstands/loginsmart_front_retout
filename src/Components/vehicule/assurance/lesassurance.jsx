import React, { useState } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

const Leassurance = () => {
    const [statesX, setstate] = useState([]);
    const [loading, setloading] = useState(false)
    const [test, settest] = useState()
    let token = `Bearer ${localStorage.getItem("token")}`;

    const handleChangeState = (envent) => {
        setloading(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}assurances/${envent}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setstate(response.data.data)
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                Swal.fire({
                    imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
                    imageWidth: 200,
                    imageHeight: 200,
                    text: 'Erreur de la connexion !!!',
                    confirmButtonText: 'OK'
                })
                setloading(false)
            }
        })
    }
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 100;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = statesX
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>

                    <td><i className="mdi mdi-arrow-right-drop-circle"></i></td>
                    <td>{e.immat_assurance}</td>
                    <td>{e.marque}</td>
                    <td>{e.modele}</td>
                    <td>{e.nom_ag}</td>
                    <td>{e.num_carte_verte}</td>
                    <td>{e.agence_ass}</td>
                    <td>{e.num_contrat}</td>
                    <td>{e.agence_ass}</td>
                    <td>{e.agence_ass}</td>
                    <td>{e.agence_ass}</td>
                    <td>
                        <button className="fa fa-edit btn btn-danger"></button>&nbsp;
                        <button data-bs-toggle="modal" data-bs-target="#updatePrelevement" className="fa fa-edit btn btn-primary"></button>
                    </td>
                    <td>{e.agence_ass}</td>
                </tr>
            );
        });

    const pageCount = Math.ceil(statesX.length / pleinPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    let active = pageNumber;
    let items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setPageNumber(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <center>
                        <h5 class="card-title"> LISTE DE TOUTES LES ASSURANCES</h5>
                        <hr />
                    </center>
                    <div class="table-responsive">
                        <div className="row">
                            <div className="col-md-5 ">
                                <select className="form-control" onChange={(e) => handleChangeState(e.target.value)}>
                                    <option value="TOUS" key="TOUS">Tous</option>
                                    <option value="COURS" key="COURS">En cours</option>
                                    <option value="EXPIRE" key="EXPIRE">Expire dans 3 mois</option>
                                </select>
                            </div>
                        </div><br />
                        <center>
                            {
                                loading === true && (
                                    <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                )
                            }
                        </center>
                        <table
                            id="zero_config"
                            class="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Immatriculation</th>
                                    <th>Marque</th>
                                    <th>Modele</th>
                                    <th>Agence</th>
                                    <th>Carte verte</th>
                                    <th>N° Police</th>
                                    <th>Garantie</th>
                                    <th>Date debut</th>
                                    <th>Date Fin</th>
                                    <th>Etat Carte Verte</th>
                                    <th>Action</th>
                                    <th>Renouveller</th>
                                </tr>
                            </thead>
                            <tbody>{displayPlein}</tbody>
                        </table>
                        <Pagination>{items}</Pagination>;
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leassurance