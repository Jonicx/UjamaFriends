import { Route, Switch, HashRouter } from "react-router-dom";
import CustomRoute from "./app/utils/route";
import RoutesName from "./app/routes";
import { HomeView } from "./frontface/pages/client/Home/main";
import { RegistrationView } from "./frontface/pages/client/Register";
import { AdminLogView } from "./frontface/pages/client/AdminLog/";
import { TreeView } from "./frontface/pages/client/Tree/";
import { LoginView } from "./frontface/pages/client/auth/";

const Routes = () => {
  return (
    // <Router basename={process.env.REACT_APP_BASENAME}>
    //   <Switch>
    //     <CustomRoute
    //       exact
    //       path={RoutesName.home}
    //       component={HomeView}
    //       auth={false}
    //       access={true}
    //     />
    //     <CustomRoute
    //       exact
    //       path={RoutesName.pages.members}
    //       component={TreeView}
    //       auth={false}
    //       access={true}
    //     />
    //     <CustomRoute
    //       exact
    //       path={RoutesName.pages.register}
    //       component={RegistrationView}
    //       auth={false}
    //       access={true}
    //     />
    //     <CustomRoute
    //       exact
    //       path={RoutesName.pages.adminLog}
    //       component={AdminLogView}
    //       auth={false}
    //       access={true}
    //     />
    //     <CustomRoute
    //       exact
    //       path={RoutesName.auth.login}
    //       component={LoginView}
    //       auth={false}
    //       access={false}
    //     />
    //   </Switch>
    // </Router>
    <HashRouter>
      <Switch>
      <Route
       path={RoutesName.auth.login}
       component={ LoginView } />
      <Route 
      path={RoutesName.pages.adminLog}
      component={ AdminLogView } />
      <Route 
      path={RoutesName.pages.register}
      component={ RegistrationView } />
      <Route 
      path={RoutesName.pages.members}
      component={ TreeView } />
      <Route 
      path={RoutesName.home}
      component={ HomeView } />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
