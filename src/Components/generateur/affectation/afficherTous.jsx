import React from "react";

const AfficherTous_general = () => {
  return(
    <>
        <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> <a href="" data-bs-toggle="modal" data-bs-target="#addville" className="btn btn-primary"> + Afecter</a></h5>
                  <div className="table-responsive">
                    <table
                      id="zero_config"
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>Matricule</th>
                          <th>Nom</th>
                          <th>Prenom</th>
                          <th>Telephone</th>
                          <th>Fonction</th>
                          <th>Affectation</th>
                          <th>Conge</th>
                          <th>Detail</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                            
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="addville" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ville + </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div className="modal-body">
                            <div>
                                <label for="">Province</label>
                                <select name="site"  className="form-control">
                                    
                                </select>
                                <div>
                                <label for="">Ville</label>
                                <input type="text"   className="form-control" />
                            </div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary">Ajouter</button>
                    </div>
                </div>
            </div>
            </div>
    </>
  );
}

export default AfficherTous_general;