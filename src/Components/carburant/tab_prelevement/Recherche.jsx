import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Checkbox } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import XLSX from 'xlsx';
import dateFormat from 'dateformat';




const Recherche_carburant = () => {
    const [debut, setdebut] = useState("NULL");
    const [fin, setfin] = useState("NULL");
    const [tableau1, settableau1] = useState("");
    const [tableau2, settableau2] = useState("");
    const [datax, setdata] = useState([]);
    const [loading, setLoading] = useState(false);
    let n = 1;
    let token = `Bearer ${localStorage.getItem("token")}`;
    const [selectedVehicule, setSelectedVehicule] = useState("");
    const [vehicule, setvehicule] = useState([]);
    const [tableauData, setTableauData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const siteSession = localStorage.getItem("siteSession");
    const [tableStyle, settableStyle] = useState("none")
    const [hautDisplay, sethautDisplay] = useState('in-block')

    let navigateRoute = useNavigate();




    //tableauData
    const RechercheBtn = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_SERVICE_API}recherche_consomation/${debut}/${fin}/${siteSession}/${tableauData}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setdata(response.data.data);
            localStorage.setItem("debutSession", debut)
            localStorage.setItem("finSession", fin)
            localStorage.setItem("ImmSession", tableauData)
            setLoading(false)
            settableStyle('block')
            sethautDisplay('none')
        }).catch((error) => {
            if (error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'Veillez selectionner au moins un vehicule',
                })
            } else if (error.response.status === 500) {
                Swal.fire({
                    imageUrl: 'https://img.freepik.com/vecteurs-premium/icone-erreur-du-serveur-internet-concept-connexion-perdue-probleme-reseau-wifi-bouton-web-interface-utilisateur-blanc-neumorphic-ui-ux-neumorphisme-vecteur-eps-10_399089-2750.jpg?w=740',
                    imageWidth: 200,
                    imageHeight: 200,
                    text: 'Erreur de la connexion !!!',
                    confirmButtonText: 'OK'
                })
            } else {
                alert(error)
            }
            setLoading(false)
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}recherche_mutlti/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            setvehicule(response.data.data);
            setLoading(false);
        }).catch((error) => {
            alert(error)
        })
    }, [])

    //afficher les données
    const [chargementData, setchargementData] = useState(true)
    const [titreSearch, settitreSearch] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVICE_API}SearchSelectinneTitre/${siteSession}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        ).then((response) => {
            settitreSearch(response.data.data);
            setchargementData(false)
        }).catch((error) => {
            alert(error)
        })
    }, [])


    const handelClickVehicule = () => {
        if (handleInputSearchs) {
            setTableauData([...tableauData, handleInputSearchs]);
            sethandleInputSearchs('');
        }
    }

    const handelClickVehiculeAll = () => {
        const allOptions = titreSearch.map(titre => titre.dt.map(dt => `${dt.immatriculation}`)).flat();
        setTableauData(allOptions);
    }

    const [dataInput, setDataInput] = useState([]);
    const setInputSearch = (e) => {

    }

    const handleRemoveOption = (value) => {
        const updatedTableauData = tableauData.filter(option => option !== value);
        setTableauData(updatedTableauData);
        setTableauData(updatedTableauData.slice());
    };

    const handleRemoveAllOptions = () => {
        setTableauData([]);
    };

    const handleInputSearch = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setDataInput(inputValue);
        setSearchQuery(inputValue);
    };
    const filteredTitreSearch = titreSearch.map((titre) => {
        const filteredDt = titre.dt.filter((dt) => {
          const searchData = `${dt.immatriculation},${dt.marque},${dt.modele},${dt.type_carb},${dt.nom_site}`.toLowerCase();
          return searchData.includes(searchQuery);
        });
        return { ...titre, dt: filteredDt };
      });
    const [loadingS, setloadingS] = useState(false)
    const [chektrue, setchektrue] = useState(false);
    const PDFz = (event) => {
        setchektrue(event.target.checked)
    }
    const PDF = () => {
        if (chektrue == true) {
            navigateRoute("/PdfprelevementAll");
        } else {
            navigateRoute("/Pdfprelevement");
        }
    }

    const CreateFileExcel = () => {
        if (chektrue == true) {
            navigateRoute("/PdfprelevementAll");
        } else {
            navigateRoute("/Pdfprelevement");
        }
    }

    const [ActiveData, setActiveData] = useState('none')
    const [activeItemId, setActiveItemId] = useState(null);

    const handleActiveData = (id) => {
        setActiveItemId(id);
    }

    const ActualiserPage = () => {
        settableStyle('none')
        sethautDisplay('flex')
    }
    const [b, setb] = useState('')
    const [handleInputSearchs, sethandleInputSearchs] = useState('')
    return (
        <>
            <div class="card card-body">
                <div class="row" style={{ display: hautDisplay }}>
                    <h4 className="text-center">RECHERCHE MULTIPLE</h4>
                    <hr />
                    <form name="export" method="post" onsubmit="javascript: soumettre_1liste( document.forms[0].choix );" action="export.php">
                        <table width={692} height={175} border={0} cellPadding={0} cellSpacing={0} summary>
                            <tbody><tr>
                                <th width={75} style={{ width: '220px' }} />
                                <th width={44} align="center" style={{ width: '150px' }} />
                                <th width={87} style={{ width: '220px' }} />
                                <th width={144} style={{ width: '90px' }} />
                                <th width={144} style={{ width: '90px' }} />
                            </tr>
                                <tr>
                                    <td><h4 className="titre2">Sélection</h4></td>
                                    <td>&nbsp;</td>
                                    <td><h4 className="titre2">Sélectionnés</h4></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td rowSpan={9} valign="bottom">
                                        <input type="text" className="form-control" onChange={handleInputSearch} />
                                        <br />
                                        <select onDoubleClick={handelClickVehicule} style={{ fontSize: '12px' }} onChange={(e) => sethandleInputSearchs(e.target.value)}  size={10} >
                                            {filteredTitreSearch.map((titre) => (
                                                <optgroup label={titre.nom_site} key={titre.nom_site}>
                                                    {titre.dt.map((sd) => (
                                                        <option
                                                            value={sd.immatriculation}
                                                            key={'N°' + sd.id + '/' + sd.immatriculation + sd.marque + sd.modele + sd.type_carb + sd.nom_site}
                                                        >
                                                            {'N°' + sd.id + '/' + sd.immatriculation + ',' + sd.marque + ',' + sd.modele + ',' + sd.type_carb + ',' + sd.nom_site}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {
                                            chargementData === true && (
                                                <p className="text-center">Chargement...</p>
                                            )

                                        }
                                    </td>
                                    <td align="center" />
                                    <td rowSpan={9} valign="bottom">
                                        <select name="" size={8} onChange={(e) => setb(e.target.value)} >

                                            {
                                                tableauData.map((x, index) => {
                                                    return (
                                                        <option key={index} value={x}>{x}</option>
                                                    )
                                                })
                                            }
                                        </select> </td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">&nbsp;</td>
                                    <td rowSpan={4}>&nbsp;</td>
                                    <td rowSpan={4}>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center"><input type="button" defaultValue=">  " onClick={handelClickVehicule} className="btn btn-primary" /></td>
                                </tr>
                                <tr>
                                    <td align="center"><input type="button" defaultValue=">>" onClick={handelClickVehiculeAll} className="btn btn-primary" /></td>
                                    <td rowSpan={3} valign="top"><input type="button" defaultValue="  ˄ " className="btn btn-primary" />
                                        <input type="button" defaultValue="  ˅ " className="btn btn-primary" /></td>
                                    <td rowSpan={3} valign="top">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center"><input type="button" onClick={() => handleRemoveOption(b)} className="btn btn-primary" defaultValue="<  " /></td>
                                </tr>
                                <tr>
                                    <td align="center"><input type="button" onClick={handleRemoveAllOptions} className="btn btn-primary" defaultValue="<<" /></td>
                                </tr>
                                <tr>
                                    <td height={19} align="center">&nbsp;</td>
                                    <td valign="top">&nbsp;</td>
                                    <td />
                                </tr>
                            </tbody></table>
                        <table width={692}>
                            <tbody><tr>
                                <td><h5 className="fancybox-custom">Date début</h5></td>
                                <td><h5 className="fancybox-custom">Date fin</h5></td>
                                <td>&nbsp;</td>
                            </tr>
                            </tbody></table>
                    </form>
                    <br />
                    <br />
                    <div class="col-md-3">
                        <input type="date" onChange={(e) => setdebut(e.target.value)} class="form-control" placeholder="Date debut" />
                    </div>
                    <div class="col-md-3">
                        <input type="date" onChange={(e) => setfin(e.target.value)} class="form-control" placeholder="Date fin" />
                    </div>
                    <div class="col-md-3">
                        <button onClick={RechercheBtn} class="btn btn-primary"><i className="fa fa-eye"></i> Afficher</button>
                    </div>
                </div>
                <center>
                    {
                        loading === true && (
                            <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                        )
                    }
                </center>
                <div className="card-body" style={{ display: tableStyle }}>
                    <div className="table-responsive">
                        <button onClick={ActualiserPage}>Actualiser</button>
                        <h5 className="text-center">RESULTAT DE RECHERCHE POUR PRELEVEMENTS VEHICULES</h5>
                        <br />
                        <table
                            id="zero_config"
                            className="table table-striped table-bordered"
                            align="center" cellspacing="1"
                            width="100%"
                        >
                            <thead>
                                <tr height="28">
                                    <th width="40"></th>
                                    <th width="90">immatriculation</th>
                                    <th width="90">Marque</th>
                                    <th width="90">Modele</th>
                                    <th width="90">Carburant</th>
                                    <th width="90">Site</th>
                                    <th width="90">Peridode</th>
                                    <th width="90">Nbre de plein</th>
                                    <th width="90">Nbre de jours</th>
                                    <th width="90">Total L</th>
                                    <th width="90">Total Km</th>
                                    <th width="90">Frequence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datax.map((e) => {
                                        return (
                                            <>
                                                <tr height="28" align="center" key={e.id}>
                                                    <td width="40">
                                                        {
                                                            e.tt === 1 && (

                                                                <button onClick={() => handleActiveData(e.id)} data-id={e.id}>
                                                                    {
                                                                        activeItemId === e.id ? "-" : <i className="fas fa-arrow-circle-left" style={{ color: "green" }}></i>
                                                                    }

                                                                </button>
                                                            )
                                                        }
                                                    </td>
                                                    <td width="90">{e.immatriculationY}</td>
                                                    <td width="90">{e.marque}</td>
                                                    <td width="90">{e.modele}</td>
                                                    <td width="90">{e.nom_carb}</td>
                                                    <td width="90">{e.nom_site}</td>
                                                    <td width="90">{dateFormat(e.nombrMin, "dd/mm/yyyy") + " au " + dateFormat(e.nombrMax, "dd/mm/yyyy")}</td>
                                                    <td width="90">{e.NbrePlein}</td>
                                                    <td width="90">{e.jour}</td>
                                                    <td width="90">{e.TotalL}</td>
                                                    <td width="90">{e.totalKm}</td>
                                                    <td width="90">{e.frequence}</td>

                                                </tr>
                                                <tr style={{ display: activeItemId === e.id ? "table-row" : "none", }}>
                                                    <td colSpan={11} >
                                                        <center>
                                                            <table>
                                                                <tr>
                                                                    <th width="90">Num</th>
                                                                    <th width="90">Immatriculation</th>
                                                                    <th width="90">Date_plein</th>
                                                                    <th width="90">Quantité</th>
                                                                    <th width="90">Kilometratrage</th>
                                                                    <th width="90">Carburant</th>
                                                                    <th width="90">Chauffeur</th>
                                                                </tr>
                                                                <tbody>
                                                                    {
                                                                        e.dt.map((ee, index) => {
                                                                            return (
                                                                                <>
                                                                                    <tr key={index}>
                                                                                        <td>{ee.num}</td>
                                                                                        <td>{ee.immatriculationY}</td>
                                                                                        <td>{dateFormat(ee.date_plein, "dd/mm/yyyy")}</td>
                                                                                        <td>{ee.qteplein}</td>
                                                                                        <td>{ee.kilometrage}</td>
                                                                                        <td>{ee.nom_carb}</td>
                                                                                        <td>{ee.nom + ' ' + ee.prenom}</td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </center>
                                                    </td>
                                                </tr>

                                            </>

                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <center>
                            {
                                datax.length <= 0 && (
                                    <h6 style={{ color: "red" }}>Pas d'information</h6>
                                )
                            }
                            <p>
                                <Checkbox
                                    checked={chektrue}
                                    onChange={PDFz}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                Inclure les détails
                            </p>
                            <div className="row">
                                <div className="col-md2">
                                    <button onClick={PDF}>PDF</button>&nbsp;&nbsp;&nbsp;
                                    <button onClick={CreateFileExcel}>Excel</button>
                                </div>
                            </div>

                        </center>


                    </div>
                </div>
            </div>

            <div className="modal fade" id="searchPop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">RESULTAT DE RECHERCHE POUR PRELEVEMENT VEHICULES  </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center>
                                {
                                    loadingS === true && (
                                        <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 20 }} ></i></p>
                                    )
                                }
                            </center>
                            <table
                                id="zero_config"
                                className="table table-striped table-bordered"
                                align="center" cellspacing="1"
                                width="100%"
                            >
                                <thead>
                                    <tr height="28">
                                        <th width="40">Num</th>
                                        <th width="90">Immatriculation</th>
                                        <th width="90">Date_plein</th>
                                        <th width="90">Quantité</th>
                                        <th width="90">Kilometrage</th>
                                        <th width="90">Carburant</th>
                                        <th width="90">Chauffeurs</th>
                                        <th width="90">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Recherche_carburant;