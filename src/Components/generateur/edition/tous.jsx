import React, {useEffect, useState} from "react";   
import axios from "axios";

const Tous = () => {
    const [groupe, setgroupe] = useState([]);
    let n = 1;
    let token = 'Bearer 1|XXfI3BOr01VoBYgF8nC27oD7KEN1Oh3EULg68Q4a';
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}groupe`,
            {
                headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    Authorization : token
                }
            }
        ).then((response) => {
            setgroupe(response.data.data);
        }).catch((error) => {
            alert(error)
        })
    }, [])
    return(
        <>
            <div className="card">
                <div className="card-body">
                  <h3 className="text-center">LISTE DES GENERATEURS</h3>
                  <hr />
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>N°</th>
                          <th>Code</th>
                          <th>Marque/Modele</th>
                          <th>Carburant</th>
                          <th>Puissance</th>
                          <th>Dimension </th>
                          <th>Mise en service</th>
                          <th>Reservoir</th>
                          <th>Affectation</th>
                          <th>Detail</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                           {
                             groupe.map((e) => {
                                return(
                                    <>
                                         <tr>
                                            <td>{n++}</td>
                                            <td>{e.codegroupe}</td>
                                            <td>{e.modele}</td>
                                            <td>{e.type_carb}</td>
                                            <td>{e.puissance}</td>
                                            <td>{e.dimension}</td>
                                            <td>{e.demarrage}</td>
                                            <td>{e.reservoir}</td>
                                            <td>{e.agent}</td>
                                            <td>
                                                <a href="" btn btn-primary>
                                                    <i className="fa fa-edit"></i>
                                                </a>
                                            </td>
                                            <td>
                                                <a href="" btn btn-primary>
                                                    <i className="fa fa-edit"></i>
                                                </a>
                                                <a href="" btn btn-primary>
                                                    <i className="fa fa-edit"></i>
                                                </a>
                                            </td>
                                         </tr>
                                    </>
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

export default Tous