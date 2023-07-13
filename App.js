import { useFonts } from 'expo-font';
import { StatusBar, Platform } from 'react-native';

import AppNavigation from './src/navigations/AppNavigation';

import { Provider } from 'react-redux'
import Store from './src/redux/store'

function App() {

  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Bodoni-Bold': require('./assets/fonts/Bodoni-Bold.ttf'),
    'Bodoni-Regular': require('./assets/fonts/Bodoni-Regular.ttf'),
    'Janson-Regular': require('./assets/fonts/Janson-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Provider store={Store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;