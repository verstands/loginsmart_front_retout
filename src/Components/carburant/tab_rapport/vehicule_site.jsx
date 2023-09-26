import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import { Checkbox } from "@mui/material";
import dateFormat from "dateformat";
import Vehicule_site2 from "./vehicule_site2";
import Vehicule_site3 from "./vehicule_site3";
import Vehicule_site3week from "./vehicule_site3week";
import Vehicule_site3cumule from "./vehicule_site3cumule";
import { tr } from "date-fns/locale";
import Vehicule_siteCumule1 from "./vehicule_siteCumule1";


const Rappport_carburant_vehicule_site = () => {
   const [loading, setloading] = useState(true);
   const [totalRows_siteuser, settotalRows_siteuser] = useState(0);
   const [totalRows_veh_siteuser, settotalRows_veh_siteuser] = useState(0);
   const [tl_siteuser, settl_siteuser] = useState(0);
   const [lkm_site, setlkm_site] = useState(0);
   const [totalRows_autr, settotalRows_autr] = useState(0);
   const [totalRows_veh_siteautre, settotalRows_veh_siteautre] = useState(0);
   const [tl_siteautre, settl_siteautre] = useState(0);
   const [lkm_site_o, setlkm_site_o] = useState(0);
   const [TotalPlein, setTotalPlein] = useState(0);
   const [TotalVehicule, setTotalVehicule] = useState(0);
   const [TotalLitre, setTotalLitre] = useState(0);
   const [TotalKm, setTotalKm] = useState(0);
   const [userSite, setuserSite] = useState("");
   const [Moyenplein, setMoyenplein] = useState(0);
   const [MoyenVeh, setMoyenVeh] = useState(0);
   const [MoyenLitre, setMoyenLitre] = useState(0);
   const [MoyenKM, setMoyenKM] = useState(0);
   const [dataDetail, setdataDetail] = useState([]);
   const [nbr_pleinEssence, setnbr_pleinEssence] = useState(0);
   const [nbr_vehEssence, setnbr_vehEssence] = useState(0);
   const [qte_pleinEssence, setqte_pleinEssence] = useState(0);
   const [nbr_plein, setnbr_plein] = useState(0);
   const [nbr_veh, setnbr_veh] = useState(0);
   const [qte_plein, setqte_plein] = useState(0);
   const [row_site_carbu3, setrow_site_carbu3] = useState([]);
   const [row_site_carbu1, setrow_site_carbu1] = useState([]);
   const [row_sites_carbu3, setrow_sites_carbu3] = useState([]);
   const [row_sites_carbu1, setrow_sites_carbu1] = useState([]);
   const [row_siteuser_qte_veh, setrow_siteuser_qte_veh] = useState([]);
   const [tableauSite, settableauSite] = useState([]);
   const [load, setload] = useState(false);
   //bouton radio
   const [par, setPar] = useState("");
   const [NmbrJour, setNmbrJour] = useState("");
   const [Stats, setStats] = useState("");

   let token = `Bearer ${localStorage.getItem("token")}`;
   const [butonRadion, setbutonRadion] = useState('')
   const [Spectre, setSpectre] = useState('sitekin');
   const [Pars, setPars] = useState('vehicule');
   const [nbrjour, setnbrjour] = useState('360');
   const [stat, setstat] = useState('1');
   const [ParsTable, setParsTable] = useState([]);
   const [siteuser_qte_veh, setsiteuser_qte_veh] = useState([]);
   const [parametre, setparametre] = useState([]);
   const [activeButon, setactiveButon] = useState('checked');
   const siteSession = localStorage.getItem("siteSession");

   const [user_pl_veh_tot, setuser_pl_veh_tot] = useState([]);

   //graphique 
   const [datagraphiqueMois, setquery_mois] = useState([]);
   const [DatagraphiqueJour, setDatagraphiqueJour] = useState([]);
   const [DatagraphiqueWeek, setDatagraphiqueWeek] = useState([]);
   const [DatagraphiqueAutreMois, setDatagraphiqueAutreMois] = useState([]);
   const [DatagraphiqueAutreJour, setDatagraphiqueAutreJour] = useState([]);
   const [DatagraphiqueAutreWeek, setDatagraphiqueAutreWeek] = useState([]);
   const [query_siteuser_mois, setquery_siteuser_mois] = useState([]);
   const [query_siteuser_mois_o, setquery_siteuser_mois_o] = useState([]);
   const [pourcentageEssence, setpourcentageEssence] = useState(0);
   const [pourcentageDiesel, setpourcentageDiesel] = useState(0);

   //Tableau
   const [dieselsite, setdieselsite] = useState(0);
   const [dieselsiteAutre, setdieselsiteAutre] = useState(0);
   const [essenceSiteAutre, setessenceSiteAutre] = useState(0);
   const [essenceSite, setessenceSite] = useState(0);

   const handleChangeRadioSpectre = (event) => {
      setSpectre(event.target.value)
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant/${siteSession}/${nbrjour}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settotalRows_siteuser(response.data.totalRows_siteuser);
         settotalRows_veh_siteuser(response.data.totalRows_veh_siteuser);
         settl_siteuser(response.data.tl_siteuser);
         setlkm_site(response.data.lkm_site);
         settotalRows_autr(response.data.totalRows_autr);
         settotalRows_veh_siteautre(response.data.totalRows_veh_siteautre);
         settl_siteautre(response.data.tl_siteuserW);
         setlkm_site_o(response.data.lkm_site_o);
         setuserSite(response.data.userSite.nom_site);
         setrow_site_carbu3(response.data.row_site_carbu3);
         setrow_site_carbu1(response.data.row_site_carbu1);
         setrow_sites_carbu3(response.data.row_sites_carbu3);
         setrow_sites_carbu1(response.data.row_sites_carbu1);
         setrow_siteuser_qte_veh(response.data.row_siteuser_qte_veh);
         setTotalPlein(response.data.totalPlein);
         setTotalVehicule(response.data.totalVehecule);
         setTotalLitre(response.data.totalLitre);
         setMoyenplein(response.data.moyenPlein);
         setMoyenVeh(response.data.moyenVehecule)
         setMoyenLitre(response.data.moyenLitre)
         settableauSite(response.data.row_lsites);
         setsiteuser_qte_veh(response.data.siteuser_qte_veh);
         setpourcentageEssence(response.data.pourcentageEssence);
         setpourcentageDiesel(response.data.pourcentageDiesel)
         setTotalKm(response.data.totalKilometrage);
         setMoyenKM(response.data.moyenKilometrage);
         setdieselsite(response.data.DieselSite);
         setdieselsiteAutre(response.data.DieselSiteAutre);
         setessenceSiteAutre(response.data.EssenceSiteAutre);
         setessenceSite(response.data.EssenceSite);
         setloading(false)
      }).catch((error) => {
         alert(error + 'par')
      })


   }

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant_graphique/${siteSession}/${nbrjour}/${stat}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((res) => {
         setquery_mois(res.data.query_mois);
         setDatagraphiqueJour(res.data.query_jour);
         setDatagraphiqueWeek(res.data.query_week);
         setDatagraphiqueAutreMois(res.data.query_mois_o);
         setDatagraphiqueAutreJour(res.data.query_jour_o);
         setDatagraphiqueAutreWeek(res.data.query_week_o);
         setquery_siteuser_mois(res.data.query_mois);
         setquery_siteuser_mois_o(res.data.query_mois_o);
      }).catch((error) => {
         alert(error + "des")
      })
   }, [])

   const [datatableA, setdatatableA] = useState([]);
   const [datatableB, setdatatableB] = useState([]);
   const [datatableC, setdatatableC] = useState([]);
   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVICE_API}tableauRapport/${siteSession}/${nbrjour}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((res) => {
         setdatatableA(res.data.row_siteuser_qte_veh);
         setdatatableB(res.data.row_lsites);
         setdatatableC(res.data.row_user_pl_veh_tot);

      }).catch((error) => {
         alert(error + "tableau")
      })
   }, [])

   //Jour bouton radio
   const handleChangeRadioJour = (event) => {
      setnbrjour(event.target.value)
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant/${siteSession}/${event.target.value}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settotalRows_siteuser(response.data.totalRows_siteuser);
         settotalRows_veh_siteuser(response.data.totalRows_veh_siteuser);
         settl_siteuser(response.data.tl_siteuser);
         setlkm_site(response.data.lkm_site);
         settotalRows_autr(response.data.totalRows_autr);
         settotalRows_veh_siteautre(response.data.totalRows_veh_siteautre);
         settl_siteautre(response.data.tl_siteuserW);
         setlkm_site_o(response.data.lkm_site_o);
         setuserSite(response.data.userSite.nom_site);
         setrow_site_carbu3(response.data.row_site_carbu3);
         setrow_site_carbu1(response.data.row_site_carbu1);
         setrow_sites_carbu3(response.data.row_sites_carbu3);
         setrow_sites_carbu1(response.data.row_sites_carbu1);
         setrow_siteuser_qte_veh(response.data.row_siteuser_qte_veh);
         setTotalPlein(response.data.totalPlein);
         setTotalVehicule(response.data.totalVehecule);
         setTotalLitre(response.data.totalLitre);
         setMoyenplein(response.data.moyenPlein);
         setMoyenVeh(response.data.moyenVehecule)
         setMoyenLitre(response.data.moyenLitre)
         settableauSite(response.data.row_lsites);
         setsiteuser_qte_veh(response.data.siteuser_qte_veh);
         setpourcentageEssence(response.data.pourcentageEssence);
         setpourcentageDiesel(response.data.pourcentageDiesel)
         setTotalKm(response.data.totalKilometrage);
         setMoyenKM(response.data.moyenKilometrage);
         setdieselsite(response.data.DieselSite);
         setdieselsiteAutre(response.data.DieselSiteAutre);
         setessenceSiteAutre(response.data.EssenceSiteAutre);
         setessenceSite(response.data.EssenceSite);
         setloading(false)
      }).catch((error) => {

      })
      //Graphique Bar
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant_graphique/${siteSession}/${event.target.value}/${stat}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((res) => {
         setquery_mois(res.data.query_mois);
         setDatagraphiqueJour(res.data.query_jour);
         setDatagraphiqueWeek(res.data.query_week);
         setDatagraphiqueAutreMois(res.data.query_mois_o);
         setDatagraphiqueAutreJour(res.data.query_jour_o);
         setDatagraphiqueAutreWeek(res.data.query_week_o);
         setquery_siteuser_mois(res.data.query_mois);
      }).catch((error) => {
         alert(error + "des")
      })
      //Line
      axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${stat}/${event.target.value}/${selectedRows}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         setdataLineAMois(response.data.query_veh_mois);
         setdataLineAWeek(response.data.query_veh_week)
         setdataLineAJour(response.data.query_veh_jour)
      }).catch((error) => {

         console.log(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${stat}/${event.target.value}/${selectedRows}`)
      })
   }
   //Stat Bouton radio
   const handleChangeRadioStat = (event) => {
      setstat(event.target.value)
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant_graphique/${siteSession}/${nbrjour}/${event.target.value}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((res) => {
         setquery_mois(res.data.query_mois);
         setDatagraphiqueJour(res.data.query_jour);
         setDatagraphiqueWeek(res.data.query_week);
         setDatagraphiqueAutreMois(res.data.query_mois_o);
         setDatagraphiqueAutreJour(res.data.query_jour_o);
         setDatagraphiqueAutreWeek(res.data.query_week_o);
         setquery_siteuser_mois(res.data.query_mois);
         setquery_siteuser_mois_o(res.data.query_mois_o);
      }).catch((error) => {
         alert(error + "Bar")
      })

      //Line
      if (selectedRows.length < 0) {
         axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${event.target.value}/${nbrjour}/${selectedRows}`,
            {
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: token
               }
            }
         ).then((response) => {
            setdataLineAMois(response.data.query_veh_mois);
            setdataLineAWeek(response.data.query_veh_week)
            setdataLineAJour(response.data.query_veh_jour)
         }).catch((error) => {
            alert(error)
            console.log(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${event.target.value}/${nbrjour}/${selectedRows}`)
         })
         //Line
         axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${event.target.value}/${nbrjour}/${selectedRows}`,
            {
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: token
               }
            }
         ).then((response) => {
            setdataLineAMois(response.data.query_veh_mois);
            setdataLineAWeek(response.data.query_veh_week)
            setdataLineAJour(response.data.query_veh_jour)

         }).catch((error) => {
            alert(error + 'line')
         })
      }
   }

   //Par bouton radion
   const handleChangeRadioPar = (event) => {
      setPars(event.target.value)

   }

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVICE_API}rapport_consomation_carburant/${siteSession}/${nbrjour}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settotalRows_siteuser(response.data.totalRows_siteuser);
         settotalRows_veh_siteuser(response.data.totalRows_veh_siteuser);
         settl_siteuser(response.data.tl_siteuser);
         setlkm_site(response.data.lkm_site);
         settotalRows_autr(response.data.totalRows_autr);
         settotalRows_veh_siteautre(response.data.totalRows_veh_siteautre);
         settl_siteautre(response.data.tl_siteuserW);
         setlkm_site_o(response.data.lkm_site_o);
         setuserSite(response.data.userSite.nom_site);
         setrow_site_carbu3(response.data.row_site_carbu3);
         setrow_site_carbu1(response.data.row_site_carbu1);
         setrow_sites_carbu3(response.data.row_sites_carbu3);
         setrow_sites_carbu1(response.data.row_sites_carbu1);
         setrow_siteuser_qte_veh(response.data.row_siteuser_qte_veh);
         setTotalPlein(response.data.totalPlein);
         setTotalVehicule(response.data.totalVehecule);
         setTotalLitre(response.data.totalLitre);
         setMoyenplein(response.data.moyenPlein);
         setMoyenVeh(response.data.moyenVehecule)
         setMoyenLitre(response.data.moyenLitre)
         settableauSite(response.data.row_lsites);
         setsiteuser_qte_veh(response.data.siteuser_qte_veh);
         setpourcentageEssence(response.data.pourcentageEssence);
         setpourcentageDiesel(response.data.pourcentageDiesel)
         setTotalKm(response.data.totalKilometrage);
         setMoyenKM(response.data.moyenKilometrage);
         setdieselsite(response.data.DieselSite);
         setdieselsiteAutre(response.data.DieselSiteAutre);
         setessenceSiteAutre(response.data.EssenceSiteAutre);
         setessenceSite(response.data.EssenceSite);
         setloading(false)
      }).catch((error) => {
         alert(error + 'ok')
      })
   }, [])



   /*
      const data2 = {
      labels: Datagra.length > 0 ? Datagra[0].data.map((dv) => '13 ' + dv.nom_mois) : [],
      datasets: Datagra.map((d) => ({
         label: d.immatriculation,
         data: d.data.map((dd) => dd.total),
         fill: false,
         borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      })),
   };
   */
   const dieselColor = '#FF6384';
   const essenceColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
   const uniqueMonthsLabels = datagraphiqueMois.reduce((acc, curr) => {
      if (!acc.includes(curr.mois)) {
         acc.push(curr.mois);
      }
      return acc;
   }, []);
   const colors = ['red', 'blue', 'green', 'orange', 'purple', 'gray'];
   const data = {
      labels: datagraphiqueMois.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
      }),
      datasets: [
         {
            label: "Diesel",
            data: datagraphiqueMois.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[0], // use the first color in the array for this dataset
            borderWidth: 1,
            backgroundColor: colors[0]

         },
         {
            label: "Essence",
            data: datagraphiqueMois.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[2], // use the first color in the array for this dataset
            borderWidth: 1,
            backgroundColor: colors[2]

         },
         {
            label: "Essence autre site",
            data: DatagraphiqueAutreMois.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[1], // use the first color in the array for this dataset
            borderWidth: 1,
            backgroundColor: colors[1]
         },
         {
            label: "Diesel autre site",
            data: DatagraphiqueAutreMois.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[3], // use the first color in the array for this dataset
            borderWidth: 1,
            backgroundColor: colors[3]

         },
      ],
   };
   const uniqueMonthsLabelsJour = DatagraphiqueJour.reduce((acc, curr) => {
      if (!acc.includes(curr.mois)) {
         acc.push(dateFormat(curr.jour, "dd/yy"));
      }
      return acc;
   }, []);


   const dataJour = {
      labels: uniqueMonthsLabelsJour.length > 0 ? uniqueMonthsLabelsJour : ['vide'],
      datasets: [
         {
            label: "Diesel",
            data: DatagraphiqueJour.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[0],
            borderWidth: 1,
            backgroundColor: colors[0]

         },
         {
            label: "Essence",
            data: DatagraphiqueJour.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[1],
            borderWidth: 1,
            backgroundColor: colors[1]
         },
         {
            label: "Essence autre site",
            data: DatagraphiqueAutreJour.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[2],
            borderWidth: 1,
            backgroundColor: colors[2]

         },
         {
            label: "Diesel autre site",
            data: DatagraphiqueAutreJour.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: colors[6],
            borderWidth: 1,
            backgroundColor: colors[6]

         },
      ],
   };
   const dataWeek = {
      labels: uniqueMonthsLabels.length > 0 ? uniqueMonthsLabels : ['d'],
      datasets: [
         {
            label: "Diesel",
            data: DatagraphiqueWeek.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: dieselColor,
            backgroundColor: colors[2]
         },
         {
            label: "Essence",
            data: DatagraphiqueWeek.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: essenceColor,
            backgroundColor: colors[5]

         },
         {
            label: "Essence autre site",
            data: DatagraphiqueAutreWeek.filter((item) => item.c === "1").map((item) => item.tot_mois),
            fill: false,
            borderColor: essenceColor,
            backgroundColor: colors[4]
         },
         {
            label: "Essence",
            data: DatagraphiqueAutreWeek.filter((item) => item.c === "3").map((item) => item.tot_mois),
            fill: false,
            borderColor: essenceColor,
            backgroundColor: colors[3]
         },
      ],
   };

   //pour le vehicule
   const dieselData = query_siteuser_mois.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceData = query_siteuser_mois.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehiclue = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };


   const dataVehcicule = {
      labels: query_siteuser_mois.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
      }),
      datasets: [
         {
            label: 'Diesel',
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            data: dieselData,
         },
         {
            label: 'Essence',
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            data: essenceData,
         },
      ],

   };

   ///week
   const dieselDataWeek_o = query_siteuser_mois.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceDataWeek_o = query_siteuser_mois.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehiclueWeek_o = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };


   const dataVehciculeWeek_o = {
      labels: DatagraphiqueAutreMois.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois
         return moisAbbr;
      }),
      datasets: [
         {
            label: 'Diesel',
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            data: dieselDataWeek_o,
         },
         {
            label: 'Essence',
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            data: essenceDataWeek_o,
         },
      ],

   };



   //pour le sites
   const dieselDatasite = DatagraphiqueAutreMois.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceDatasite = DatagraphiqueAutreMois.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehicluesite = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };


   const dataSites = {
      labels: DatagraphiqueAutreMois.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
      }),
      datasets: [
         {
            label: 'Diesel autre site',
            backgroundColor: 'rgba(100, 162, 235, 0.7)',
            data: dieselDatasite,
         },
         {
            label: 'Essence autre site',
            backgroundColor: 'rgba(750, 192, 192, 0.7)',
            data: essenceDatasite,
         },
      ],//.concat(dataVehcicule.datasets),

   };
   //week
   const dieselDatasiteWeek = DatagraphiqueWeek.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceDatasiteWekk = DatagraphiqueWeek.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehicluesiteWekk = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };

   const dataSitesWeek = {
      labels: DatagraphiqueWeek ? DatagraphiqueWeek.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois + "Semains"
         return moisAbbr;
      }) : null,
      datasets: [
         {
            label: 'Diesel autre site',
            backgroundColor: 'rgba(100, 162, 235, 0.7)',
            data: dieselDatasiteWeek,
         },
         {
            label: 'Essence autre site',
            backgroundColor: 'rgba(750, 192, 192, 0.7)',
            data: essenceDatasiteWekk,
         },
      ],//.concat(dataVehcicule.datasets),

   };
   //jours
   const dieselDatasiteJour = DatagraphiqueJour.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceDatasiteJour = DatagraphiqueJour.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehicluesiteJour = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };

   const dataSitesJour = {
      labels: DatagraphiqueJour ? DatagraphiqueJour.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois
         return moisAbbr;
      }) : null,
      datasets: [
         {
            label: 'Diesel autre site',
            backgroundColor: 'rgba(100, 162, 235, 0.7)',
            data: dieselDatasiteJour,
         },
         {
            label: 'Essence autre site',
            backgroundColor: 'rgba(750, 192, 192, 0.7)',
            data: essenceDatasiteJour,
         },
      ],//.concat(dataVehcicule.datasets),

   };

   //week
   const dieselDatasiteJour_o = DatagraphiqueAutreJour.filter((item) => item.c === "1").map((item) => item.tot_mois);
   const essenceDatasiteJour_o = DatagraphiqueAutreJour.filter((item) => item.c === "3").map((item) => item.tot_mois);

   const optionsVehicluesiteJour_o = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };

   const dataSitesJour_o = {
      labels: DatagraphiqueAutreJour ? DatagraphiqueAutreJour.filter((item) => item.c === "3").map((item) => {
         const moisAbbr = item.mois + "Semains"
         return moisAbbr;
      }) : null,
      datasets: [
         {
            label: 'Diesel autre site',
            backgroundColor: 'rgba(100, 162, 235, 0.7)',
            data: dieselDatasiteJour_o,
         },
         {
            label: 'Essence autre site',
            backgroundColor: 'rgba(750, 192, 192, 0.7)',
            data: essenceDatasiteJour_o,
         },
      ],//.concat(dataVehcicule.datasets),

   };


   //graphique cercle
   const dataCercle = {
      labels: [`Essence ${tl_siteuser}`, `Diesel ${settl_siteautre}`],
      datasets: [
         {
            data: [pourcentageEssence, pourcentageDiesel],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };

   const dataCercleSite = {
      labels: [`Essence ${row_site_carbu3 && row_site_carbu3.qte_plein}`, `Diesel ${row_site_carbu1 && row_site_carbu1.qte_plein}`],
      datasets: [
         {
            data: [row_site_carbu3 && row_site_carbu3.qte_plein, row_site_carbu1 && row_site_carbu1.qte_plein],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };

   const TotalCerclePlein = totalRows_veh_siteuser + totalRows_siteuser;
   const PourcentagedataCerclePleinAutre = (parseInt(totalRows_veh_siteuser) * 100) / parseInt(TotalCerclePlein)
   const PourcentagedataCerclePlein = (parseInt(totalRows_siteuser) * 100) / parseInt(TotalCerclePlein)
   const dataCerclePleinAutre = {
      labels: [`Essence ${PourcentagedataCerclePleinAutre}`, `Diesel ${PourcentagedataCerclePlein}`],
      datasets: [
         {
            data: [PourcentagedataCerclePleinAutre, PourcentagedataCerclePlein],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };

   const dataCerclePleinAutre_O = {
      labels: [`Essence ${row_site_carbu1 && row_site_carbu1.nbr_plein}`, `Diesel ${row_site_carbu3 && row_site_carbu3.nbr_plein}`],
      datasets: [
         {
            data: [row_site_carbu1 && row_site_carbu1.nbr_plein, row_site_carbu3 && row_site_carbu3.nbr_plein],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };

   const dataCerclePleinAutreVehiculen = {
      labels: [`Essence ${row_site_carbu1 && row_site_carbu1.nbr_veh}`, `Diesel ${row_site_carbu3 && row_site_carbu3.nbr_veh}`],
      datasets: [
         {
            data: [row_site_carbu1 && row_site_carbu1.nbr_veh, row_site_carbu3 && row_site_carbu3.nbr_veh],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };

   const TotalCerclePleinv = totalRows_veh_siteuser + totalRows_siteuser;
   const PourcentagedataCerclePleinAutrev = (parseInt(totalRows_veh_siteuser) * 100) / parseInt(TotalCerclePleinv)
   const PourcentagedataCerclePleinv = (parseInt(totalRows_veh_siteautre) * 100) / parseInt(TotalCerclePleinv)
   const dataCerclePleinAutrev = {
      labels: [`Essence ${PourcentagedataCerclePleinAutrev}`, `Diesel ${PourcentagedataCerclePleinv}`],
      datasets: [
         {
            data: [PourcentagedataCerclePleinAutrev, PourcentagedataCerclePleinv],
            backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(75, 192, 192, 0.7)']
         }
      ]
   };





   const [activeItemId, setActiveItemId] = useState(null);
   const handleActiveData = (id) => {
      setActiveItemId(id);
   }

   const [activeItemId2, setActiveItemId2] = useState(null);
   const [tableauRapportSite, settableauRapportSite] = useState(null);
   const handleActiveData2 = (id) => {
      setActiveItemId2(id)
      axios.get(`${process.env.REACT_APP_SERVICE_API}tableauRapportSite/${id}/${nbrjour}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settableauRapportSite(response.data.data);
      }).catch((error) => {
         alert(error)
      })
   }

   const [activeItemId3, setActiveItemId3] = useState(null);
   const [tableauRapportMeSite, settableauRapportMeSite] = useState([])
   const handleActiveData3 = (id) => {
      setActiveItemId3(id)
      axios.get(`${process.env.REACT_APP_SERVICE_API}tableauRapportMeSite/${siteSession}/${nbrjour}/${id}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settableauRapportMeSite(response.data.row_siteuser_qte_veh);
      }).catch((error) => {
         alert(error)
      })
   }

   const handleInactiveData = () => {
      setActiveItemId('none');
   };
   const handleInactiveData2 = () => {
      setActiveItemId2('none');
   };
   const handleInactiveData3 = () => {
      setActiveItemId3('none');
   };
   let n = 1;
   const [chektrue, setchektrue] = useState(false);
   const [selectedRows, setSelectedRows] = useState([]);
   const [dataLineAMois, setdataLineAMois] = useState([]);
   const [dataLineAWeek, setdataLineAWeek] = useState([]);
   const [dataLineAJour, setdataLineAJour] = useState([]);
   const BtnDataSelects = () => {
      setDisplayPage('none')
      setDisplayPage2('block')
      axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${stat}/${nbrjour}/${selectedRows}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         setdataLineAMois(response.data.query_veh_mois);
         /* setdataLineAWeek(response.data.query_veh_week)
          setdataLineAJour(response.data.query_veh_jour)*/
         console.log(dataLineAMois)
      }).catch((error) => {
         alert(error)
         console.log(`${process.env.REACT_APP_SERVICE_API}graphiqueLine/${siteSession}/${stat}/${nbrjour}/${selectedRows}`)
      })
   }

   const DataSelect = (event, id) => {
      if (event.target.checked) {
         setSelectedRows([...selectedRows, id]);
      } else {
         setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      }
   };


   const [Datagra, setDatagra] = useState([]);

   const data2 = {
      labels: '11',
      datasets: Datagra ? Datagra.map((d) => ({
         label: d.immatriculation,
         data: d.data.map((dd) => dd.total),
         fill: false,
         borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      })) : null,
   };
   const optionLine = {
      responsive: true,
      maintainAspectRatio: false
   };
   const [DisplayPage, setDisplayPage] = useState('block')
   const [DisplayPage2, setDisplayPage2] = useState('none')
   const [DisplayPage3, setDisplayPage3] = useState('none')
   const [DisplayPage4, setDisplayPage4] = useState('none')

   const ActualiseGraphique = () => {
      window.location.reload();
   }

   const optionsSiteLineMois = {
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
            beginAtZero: true,
         },
      },
   };


   const dataSitesLineMois = {
      labels: Array.isArray(dataLineAMois) && dataLineAMois.length > 0 ? dataLineAMois.map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
      }).filter((label, index, self) => self.indexOf(label) === index) : [],
      datasets: Array.isArray(dataLineAMois) && dataLineAMois.length > 0 ? (() => {
         const immatriculationsSet = new Set();
         dataLineAMois.forEach((item) => {
            immatriculationsSet.add(item.immatriculation);
         });
         const immatriculations = Array.from(immatriculationsSet);

         return immatriculations.map((immatriculation) => {
            const filteredData = Array.isArray(dataLineAMois) ? dataLineAMois.filter((item) => item.immatriculation === immatriculation) : [];
            const tot_mois = filteredData.map((item) => item.tot_mois);

            return {
               label: immatriculation,
               data: tot_mois,
               borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            };
         });
      })() : []
   };

   const dataSitesLineMoiss = {
      /* labels: Array.isArray(dataLineAMois) && dataLineAMois.map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
       }),
       datasets: Array.isArray(dataLineAMois) && dataLineAMois.map((ff) => ({
         label: ff.immatriculation,
         data: [ff.tot_mois],
         borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
       }))*/
      labels: Array.isArray(dataLineAMois) && dataLineAMois.map((item) => {
         const moisAbbr = item.mois.substring(0, 3);
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} 01 ${yearAbbr}`;
         const date = new Date(dateStr);
         return date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' });
      }).filter((label) => label),
      datasets: Array.isArray(dataLineAMois) && dataLineAMois.map((ff) => ({
         label: ff.immatriculation,
         data: [ff.tot_mois],
         borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      }))
   };
   //week Line
   const dataSitesLineWeek = {
      labels: dataLineAWeek.map((item) => {
         const moisAbbr = item.week;
         const yearAbbr = item.ann.toString().slice(-2);
         const dateStr = `${moisAbbr} ' ' ${yearAbbr}`;
         return dateStr;
      }),
      datasets: dataLineAWeek.reduce((acc, d) => {
         const existingDataset = acc.find((dataset) => dataset.label === d.immatriculation);
         if (existingDataset) {
            existingDataset.data.push(d.tot_mois);
         } else {
            acc.push({
               label: d.immatriculation,
               data: [d.tot_mois],
               fill: false,
               borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            });
         }
         return acc;
      }, []),
   };
   //Jour
   const dataSitesLineJour = {
      labels: dataLineAJour.map((item) => {
         const moisAbbr = item.jour;
         return moisAbbr;
      }),
      datasets: dataLineAJour.reduce((acc, d) => {
         const existingDataset = acc.find((dataset) => dataset.label === d.immatriculation);
         if (existingDataset) {
            existingDataset.data.push(d.tot_mois);
         } else {
            acc.push({
               label: d.immatriculation,
               data: [d.tot_mois],
               fill: false,
               borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            });
         }
         return acc;
      }, []),
   };

   const [totalcumule, settotalcumule] = useState('1')
   const [totalcumule2, settotalcumule2] = useState('1')
   const handleChangeTotalCumule = (e) => {
      settotalcumule(e.target.value);

   }
   const handleChangeTotalCumule2 = (e) => {
      settotalcumule2(e.target.value);
   }





   /*useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVICE_API}parametresid/${dataSessionID}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         setdataIdUser(response.data.data)
         setnbrjour2(dataIdUser.nbr_jour_rapport)
         setstat2(dataIdUser.crit)
         setpar2(dataIdUser.par)
         setSpectre2(dataIdUser.mysite)
      }).catch((error) => {

      })
   }, [])*/

   const GraphiqueLineLien = (e) => {
      alert(e)
   }


   const [chektrue2, setchektrue2] = useState(false);
   const [selectedRows2, setSelectedRows2] = useState([]);
   const [dataLineAMois2, setdataLineAMois2] = useState([]);

   const DataSelect2 = (event, id) => {
      if (event.target.checked) {
         setSelectedRows2([...selectedRows2, id]);
      } else {
         setSelectedRows2(selectedRows2.filter((rowId) => rowId !== id));
      }
   };

   const BtnDataSelects2 = () => {
      setDisplayPage('none')
      setDisplayPage3('block')
      axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine2/${siteSession}/${stat}/${nbrjour}/${selectedRows2}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         setdataLineAMois2(response.data.query_veh_mois);
      }).catch((error) => {
         alert(error)
      })
   }


   //chart site
   const [selectedRows3, setSelectedRows3] = useState([]);
   const [dataLineAMois3, setdataLineAMois3] = useState([]);

   const DataSelect3 = (event, id) => {
      if (event.target.checked) {
         setSelectedRows3([...selectedRows3, id]);
         alert(selectedRows3)
      } else {
         setSelectedRows3(selectedRows3.filter((rowId) => rowId !== id));
      }
   };

   const BtnDataSelects3 = () => {
      setDisplayPage('none')
      setDisplayPage2('block')
      axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine2/${siteSession}/${stat}/${nbrjour}/${selectedRows3}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         setdataLineAMois3(response.data.query_veh_mois);
      }).catch((error) => {
         alert(error)
      })
   }


   //****************************************************site */
   const [selectedRows4, setSelectedRows4] = useState([]);
   const [dataLineAMois4, setdataLineAMois4] = useState([]);

   const DataSelect4 = (event, id) => {
      if (event.target.checked) {
         setSelectedRows4([...selectedRows4, id]);
      } else {
         setSelectedRows4(selectedRows4.filter((rowId) => rowId !== id));
      }
   };

   const [tableauSiteGraphiqueLine, settableauSiteGraphiqueLine] = useState([]);
   const [tableauSiteGraphiqueLineWeek, settableauSiteGraphiqueLineWeek] = useState([]);
   const [tableauSiteGraphiqueLineJour, settableauSiteGraphiqueLineJour] = useState([]);
   const BtnDataSelects4 = () => {
      setDisplayPage('none')
      setDisplayPage2('none')
      setDisplayPage4('block')
      axios.get(`${process.env.REACT_APP_SERVICE_API}graphiqueLine3/${selectedRows4}/${stat}/${nbrjour}`,
         {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token
            }
         }
      ).then((response) => {
         settableauSiteGraphiqueLine(response.data.query_veh_mois);
         settableauSiteGraphiqueLineWeek(response.data.query_veh_week);
         settableauSiteGraphiqueLineJour(response.data.query_veh_jour);
      }).catch((error) => {
         alert(error)
      })
   }
   //********************************fin site */
   return (
      <>
         <div class="card">
            <div class="card-body">
               <center>
                  <h5 class="card-title"> Rapport consomation carburant par vehicule (sur les {nbrjour} dernier jours )</h5>
               </center>
               <hr />
               <button onClick={ActualiseGraphique} className="btn btn-primary"><i className="mdi mdi-refresh" title="Actualiser"></i></button>

               <div className="row text-center" >
                  <div className="col-md-12">
                     <b>Spectre</b><br />
                     <input type="radio" name="spect" checked={Spectre === siteSession} value={siteSession} onChange={handleChangeRadioSpectre} />Mes sites
                     <input type="radio" name="spect" checked={Spectre === 'sitekin'} value="sitekin" onChange={handleChangeRadioSpectre} /><strong>{userSite}</strong>
                  </div>
                  <div className="col-md-12">
                     <b>Par</b><br />
                     <input type="radio" name="par" checked={Pars === 'sites'} value="sites" onChange={handleChangeRadioPar} />Sites
                     <input type="radio" name="par" checked={Pars === 'vehicule'} value="vehicule" onChange={handleChangeRadioPar} />Vehicule
                  </div>
                  <div className="col-md-12">
                     <b>Nombre du jours</b><br />
                     <input type="radio" name="nbrJrs" checked={nbrjour === '7'} value='7' onChange={handleChangeRadioJour} />7 jours
                     <input type="radio" name="nbrJrs" checked={nbrjour === '30'} value='30' onChange={handleChangeRadioJour} />30 jours
                     <input type="radio" name="nbrJrs" checked={nbrjour === '90'} value='90' onChange={handleChangeRadioJour} />90 jours
                     <input type="radio" name="nbrJrs" checked={nbrjour === '180'} value='180' onChange={handleChangeRadioJour} />180 jours
                     <input type="radio" name="nbrJrs" checked={nbrjour === '360'} value='360' onChange={handleChangeRadioJour} />360 jours
                  </div>
                  <div className="col-md-12">
                     <b>Selection stats</b><br />
                     <input type="radio" name="stat" checked={stat === '1'} value="1" onChange={handleChangeRadioStat} />#litres
                     <input type="radio" name="stat" checked={stat === '2'} value="2" onChange={handleChangeRadioStat} /># option
                     <input type="radio" name="stat" checked={stat === '3'} value="3" onChange={handleChangeRadioStat} /># vehicules
                  </div>
                  <div className="col-md-5" style={{ display: DisplayPage }}>
                     <h6 className="text-center">Information générales</h6>
                     <div class="table-responsive">
                        <table
                           id="zero_config"
                           class="table table-striped table-bordered"
                        >
                           <thead>
                              <tr style={{ background: "silver" }}>
                                 {
                                    (Pars === 'vehicule') && (
                                       <th className="text-center">Mes Vehicules</th>
                                    )
                                 }
                                 {
                                    (Pars === 'sites') && (
                                       <th className="text-center">Mes Sites</th>
                                    )
                                 }
                                 <th className="text-center"># Plein</th>
                                 <th className="text-center"># Vehicules</th>
                                 <th className="text-center"># Litre</th>
                                 <th className="text-center"># Km</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td style={{ background: "powderblue", textAlign: 'left' }}>{userSite}</td>
                                 <td>{totalRows_siteuser}</td>
                                 <td>{totalRows_veh_siteuser}</td>
                                 <td>{tl_siteuser}</td>
                                 <td>{lkm_site}</td>
                              </tr>
                              <tr>
                                 <td style={{ background: "powderblue", textAlign: 'left' }}>Autre sites</td>
                                 <td>{totalRows_autr}</td>
                                 <td>{totalRows_veh_siteautre}</td>
                                 <td>{tl_siteautre}</td>
                                 <td>{lkm_site_o}</td>
                              </tr>
                              <tr>
                                 <td style={{ fontWeight: "bold", background: "powderblue", textAlign: 'left' }}>Total</td>
                                 <td style={{ fontWeight: "bold" }}>{TotalPlein.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{TotalVehicule.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{TotalLitre.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{TotalKm.toLocaleString('fr-FR')}</td>
                              </tr>
                              <tr>
                                 <td style={{ fontWeight: "bold", background: "powderblue", textAlign: 'left' }}>Moyenne</td>
                                 <td style={{ fontWeight: "bold" }}>{Moyenplein.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{MoyenVeh.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{MoyenLitre.toLocaleString('fr-FR')}</td>
                                 <td style={{ fontWeight: "bold" }}>{MoyenKM.toLocaleString('fr-FR')}</td>
                              </tr>
                           </tbody>
                        </table>
                        <table
                           id="zero_config"
                           class="table table-striped table-bordered"
                        >
                           <thead>
                              <tr style={{ background: "silver" }}>
                                 <th className="text-center">{userSite}</th>
                                 <th className="text-center"># Plein</th>
                                 <th className="text-center"># Vehicules</th>
                                 <th className="text-center"># Litre</th>
                                 <th className="text-center"># Km</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr >
                                 <>
                                    <td style={{ background: "powderblue", textAlign: 'left' }}>Diesel</td>
                                    <td>{row_site_carbu3 && row_site_carbu3.nbr_plein}</td>
                                    <td>{row_site_carbu3 && row_site_carbu3.nbr_veh}</td>
                                    <td>{row_site_carbu3 && row_site_carbu3.qte_plein}</td>
                                    <td>{dieselsite}</td>
                                 </>
                              </tr>
                              <tr>
                                 <td style={{ background: "powderblue", textAlign: 'left' }}>Essence</td>
                                 <td>{row_site_carbu1 && row_site_carbu1.nbr_plein}</td>
                                 <td>{row_site_carbu1 && row_site_carbu1.nbr_veh}</td>
                                 <td>{row_site_carbu1 && row_site_carbu1.qte_plein}</td>
                                 <td>{essenceSiteAutre}</td>
                              </tr>
                           </tbody>
                        </table>
                        <table
                           id="zero_config"
                           class="table table-striped table-bordered"
                        >
                           <thead>
                              <tr style={{ background: "silver" }}>
                                 {
                                    (Pars === 'vehicule') && (
                                       <th className="text-center">Mes Vehicules</th>
                                    )
                                 }
                                 {
                                    (Pars === 'sites') && (
                                       <th className="text-center">Mes Sites</th>
                                    )
                                 }
                                 <th className="text-center"># Plein</th>
                                 <th className="text-center"># Vehicules</th>
                                 <th className="text-center"># Litre</th>
                                 <th className="text-center"># Km</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td style={{ background: "powderblue", textAlign: 'left' }}>Diesel</td>
                                 <td>{row_sites_carbu3 && row_sites_carbu3.nbr_plein}</td>
                                 <td>{row_sites_carbu3 && row_sites_carbu3.nbr_veh}</td>
                                 <td>{row_sites_carbu3 && row_sites_carbu3.qte_plein}</td>
                                 <td>{dieselsiteAutre}</td>
                              </tr>
                              <tr>
                                 <td style={{ background: "powderblue", textAlign: 'left' }}>Essence</td>
                                 <td>{row_sites_carbu1 && row_sites_carbu1.nbr_plein}</td>
                                 <td>{row_sites_carbu1 && row_sites_carbu1.nbr_veh}</td>
                                 <td>{row_sites_carbu1 && row_sites_carbu1.qte_plein}</td>
                                 <td>{essenceSite}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div className="col-md-7" style={{ display: DisplayPage }}>
                     {
                        (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Pars === 'sites' && (
                           <div>
                              <h6 className="text-center">Détails pour chaque site</h6>
                              <div class="table-responsive" style={{ height: '500px', overflowY: 'scroll' }}>
                                 <table
                                    class="table table-striped table-bordered"
                                 >
                                    <thead>
                                       <tr style={{ background: 'silver' }}>
                                          <th></th>
                                          <th width="2">Nom site</th>
                                          <th width="2">Province</th>
                                          <th width="2">Zone</th>
                                          <th width="2"># Vehicules</th>
                                          <th width="2"># Litres</th>
                                          <th width="2"># Plein</th>
                                          <th width="2"># Km</th>
                                          <th width="2"></th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          datatableB ? datatableB.map((detail) => {
                                             return (
                                                <>
                                                   <tr>
                                                      <td>
                                                         <button onClick={() => activeItemId2 === detail.id ? handleInactiveData2() : handleActiveData2(detail.id)}>
                                                            {
                                                               activeItemId2 === detail.id ? "-" : <i>+</i>
                                                            }
                                                         </button>
                                                      </td>
                                                      <td><button>{detail.nom_site}</button></td>
                                                      <td>{detail.province}</td>
                                                      <td>{detail.NomZone}</td>
                                                      <td>{detail && detail.nbr_veh}</td>
                                                      <td>{detail.tot_mois}</td>
                                                      <td>{detail && detail.nbr_plein}</td>
                                                      <td>{detail.kilometrage}</td>
                                                      <td>
                                                         <Checkbox
                                                            checked={selectedRows4.includes(detail.id)}
                                                            onChange={(event) => DataSelect4(event, detail.id)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                         />
                                                      </td>
                                                   </tr>
                                                   {activeItemId2 === detail.id && (
                                                      <tr key={detail.id}>
                                                         <td colSpan={9}>
                                                            <center>
                                                               <table>
                                                                  <thead>
                                                                     <tr>
                                                                        <th width="90">Jour</th>
                                                                        <th width="90">Mois</th>
                                                                        <th width="90"># Véhicules</th>
                                                                        <th width="90"># Litres</th>
                                                                        <th width="90"># Plein</th>
                                                                        <th width="90"># Km</th>
                                                                     </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                     {
                                                                        tableauRapportSite ? tableauRapportSite.map((sl) => {
                                                                           const moisEnLettres = new Date(sl.jour).toLocaleString('default', { month: 'long' });

                                                                           return (
                                                                              <tr>
                                                                                 <td>{sl.jour}</td>
                                                                                 <td>{moisEnLettres}</td>
                                                                                 <td>{sl && sl.id_veh}</td>
                                                                                 <td>{sl.qte}</td>
                                                                                 <td>{sl.qte}</td>
                                                                                 <td>{sl.kilometrage}</td>
                                                                              </tr>
                                                                           );
                                                                        }) : null
                                                                     }
                                                                  </tbody>
                                                               </table>
                                                            </center>
                                                         </td>
                                                      </tr>
                                                   )}
                                                </>
                                             )
                                          }) : null
                                       }
                                    </tbody>
                                 </table>
                                 <button onClick={BtnDataSelects4} className="btn btn-primary">Comparer_consommation</button>
                              </div>
                           </div>
                        )
                     }
                     {
                        (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Spectre === 'sitekin' && Pars === 'vehicule' && (
                           <div >
                              <h6 className="text-center">Détails pour chaque vehicule du site {' ' + userSite}</h6>
                              <div class="table-responsive" style={{ height: '600px', overflowY: 'scroll' }}>
                                 <table
                                    class="table table-striped table-bordered"
                                 >
                                    <thead>
                                       <tr style={{ background: 'silver' }}>
                                          <th></th>
                                          <th className="col-1">Immatriculation</th>
                                          <th width="2000">Marque</th>
                                          <th>Modèle</th>
                                          <th>Carburant</th>
                                          <th># Litre</th>
                                          <th># Plein</th>
                                          <th># Kin</th>
                                          <th></th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          datatableA.map((detail) => {
                                             return (
                                                <>
                                                   <tr>
                                                      <td>
                                                         <button onClick={() => activeItemId3 === detail.id ? handleInactiveData3() : handleActiveData3(detail.id)}>
                                                            {
                                                               activeItemId3 === detail.id ? "-" : <i>+</i>
                                                            }
                                                         </button>
                                                      </td>
                                                      <td><button onClick={() => GraphiqueLineLien(detail.id)}>{detail.immatriculation}</button> </td>
                                                      <td>{detail.marque}</td>
                                                      <td>{detail.modele}</td>
                                                      <td>{detail.nom_carb}</td>
                                                      <td>{detail && detail.qte_plein}</td>
                                                      <td>{detail && detail.nbr_plein}</td>
                                                      <td>{detail.kilometrage.toLocaleString('fr-FR')}</td>
                                                      <td>
                                                         <Checkbox
                                                            checked={selectedRows.includes(detail.id)}
                                                            onChange={(event) => DataSelect(event, detail.id)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                         />
                                                      </td>
                                                   </tr>
                                                   {activeItemId3 === detail.id && (
                                                      <tr key={detail.id}>
                                                         <td colSpan={9}>
                                                            <center>
                                                               <table>
                                                                  <thead>
                                                                     <tr>
                                                                        <th width="90">Mois</th>
                                                                        <th width="90">Carburant</th>
                                                                        <th width="90"># Litres</th>
                                                                        <th width="90"># Plein</th>
                                                                        <th width="90"># Km</th>
                                                                     </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                     {
                                                                        tableauRapportMeSite.map((detail) => {
                                                                           return (
                                                                              <tr>
                                                                                 <td>{detail.marque}</td>
                                                                                 <td>{detail.modele}</td>
                                                                                 <td>{detail.nom_carb}</td>
                                                                                 <td>{detail && detail.qte_plein}</td>
                                                                                 <td>{detail && detail.nbr_plein}</td>
                                                                              </tr>
                                                                           )
                                                                        })
                                                                     }
                                                                  </tbody>
                                                               </table>
                                                            </center>
                                                         </td>
                                                      </tr>
                                                   )}
                                                </>
                                             )
                                          })
                                       }
                                    </tbody>
                                 </table>
                                 <button onClick={BtnDataSelects} className="btn btn-primary">Comparer_consommation</button>
                              </div>
                           </div>
                        )
                     }
                     {
                        (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Spectre === siteSession && Pars === 'vehicule' && (
                           <div>
                              <h6 className="text-center">Détails pour chaque véhicule </h6>
                              <div class="table-responsive" style={{ height: '500px', overflowY: 'scroll' }}>
                                 <table
                                    class="table table-striped table-bordered"
                                 >
                                    <thead>
                                       <tr style={{ background: 'silver' }}>
                                          <th></th>
                                          <th width="2">Immatriculation</th>
                                          <th width="2">Marque</th>
                                          <th width="2">Modele</th>
                                          <th width="2">Carburant</th>
                                          <th width="2"># Litres</th>
                                          <th width="2"># Plein</th>
                                          <th width="2"># Km</th>
                                          <th width="2"></th>
                                       </tr>
                                    </thead>
                                    <center>
                                       {
                                          loading === true && (
                                             <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                          )
                                       }
                                    </center>
                                    <center>
                                       {
                                          Stats === true && (
                                             <p>Chargement<i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 10 }} ></i></p>
                                          )
                                       }
                                    </center>
                                    <tbody>
                                       {
                                          datatableC ? datatableC.map((detail) => {
                                             return (
                                                <>
                                                   <tr>
                                                      <td>
                                                         <button onClick={() => activeItemId === detail.id ? handleInactiveData2() : handleActiveData2(detail.id)}>
                                                            {
                                                               activeItemId === detail.id ? "-" : <i>+</i>
                                                            }
                                                         </button>
                                                      </td>
                                                      <td><button>{detail.immatriculation}</button></td>
                                                      <td>{detail.marque}</td>
                                                      <td>{detail.modele}</td>
                                                      <td>{detail.nom_carb}</td>
                                                      <td>{detail && detail.nbr_plein}</td>
                                                      <td>{detail && detail.qte_plein}</td>
                                                      <td>{detail.kilometrage}</td>
                                                      <td>
                                                         <Checkbox
                                                            checked={selectedRows2.includes(detail.id_veh)}
                                                            onChange={(event) => DataSelect2(event, detail.id_veh)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                         />
                                                      </td>
                                                   </tr>
                                                   {activeItemId === detail.id && (
                                                      <tr key={detail.id}>
                                                         <td colSpan={10}>
                                                            <center>
                                                               <table>
                                                                  <thead>
                                                                     <tr>
                                                                        <th width="90">Jour</th>
                                                                        <th width="90">Mois</th>
                                                                        <th width="90"># Véhicules</th>
                                                                        <th width="90"># Litres</th>
                                                                        <th width="90"># Plein</th>
                                                                        <th width="90"># Km</th>
                                                                     </tr>
                                                                  </thead>
                                                                  <tbody>

                                                                  </tbody>
                                                               </table>
                                                            </center>
                                                         </td>
                                                      </tr>
                                                   )}
                                                </>

                                             )
                                          }) : null
                                       }
                                    </tbody>
                                 </table>
                                 <button onClick={BtnDataSelects2} className="btn btn-primary">Comparer_consommation</button>
                              </div>
                           </div>
                        )
                     }
                  </div>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                     <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#cd" type="button" role="tab" aria-controls="home" aria-selected="true">Graphique Line</button>
                     </li>
                     <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#cdd" type="button" role="tab" aria-controls="profile" aria-selected="false">Graphique circle</button>
                     </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                     <div class="tab-pane fade show active" id="cd" role="tabpanel" aria-labelledby="home-tab">
                        <center>
                           <div className="col-md-6" style={{ display: DisplayPage }}>
                              <h6 className="text-center">
                                 {
                                    nbrjour === '360' && Pars === 'sites' && (
                                       <b>Consommation mensuelle du site {" " + userSite + " "} vs les autres sites</b>
                                    )
                                 }
                                 {
                                    nbrjour === '360' && Pars === 'vehicule' && (
                                       <b>Consommation mensuelle de mes vehicules</b>
                                    )
                                 }
                                 {
                                    nbrjour === '7' && Pars === 'sites' && (
                                       <b>Consommation journaliére du site {" " + userSite + " "} vs les autres sites</b>
                                    )
                                 }
                                 {
                                    nbrjour === '7' && Pars === 'vehicule' && (
                                       <b>Consommation journaliére de mes vehicules</b>
                                    )
                                 }
                                 {
                                    nbrjour === '90' && Pars === 'sites' && (
                                       <b>Consommation mensuel du site {" " + userSite + " "} vs les autres sites</b>
                                    )
                                 }
                                 {
                                    nbrjour === '90' && Pars === 'vehicule' && (
                                       <b>Consommation mensuel de mes vehicules</b>
                                    )
                                 }
                                 {
                                    nbrjour === '180' && Pars === 'vehicule' && (
                                       <b>Consommation mensuelle de mes vehicules</b>
                                    )
                                 }
                                 {
                                    nbrjour === '180' && Pars === 'sites' && (
                                       <b>Consommation mensuelle du site {" " + userSite + " "} vs les autres sites</b>
                                    )
                                 }
                                 {
                                    nbrjour === '30' && Pars === 'vehicule' && (
                                       <b>Consommation hebdomadaire de mes vehicules</b>
                                    )
                                 }
                                 {
                                    nbrjour === '30' && Pars === 'sites' && (
                                       <b>Consommation hebdomadaire du site {" " + userSite + " "} vs les autres sites</b>
                                    )
                                 }
                              </h6>
                           </div>
                        </center>
                        <div className="col-md-12" style={{ display: DisplayPage }}>
                           <div className="card">
                              <div className="card-body">
                                 <h6 className="card-title text-center">
                                    {
                                       (nbrjour === '90' || nbrjour === '180' || nbrjour === '360') && (
                                          <p>Evolution de la consommation par mois</p>
                                       )
                                    }
                                    {
                                       nbrjour === '30' && (
                                          <p>Evolution de la consommation par semaine</p>
                                       )
                                    }
                                    {
                                       nbrjour === '7' && (
                                          <p>Evolution de la consommation par jour</p>
                                       )
                                    }
                                 </h6>
                                 <div className="bars" >
                                    <center>
                                       {
                                          (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSites} options={optionsVehicluesite} />
                                          )
                                       }
                                       {
                                          (nbrjour === '30') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSitesWeek} options={optionsVehicluesiteWekk} />
                                          )
                                       }
                                       {
                                          nbrjour === '7' && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSitesJour} options={optionsVehicluesiteJour} />
                                          )
                                       }
                                       {
                                          (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataVehcicule} options={optionsVehiclue} />
                                          )
                                       }
                                       {
                                          (nbrjour === '30') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataVehciculeWeek_o} options={optionsVehiclueWeek_o} />
                                          )
                                       }
                                       {
                                          nbrjour === '7' && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataSitesJour_o} options={optionsVehicluesiteJour_o} />
                                          )
                                       }
                                    </center>
                                 </div>
                                 <div className="bars" style={{ display: 'none' }} >
                                    <center>
                                       {
                                          (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSites} options={optionsVehicluesite} />
                                          )
                                       }
                                       {
                                          (nbrjour === '30') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSitesWeek} options={optionsVehicluesiteWekk} />
                                          )
                                       }
                                       {
                                          nbrjour === '7' && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'sites' && (
                                             <Bar data={dataSitesJour} options={optionsVehicluesiteJour} />
                                          )
                                       }
                                       {
                                          (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataVehcicule} options={optionsVehiclue} />
                                          )
                                       }
                                       {
                                          (nbrjour === '30') && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataVehciculeWeek_o} options={optionsVehiclueWeek_o} />
                                          )
                                       }
                                       {
                                          nbrjour === '7' && (Spectre === 'sitekin' || Spectre === siteSession) && (stat === '1' || stat === '2' || stat === '3') && Pars === 'vehicule' && (
                                             <Bar data={dataSitesJour_o} options={optionsVehicluesiteJour_o} />
                                          )
                                       }
                                    </center>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="tab-pane fade" id="cdd" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="col-md-12" style={{ display: DisplayPage }}>
                           <div className="card">
                              <div className="card-body">
                                 <div className="pie">
                                    <h6 className="card-title">Réparation de la consomation(Litre)</h6>
                                    <center>
                                       {
                                          (Pars === 'sites' && stat === '1') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCercle} />
                                             </div>

                                          )
                                       }
                                       {
                                          (Pars === 'vehicule' && stat === '1') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCercleSite} />
                                             </div>

                                          )
                                       }
                                       {
                                          (Pars === 'sites' && stat === '2') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCerclePleinAutre} />
                                             </div>

                                          )
                                       }
                                       {
                                          (Pars === 'vehicule' && stat === '2') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCerclePleinAutre_O} />
                                             </div>

                                          )
                                       }
                                       {
                                          (Pars === 'vehicule' && stat === '3') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCerclePleinAutreVehiculen} />
                                             </div>

                                          )
                                       }
                                       {
                                          (Pars === 'sites' && stat === '3') && (
                                             <div style={{ width: '50%', height: '50%' }}>
                                                <Doughnut data={dataCerclePleinAutrev} />
                                             </div>

                                          )
                                       }
                                    </center>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {
                     (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Spectre === 'sitekin' && Pars === 'vehicule' && (
                        <div className="col-md-12 container" style={{ display: DisplayPage2 }}>
                           <br />
                           <h4 className="text-center">Détails pour chaque vehicule du site {" " + userSite}</h4>
                           <div class="table-responsive" style={{ height: '500px', overflowY: 'scroll' }}>
                              <table
                                 class="table table-striped table-bordered"
                              >
                                 <thead>
                                    <tr>
                                       <th></th>
                                       <th>Immatriculation</th>
                                       <th>Marque</th>
                                       <th>Modèle</th>
                                       <th>Carburant</th>
                                       <th># Litre</th>
                                       <th># Plein</th>
                                       <th># Kin</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <center>
                                    {
                                       loading === true && (
                                          <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                       )
                                    }
                                 </center>
                                 <center>
                                    {
                                       Stats === true && (
                                          <p>Chargement<i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 10 }} ></i></p>
                                       )
                                    }
                                 </center>
                                 <tbody>
                                    {
                                       datatableA.map((detail) => {
                                          return (
                                             <>
                                                <tr>
                                                   <td>
                                                      <button onClick={() => activeItemId === detail.id ? handleInactiveData() : handleActiveData(detail.id)}>
                                                         {
                                                            activeItemId === detail.id ? "-" : <i>+</i>
                                                         }
                                                      </button>
                                                   </td>
                                                   <td>{detail.immatriculation}</td>
                                                   <td>{detail.marque}</td>
                                                   <td>{detail.modele}</td>
                                                   <td>{detail.nom_carb}</td>
                                                   <td>{detail && detail.qte_plein}</td>
                                                   <td>{detail && detail.nbr_plein}</td>
                                                   <td>{detail.kilometrage}</td>
                                                   <td>
                                                      <Checkbox
                                                         checked={selectedRows.includes(detail.id)}
                                                         onChange={(event) => DataSelect(event, detail.id)}
                                                         inputProps={{ 'aria-label': 'controlled' }}
                                                      />
                                                   </td>
                                                </tr>
                                             </>
                                          )
                                       })
                                    }
                                 </tbody>
                              </table>
                              <button onClick={BtnDataSelects} className="btn btn-primary">Comparer_consommation</button>
                           </div>
                           <br />
                           <h5 className="text-center">Evolution de la consommation pour la selection de véhécule(s)</h5>
                           <center>
                              <div className="row">
                                 <div className="col-md-6">
                                    <input type="radio" checked={totalcumule2 === '1'} value='1' onChange={handleChangeTotalCumule2} name="v" />Totaux mensuel
                                 </div>
                                 <div className="col-md-3">
                                    <input type="radio" checked={totalcumule2 === '2'} value='2' onChange={handleChangeTotalCumule2} name="v" />Totaux mensuel cumulés
                                 </div>
                              </div>
                           </center>
                           <br />
                           <br />
                           <br />
                           <h5>
                              {
                                 (nbrjour === '90' || nbrjour === '180' || nbrjour === '360') && (
                                    <p>Evolution de la consommation par mois</p>
                                 )
                              }
                              {
                                 nbrjour === '30' && (
                                    <p>Evolution de la consommation par semaine</p>
                                 )
                              }
                              {
                                 nbrjour === '7' && (
                                    <p>Evolution de la consommation par jour</p>
                                 )
                              }
                           </h5>
                           {
                              (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && Pars === 'vehicule' && totalcumule2 === '1' && (
                                 <Line data={dataSitesLineMois} options={optionsSiteLineMois} />
                              )
                           }
                           {
                              (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && Pars === 'vehicule' && totalcumule2 === '2' && (
                                 <Vehicule_siteCumule1 dataLineAMois={dataLineAMois} />
                              )
                           }
                           {
                              (nbrjour === '30') && (Spectre === 'sitekin' || Spectre === siteSession) && Pars === 'sites' && (
                                 <Line data={dataSitesLineWeek} options={optionsSiteLineMois} />
                              )
                           }
                           {
                              nbrjour === '7' && (Spectre === 'sitekin' || Spectre === siteSession) && Pars === 'sites' && (
                                 <Line data={dataSitesLineJour} options={optionsSiteLineMois} />
                              )
                           }
                        </div>
                     )
                  }

                  {
                     (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Spectre === siteSession && Pars === 'vehicule' && (
                        <div className="col-md-12 container" style={{ display: DisplayPage3 }}>
                           <br />
                           <h6 className="text-center">Détails pour chaque véhicule </h6>
                           <div class="table-responsive container" style={{ height: '500px', overflowY: 'scroll' }}>
                              <table
                                 class="table table-striped table-bordered"
                              >
                                 <thead>
                                    <tr style={{ background: 'silver' }}>
                                       <th width="2"></th>
                                       <th width="2">Immatriculation</th>
                                       <th width="2">Marque</th>
                                       <th width="2">Modele</th>
                                       <th width="2">Carburant</th>
                                       <th width="2"># Litres</th>
                                       <th width="2"># Plein</th>
                                       <th width="2"># Km</th>
                                       <th width="2"></th>
                                    </tr>
                                 </thead>
                                 <center>
                                    {
                                       loading === true && (
                                          <p><i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 40 }} ></i></p>
                                       )
                                    }
                                 </center>
                                 <center>
                                    {
                                       Stats === true && (
                                          <p>Chargement<i className="fa fa-pulse fa-spinner text-primary" style={{ fontSize: 10 }} ></i></p>
                                       )
                                    }
                                 </center>
                                 <tbody>
                                    {
                                       datatableC ? datatableC.map((detail) => {
                                          return (
                                             <>
                                                <tr>
                                                   <td>
                                                      <button onClick={() => activeItemId2 === detail.id ? handleInactiveData2() : handleActiveData2(detail.id)}>
                                                         {
                                                            activeItemId === detail.id ? "-" : <i>+</i>
                                                         }
                                                      </button>
                                                   </td>
                                                   <td><button>{detail.immatriculation}</button></td>
                                                   <td>{detail.marque}</td>
                                                   <td>{detail.modele}</td>
                                                   <td>{detail.nom_carb}</td>
                                                   <td>{detail && detail.nbr_plein}</td>
                                                   <td>{detail && detail.qte_plein}</td>
                                                   <td>{detail.kilometrage}</td>
                                                   <td>
                                                      <Checkbox
                                                         checked={selectedRows2.includes(detail.id_veh)}
                                                         onChange={(event) => DataSelect2(event, detail.id_veh)}
                                                         inputProps={{ 'aria-label': 'controlled' }}
                                                      />
                                                   </td>
                                                </tr>
                                             </>

                                          )
                                       }) : null
                                    }
                                 </tbody>
                              </table>
                              <button onClick={BtnDataSelects2} className="btn btn-primary">Comparer_consommation</button>
                           </div>
                           <br />
                           <h5 className="text-center">Evolution de la consommation pour la selection de véhécule(s)</h5>
                           <center>
                              <div className="row">
                                 <div className="col-md-6">
                                    <input type="radio" checked={totalcumule === '1'} value='1' onChange={handleChangeTotalCumule} name="v" />Totaux mensuel
                                 </div>
                                 <div className="col-md-3">
                                    <input type="radio" checked={totalcumule === '2'} value='2' onChange={handleChangeTotalCumule} name="v" />Totaux mensuel cumulés
                                 </div>
                              </div>
                           </center>
                           <br />
                           <br />
                           <br />
                           <h5>
                              {
                                 (nbrjour === '90' || nbrjour === '180' || nbrjour === '360') && (
                                    <p>Evolution de la consommation par mois</p>
                                 )
                              }
                              {
                                 nbrjour === '30' && (
                                    <p>Evolution de la consommation par semaine</p>
                                 )
                              }
                              {
                                 nbrjour === '7' && (
                                    <p>Evolution de la consommation par jour</p>
                                 )
                              }
                              {
                                 (nbrjour === '360' || nbrjour === '180' || nbrjour === '90') && (Spectre === 'sitekin' || Spectre === siteSession) && Pars === 'vehicule' && dataLineAMois2 && dataLineAMois2.length > 0 && (
                                    <Vehicule_site2 dataLineAMois={dataLineAMois2} />
                                 )
                              }
                           </h5>
                        </div>
                     )
                  }

                  {
                     (nbrjour === '90' || nbrjour === '180' || nbrjour === '7' || nbrjour === '30' || nbrjour === '360') && Spectre === 'sitekin' && Pars === 'sites' && (
                        <div className="col-md-12 container" style={{ display: DisplayPage4 }}>
                           <br />
                           <h6 className="text-center">Détails pour chaque site</h6>
                           <div class="table-responsive" style={{ height: '500px', overflowY: 'scroll' }}>
                              <table
                                 class="table table-striped table-bordered"
                              >
                                 <thead>
                                    <tr style={{ background: 'silver' }}>
                                       <th width="2"></th>
                                       <th width="2">Nom site</th>
                                       <th width="2">Province</th>
                                       <th width="2">Zone</th>
                                       <th width="2"># Vehicules</th>
                                       <th width="2"># Litres</th>
                                       <th width="2"># Plein</th>
                                       <th width="2"># Km</th>
                                       <th width="2"></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {
                                       datatableB ? datatableB.map((detail) => {
                                          return (
                                             <>
                                                <tr>
                                                   <td>
                                                      <button onClick={() => activeItemId2 === detail.id ? handleInactiveData2() : handleActiveData2(detail.id)}>
                                                         {
                                                            activeItemId2 === detail.id ? "-" : <i>+</i>
                                                         }
                                                      </button>
                                                   </td>
                                                   <td><button>{detail.nom_site}</button></td>
                                                   <td>{detail.province}</td>
                                                   <td>{detail.NomZone}</td>
                                                   <td>{detail.id}</td>
                                                   <td>{detail && detail.nbr_veh}</td>
                                                   <td>{detail && detail.nbr_plein}</td>
                                                   <td>{detail.kilometrage}</td>
                                                   <td>
                                                      <Checkbox
                                                         checked={selectedRows4.includes(detail.id)}
                                                         onChange={(event) => DataSelect4(event, detail.id)}
                                                         inputProps={{ 'aria-label': 'controlled' }}
                                                      />
                                                   </td>
                                                </tr>
                                             </>
                                          )
                                       }) : null
                                    }
                                 </tbody>
                              </table>
                              <button onClick={BtnDataSelects4} className="btn btn-primary">Comparer_consommation</button>
                           </div>
                           <br />
                           <h5 className="text-center">Evolution de la consommation pour la selection de sites(s)</h5>
                           <center>
                              <div className="row">
                                 <div className="col-md-6">
                                    <input type="radio" checked={totalcumule === '1'} value='1' onChange={handleChangeTotalCumule} name="v" />Totaux mensuel
                                 </div>
                                 <div className="col-md-3">
                                    <input type="radio" checked={totalcumule === '2'} value='2' onChange={handleChangeTotalCumule} name="v" />Totaux mensuel cumulés
                                 </div>
                              </div>
                           </center>
                           <br />
                           <br />
                           <br />
                           <h5>
                              {
                                 (nbrjour === '90' || nbrjour === '180' || nbrjour === '360') && (
                                    <p>Evolution de la consommation par mois</p>
                                 )
                              }
                              {
                                 nbrjour === '30' && (
                                    <p>Evolution de la consommation par semainess</p>
                                 )
                              }
                              {
                                 nbrjour === '7' && (
                                    <p>Evolution de la consommation par jour</p>
                                 )
                              }
                              {
                                 (nbrjour === '360') && Spectre === 'sitekin' && Pars === 'sites' && totalcumule === '1' && (
                                    <Vehicule_site3 dataLineAMois={tableauSiteGraphiqueLine} />
                                 )
                              }
                              {
                                 (nbrjour === '360') && Spectre === 'sitekin' && Pars === 'sites' && totalcumule === '2' && (
                                    <Vehicule_site3cumule dataLineAMois={tableauSiteGraphiqueLine} />
                                 )
                              }
                              {
                                 (nbrjour === '180' || nbrjour === '90' || nbrjour === '30') && Spectre === 'sitekin' && Pars === 'sites' && (
                                    <Vehicule_site3week dataLineAMois={tableauSiteGraphiqueLineWeek} />
                                 )
                              }
                           </h5>
                        </div>
                     )
                  }

               </div>
            </div>
         </div>
      </>
   )
}

export default Rappport_carburant_vehicule_site;