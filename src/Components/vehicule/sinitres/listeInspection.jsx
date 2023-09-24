import React, {useEffect, useState} from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";

const ListeInspection = () => {
    const [loading, setloading] = useState(true)
    const [rij, setrij] = useState([]);
    let token = `Bearer ${localStorage.getItem("token")}`;


    //service
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}inspection_journaliere`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setrij(response.data.data);
            setloading(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])

    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const pleinPerPage = 22;
    const pagesVisited = pageNumber * pleinPerPage;
    const displayPlein = rij
        .slice(pagesVisited, pagesVisited + pleinPerPage)
        .map((e) => {
            return (
                <tr>
                   
                    <td>{e.id}</td>
                    <td>{e.vehicule}</td>
                    <td>{e.date_cr}</td>
                    <td>{e.lieu}</td>
                    <td>{e.chauffeur}</td>
                    <td>{e.commentaire}</td>    
                    <td>
                        <button data-bs-toggle="modal"  data-bs-target="#Update" className="fa fa-edit btn btn-primary"></button>
                    </td>
                    <td>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Detail">
                            <i className="mdi mdi-apps"></i>
                        </button>
                    </td>
                </tr>
            );
        });

    const pageCount = Math.ceil(rij.length / pleinPerPage);

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

    return(
        <>
            <div class="card">
                <div class="card-body">
                    <center>
                        <h5 class="card-title">RAPPORT D'INSPECTION JOURNALIERES</h5>
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
                                    <th>Date</th>
                                    <th>Vehicule</th>
                                    <th>Par</th>
                                    <th>Commentaire</th>
                                    <th>Action</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
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
        </>
    )
}

export default ListeInspection;