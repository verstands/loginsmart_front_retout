import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const FicheTechnique = () => {
  const [un, setun] = useState("");
  const [deux, setdeux] = useState("");
  const [fiche, setfiche] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicule, setvehicule] = useState([])
  const [vehicules, setvehicules] = useState([]);
  const [vehiculess, setvehiculess] = useState([]);
  const [selectedVehicule, setSelectedVehicule] = useState("");
  let token = `Bearer ${localStorage.getItem("token")}`;
  let n = 1;
  const url = `${process.env.REACT_APP_SERVICE_API}recherche_consom/${un}/${deux}`;
  const RechercheBtn = () => {
    setLoading(true)
    axios.get(url,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
      }
    ).then((response) => {
      setvehicule(response.data.data);
      setLoading(false)

    }).catch((error) => {
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'Veillez choisir une date de debut et de fin !!!',
        })
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    const sites = JSON.parse(localStorage.getItem("site"))
    if (sites != "") {
      sites.map((veh) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}vehicule/${veh.idSite}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        ).then((response) => {
          setvehicules(response.data.data);
        }).catch((error) => {

        })
      })
    }
  }, [])

  useEffect(() => {
    const sites = JSON.parse(localStorage.getItem("site"))
    if (sites != "") {
      sites.map((veh) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}groupe/${veh.idSite}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        ).then((response) => {
          setvehiculess(response.data.data);
        }).catch((error) => {

        })
      })
    }
  }, [])
  const handleChange = (e) => {
    setSelectedVehicule(e.value);
  }
  const autocompleteVehicule = () => {
    const options = vehicules.map((vh) => ({
      label: vh.immatriculation ,
      value: vh.id,
    }));
    return (
      <Select
        options={options}
        onChange={handleChange}
      />
    );
  };
  return (
    <>
      <div class="card card-body">
        <br />
        <div class="row">
          <div class="col-md-3">
            <label htmlFor="">Immatriculation</label>
            {autocompleteVehicule()}
          </div>
          <div class="col-md-3">
           <label htmlFor="">Numero d'ordre</label>
            <input type="text" class="form-control" placeholder="Numero d'ordre" />
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary"> <i class="fas fa-search"></i></button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              id="zero_config"
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>N°</th>
                  <th>immatriculation</th>
                  <th>Utilisateur</th>
                  <th>Matricule</th>
                  <th>Qte</th>
                  <th>Kilometrage</th>
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

    </>
  );
}

export default FicheTechnique;