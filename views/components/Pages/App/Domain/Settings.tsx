import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import Scroll from "react-scroll";

import Categories from "./Settings/Categories";
import Setting from "./Settings/Setting";
import Layout from "../../../Helpers/Layout";
import CompanyNodeProvider from "../../../Contexts/CompanyNode";
import ShippingLocationsProvider from "../../../Contexts/ShippingLocations";
import UsersProvider from "../../../Contexts/Users";

export const settingsTitle = {
  settings: "Settings"
};

interface IState {
  isActivated: string;
}
const Element = Scroll.Element;
const scroll = Scroll.animateScroll;
class Settings extends PureComponent<
  RouteComponentProps<{ domainId: string }>
> {
  state: IState = {
    isActivated: "branding"
  };

  onClickCategory = (param: string) => {
    this.setState({
      isActivated: param
    });
    scroll.scrollToTop();
  };
  render() {
    const { domainId } = this.props.match.params;
    return (
      <Layout title={settingsTitle.settings}>
        <div className="settings">
          <div className="settings-list">
            <Categories
              clickCategory={this.onClickCategory}
              isActivated={this.state.isActivated}
            />
          </div>
          <Element
            className="settings-main"
            id="containerElement"
            name="setting"
          >
            <CompanyNodeProvider domainId={domainId}>
              <ShippingLocationsProvider domainId={domainId}>
                <UsersProvider domainId={domainId}>
                  <Setting active={this.state.isActivated} />
                </UsersProvider>
              </ShippingLocationsProvider>
            </CompanyNodeProvider>
          </Element>
        </div>
      </Layout>
    );
  }
}

export default Settings;
