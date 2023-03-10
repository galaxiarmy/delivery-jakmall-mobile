import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import ListItemJoke from './components/ListItemJoke';
import {getDataJoke} from './helper/api';

const App = () => {
  const [dataJoke, setDataJoke] = useState<any>([]);

  const getData = async () => {
    const dataJokeCategory = await getDataJoke();

    setDataJoke(dataJokeCategory);
  };

  const onItemClick = (index: any) => {
    // do nothing on top element
    if (index !== 0) {
      let previousItems = [...dataJoke];
      let temp = previousItems[index - 1];
      previousItems[index - 1] = previousItems[index];
      previousItems[index] = temp;
      setDataJoke(previousItems);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Jakmall Application</Text>
      {dataJoke.length === 0 ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size={40} />
          <Text style={styles.titleConnection}>
            Membutuhkan Jaringan Internet
          </Text>
        </View>
      ) : (
        <FlatList
          data={dataJoke}
          renderItem={({item, index}: any) => (
            <ListItemJoke
              title={item}
              number={index}
              onPressGoTop={() => {
                onItemClick(index);
              }}
            />
          )}
          keyExtractor={(item, index) => `${item} ${index}`}
        />
      )}
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
  titleConnection: {
    fontSize: 20,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
