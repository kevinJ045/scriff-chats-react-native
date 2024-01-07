import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { InitViews } from './app/common/init';
import { PaperProvider, ThemeBase, withTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { theme } from './app/common/theme';
import { MainApp } from './app/common/main';
import store from './app/store/store';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <MainApp theme={theme}></MainApp>
      </PaperProvider>
    </StoreProvider>
  );
}
