import React, {useState, useEffect} from "react";
import axios from "axios";

const ListeConge = () => {
    const [listeconge, setlisteconge] = useState([])
    const [loadconge, setloadconge] = useState(true)
    let token = `Bearer ${localStorage.getItem("token")}`;

    useEffect(() => {
        setloadconge(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}conge`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setlisteconge(response.data.data);
            setloadconge(false)
        }).catch((error) => {
            alert(error + 'fonction')
        })
    }, [])
     return(
        <>
            <div className="card">
                <div className="card-body">
                    <h2><center>LiISTE DES CONGES</center></h2>
                    <hr />
                    <div className="table-responsive">
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                        >
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Date engagement</th>
                                    <th>Date debut</th>
                                    <th>Date fin</th>
                                    <th>Nbr jour</th>
                                    <th>Années</th>
                                    <th>Motif</th>
                                    <th>Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                listeconge.map((e) => {
                                        return (
                                            <tr>
                                                <td>{e.nom}</td>
                                                <td>{e.prenom}</td>
                                                <td>{e.created_at}</td>
                                                <td>{e.date_eng}</td>
                                                <td>{e.date_fin}</td>
                                                <td>{e.nbr_jrs_ouv}</td>
                                                <td>{e.annee}</td>
                                                <td>{e.lib_typ_cong}</td>
                                                <td>
                                                    <button  data-bs-toggle="modal" data-bs-target="#Detail" className="btn btn-primary"> <i className="mdi mdi-apps"></i></button>
                                                </td>
                                                <td>

                                                    <button  className="mdi mdi-delete btn btn-danger"></button>
                                                    &nbsp;
                                                    <button  className="fa fa-edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#UpdateC"></button>
                                                </td>
                                            </tr>
                                        );
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

export default ListeConge;