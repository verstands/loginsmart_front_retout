import { Component } from "react";
import LoginA from "../Pages/login";
import { Routes, Route } from "react-router-dom";
import Dashboad from "../Pages/Dashboad";
import Vehicule_carburant from "../Components/carburant/vehicule_carburant";
import UserAdd from "../Components/admin/utilisateur";
import Personnel from "../Components/admin/personnel";
import Location from "../Components/admin/location";
import PersonneP from "../Components/personnel/personnel";
import Edition from "../Components/generateur/edition";
import AffectationGeneral from "../Components/generateur/affectation";
import Edition_vehicule from "../Components/vehicule/edition";
import Deletes from "../Components/deconnexion";
import Generateur_vehicule from "../Components/carburant/generateur";
import Rapport_carburant from "../Components/carburant/rapport_carburant";
import Vehicule_maintenance from "../Components/maintenance/vehicule";
import Generateur_maintenace from "../Components/maintenance/generateur";
import Affectation_vehicule from "../Components/vehicule/affectation";
import Conge_personnel from "../Components/personnel/conge";
import Affecter_personnel from "../Components/personnel/affecter_personnel";
import Fournisseur from "../Components/admin/fournisseur";
import Acheter from "../Components/approvisionnemment/acheter";
import Vente from "../Components/approvisionnemment/vente";
import Budget_carburant from "../Components/carburant/budget";
import Deconnexion from "../Components/deconnexion";
import Clonage from "../Components/vehicule/edition/clonage";
import Assurance_vehicule from "../Components/vehicule/assurance";
import Sinitre_Vehicule from "../Components/vehicule/sinistre";
import Recherche_multiple_prelevement from "../Components/carburant/tab_prelevement/imprimer";
import ImprimerDate from "../Components/carburant/tab_prelevement/imprimerDate";
import ImprimerID from "../Components/carburant/tab_prelevement/imprimerID";
import ImprimerIDGen from "../Components/carburant/tab_generateur/ImprimeIDgen";
import Pdfprelevement from "../Components/carburant/tab_prelevement/Pdfprelevement";
import PdfprelevementAll from "../Components/carburant/tab_prelevement/PdfprelevementAll";
import PdfprelevementC from "../Components/carburant/tab_prelevement/PdfprelevementC";
import PdfprelevementAllC from "../Components/carburant/tab_prelevement/PdfprelevementAllC";
import MaintenancePdf from "../Components/maintenance/vehicule/MaintenancePdf";
import AffichetousId from "../Components/maintenance/vehicule/affichetousId";
import SuiviIntervention from "../Components/maintenance/vehicule/SuiviIntervention";



class Routers extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<LoginA />} />
                <Route path="/*" element={<p>Errreur 404</p>} />
                <Route path="/afftousMaintenace" element={<AffichetousId />} /> 
                <Route path="/dashboad" element={<Dashboad />} />
                <Route path="/carburant_vehicule" element={<Vehicule_carburant />} />
                <Route path="/ajouterUtilisateur" element={<UserAdd />} />
                <Route path="/Personnel" element={<Personnel />} />
                <Route path="/location" element={<Location />} />
                <Route path="/personnelp" element={<PersonneP />} />
                <Route path="/edition" element={<Edition />} />
                <Route path="/affectation_general" element={<AffectationGeneral />} />
                <Route path="/editio_vehicule" element={<Edition_vehicule />} />
                <Route path="/deletesuccess" element={<Deletes />} />
                <Route path="/rapport_carburant" element={<Rapport_carburant />} />
                <Route path="/generateur_vehicule" element={<Generateur_vehicule />} />
                <Route path="/vehicule_maintenance" element={<Vehicule_maintenance />} />
                <Route path="/Generateur_maintenace" element={<Generateur_maintenace />} />
                <Route path="/affectation_vehicule" element={<Affectation_vehicule />} />
                <Route path="/conge_personnel" element={<Conge_personnel />} />
                <Route path="/affecter_personnel" element={<Affecter_personnel />} />
                <Route path="/fournisseur" element={<Fournisseur />} />
                <Route path="/acheter" element={<Acheter />} />
                <Route path="/vente" element={<Vente />} />
                <Route path="/budget_carburant" element={<Budget_carburant />} />
                <Route path="/Deconnexion" element={<Deconnexion />} />
                <Route path="/Clonage/:id/" element={<Clonage />} />
                <Route path="/Assurance_vehicule" element={<Assurance_vehicule />} />
                <Route path="/Sinitre_Vehicule" element={<Sinitre_Vehicule />} />
                <Route path="/imprimer_prelevement/:carURL" element={<Recherche_multiple_prelevement />} />
                <Route path="/ImprimerDate/:pleinCarDate" element={<ImprimerDate />} />
                <Route path="/ImprimerID/:pleinCarDate" element={<ImprimerID />} />
                <Route path="/ImprimerIDGen/:genID" element={<ImprimerIDGen />} />
                <Route path="/Pdfprelevement" element={<Pdfprelevement />} />
                <Route path="/PdfprelevementAll" element={<PdfprelevementAll />} />
                <Route path="/PdfprelevementC" element={<PdfprelevementC />} />
                <Route path="/PdfprelevementAllC" element={<PdfprelevementAllC />} />
                <Route path="/MaintenancePdf/:id" element={<MaintenancePdf />} /> 
                <Route path="/SuiviIntervention" element={<SuiviIntervention />} /> 
            </Routes>
        )
    }
}
export default Routers;