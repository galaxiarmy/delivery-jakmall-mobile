import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import ListItemJoke from './components/ListItemJoke';
import {getDataJoke} from './helper/api';

const App = () => {
  const [dataJoke, setDataJoke] = useState<any>([]);

  const getData = async () => {
    const dataJokeCategory = await getDataJoke();

    setDataJoke(dataJokeCategory);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Jakmall Application</Text>
      <FlatList
        data={dataJoke}
        renderItem={({item, index}: any) => (
          <ListItemJoke title={item} number={index} />
        )}
        keyExtractor={(item, index) => `${item} ${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
