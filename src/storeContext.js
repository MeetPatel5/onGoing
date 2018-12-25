import React, { createContext, Component } from "react";

const Store = createContext();

class StoreProvider extends Component {
  state = {
    // =>  This is how we do redux stuff with React
    // fullScreen: false,
    // makeFullScreen: () => {
    //   this.setState(prevState => ({
    //     fullScreen: !prevState.fullScreen
    //   }));
    // }
  };
  render() {
    return <Store.Provider>{this.props.children}</Store.Provider>;
  }
}

const StoreConsumer = Store.Consumer;

export { StoreProvider, StoreConsumer };
