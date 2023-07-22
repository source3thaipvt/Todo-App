/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/container/screens/base/App';
import { name as appName } from './app.json';
import { makeServer } from "./src/api/server"
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" })
// }
makeServer({ environment: "development" })
AppRegistry.registerComponent(appName, () => App);
