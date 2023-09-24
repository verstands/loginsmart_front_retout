import React, { useState } from "react";

const Affacter_generateur = ( ) => {
    const [loading, setloading] = useState("")
 return(
    <>
        <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <h3 className="text-center">NOUVELLE AFFECTATION</h3>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="modal-body">
                                    <div className="row">
                                        <h5 className="text-center">Detail de l'affectation</h5>
                                        <hr />
                                        <div className="col-md-6">
                                            <label for="">Générateur</label>
                                            <input type="number"  className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Marque</label>
                                         
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Modèle</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Site</label>
                                            <input type="number"  className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="">Date</label>
                                            <input type="number"  className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Enregister</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <h5 className="text-center">Liste des affectations</h5>
                              <hr />
                                <table
                                    id="example" className="table table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th>immatriculation</th>
                                            <th>Qte</th>
                                            <th>Kilometrage</th>
                                            <th>Date</th>
                                            <th>Utilisateur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
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
                        </div>
                    </div>
                </div>
            </div>
    </>
 )
}

export default Affacter_generateur