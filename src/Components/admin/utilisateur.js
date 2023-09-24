import Adduser from "./utilisateur/ajouter";
import Navbar from "../Navbar";
const UserAdd = () => {
    return(
        <>
         <Navbar />
            <div class="page-wrapper">
                <div class="row">
                    <div class="card">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a
                                class="nav-link active"
                                data-bs-toggle="tab"
                                href="#home"
                                role="tab"
                                ><span class="hidden-sm-up"></span>
                                <span class="hidden-xs-down"><i class="fas fa-user-circle"></i>Uilisateur</span></a
                                >
                            </li>
                        </ul>
                        <div class="tab-content tabcontent-border">
                            <div class="tab-pane active" id="home" role="tabpanel">
                                <div class="p-20">
                                    < Adduser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </>
    );
}
export default UserAdd;