import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Pagination } from "react-bootstrap";
import Recherche_multiple_generateur from "./RechercheM";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";




const AffeichageTous_generateur = () => {
  const [plein, setplain] = useState([])
  const [loading, setLoading] = useState(true);
  let token = `Bearer ${localStorage.getItem("token")}`;
  let n = 1
  useEffect(() => {
    const sites = JSON.parse(localStorage.getItem("site"))
    if (sites != "") {
      sites.map((sit) => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}pleingen/${sit.idSite}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token
            }
          }
        ).then((response) => {
          setplain(response.data.data);
          setLoading(false);
        }).catch((error) => {
          alert(error + 'd')
        })
      })
    }
  }, [])
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#d11fb6",
      color: "white",
    },
    section: {
      margin: 1,
      padding: 1,
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });


  const [loadingD, setloadingD] = useState(false)
  const [vehiculeClone, setupdate] = useState([])
  const UpdateId = (id) => {
    setloadingD(true)
    let urlDetail = `${process.env.REACT_APP_SERVICE_API}pleingenID/${id}`;
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
  //deete
  const DeleteVehicule = (id) => {
    axios.delete(`${process.env.REACT_APP_SERVICE_API}pleingen/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then((response) => {
      Swal.fire({
        icon: 'success',
        text: `${response.message}`,
      });
      window.location.reload();
    }).catch((error) => {
      alert(error)
    })
  }

  const [groupeserie, setgroupeserie] = useState([])
  const GroupeSite = (e) => {
    setloadingD(true)
    let urlDetail = `${process.env.REACT_APP_SERVICE_API}pleingenID/${e}`;
    axios.get(urlDetail,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        }
      }
    ).then((response) => {
      setgroupeserie(response.data.data);
      setloadingD(false)
    }).catch((error) => {
      alert(error)
    })
  }
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const pleinPerPage = 46;
  const pagesVisited = pageNumber * pleinPerPage;
  const displayPlein = plein
    .slice(pagesVisited, pagesVisited + pleinPerPage)
    .map((e) => {
      return (
        <tr>
          <td>
            <Link to={`/ImprimerIDGen/${e.id}`}>
                {e.id}
            </Link>
          </td>
          <td>{e.codegroupe}</td>
          <td>
            <button onClick={() => GroupeSite(e.id)} data-bs-toggle="modal" data-bs-target="#GroSupe">{e.nom_site + e.id}</button>
          </td>
          <td>{e.modele}</td>
          <td>{e.date_plein}</td>
          <td>{e.heures}</td>
          <td>{e.qteplein}</td>
          <td>{e.nom_carb}</td>
          <td>{e.agent}</td>
          <td>{e.user}</td>
          <td>
            <button onClick={() => DeleteVehicule(e.id)} className="btn btn-danger"><i className="mdi mdi-delete"></i></button>
            <button onClick={() => UpdateId(e.id)} data-bs-toggle="modal" data-bs-target="#Details" className="btn btn-primary"><i className="fa fa-edit"></i></button>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(plein.length / pleinPerPage);

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
            <h5 class="card-title"> LISTE DE TOUS LES PRELEVEMENTS</h5>
          </center>
          <hr />
          <div class="table-responsive">
            <table
              id="zero_config"
              class="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Code</th>
                  <th>Groupe</th>
                  <th>Modele</th>
                  <th>Date_pelin</th>
                  <th>Index</th>
                  <th>Quantité</th>
                  <th>Carburant</th>
                  <th>Agent</th>
                  <th>Utilisateur</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayPlein}

              </tbody>
            </table>
            <Pagination>{items}</Pagination>;

            <center>
              {
                loading === true && (
                  <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                )
              }
            </center>
            <center>
              <button onClick={<Recherche_multiple_generateur />}>
                <i className="mdi mdi-file-pdf" style={{ fontSize: 30 }}></i>
              </button>
              <i className="mdi mdi-file-excel" style={{ fontSize: 40 }}></i>
            </center>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Details" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Detail  </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <center>
              {
                loadingD === true && (
                  <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                )
              }
            </center>
            <div className="modal-body">
            {
              vehiculeClone.map((cpc) => {
                return(
                  <div class="row">
                <div class="col-md-3">
                  <label>Ref</label>
                  <input type="text" value={cpc.id} class="form-control" placeholder="Numero de ref" />
                </div>
                <div class="col-md-3">
                  <label>Code</label>
                  <input type="text" value={cpc.codegroupe} class="form-control" placeholder="Numero de ref" />
                </div>
                <div class="col-md-3">
                  <label>Groupe</label>
                  <select className="form-control" >
                    <option value={cpc.nom_site}>{cpc.id}</option>

                  </select>
                </div>
                <div class="col-md-3">
                  <label>Model</label>

                  <select className="form-control" >
                    <option>{cpc.modele}</option>
                  </select>
                </div>
                <br />
                <div class="col-md-3">
                  <label>Date_pelin</label>
                  <input type="date" value={cpc.date_plein} class="form-control" placeholder="Numero serie" />
                </div>
                <div class="col-md-3">
                  <label>Heure</label>
                  <input value={cpc.Heure} type="number" class="form-control" placeholder="2014" />
                </div>
                <div class="col-md-3">
                  <label>Quantite</label>
                  <input type="number" value={cpc.qteplein} class="form-control" placeholder="2014" />
                </div>
                <br />
                <div class="col-md-3">
                  <label>Carburant</label>
                  <select className="form-control">
                    <option>{cpc.nom_carb}</option>
                  </select>
                </div>
              </div>
                )
              })
            }
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="GroSupe" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">FICHE TECHNIQUE GENERATEUR N°   </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <center>
              {
                loadingD === true && (
                  <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                )
              }
            </center>
            <div className="modal-body">
              <h4 className="text-center">IDENFIRICATION</h4>
              <div className="row">
                <div class="col-md-4">
                  <label>Numéro</label>
                  <input type="text" value={groupeserie.id} class="form-control" placeholder="2014" />
                </div>
                <div class="col-md-4">
                  <label>Numéro d'ordre</label>
                  <input type="text" value={groupeserie.id} class="form-control" placeholder="2014" />
                </div>
                <div class="col-md-4">
                  <label>Marque</label>
                  <input type="text" value={groupeserie.id} class="form-control" placeholder="2014" />
                </div>
                <br />
                <br />
                <br />
                <div class="col-md-4">
                  <img src="img/c.jpg" width={200} height={200} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AffeichageTous_generateur;