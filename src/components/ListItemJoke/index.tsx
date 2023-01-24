import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import {getDataJokeByCategory} from '../../helper/api';
import IconArrowDown from '../../assets/icons/icons8-sort-down-30.png';
import IconArrowUp from '../../assets/icons/icons8-sort-up-30.png';

const ListItemJoke = ({title, number}: any) => {
  const [expanded, setExpanded] = useState<any>(false);
  const [dataJoke, setDataJoke] = useState<any>([]);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getDataJoke = async (title: any, amount: any, type: any) => {
    const dataJokeByCategory = await getDataJokeByCategory(title, amount);

    setDataJoke(dataJokeByCategory);

    if (!expanded && dataJokeByCategory.length > 0 && type === 'tab') {
      Alert.alert(
        `Jokes ${title}`,
        `${dataJokeByCategory[0].joke},
        ${dataJokeByCategory[1].joke}`,

        [{text: 'OK'}],
      );
    }

    if (dataJokeByCategory.length === 0) {
      Alert.alert(`Jokes ${title}`, `Data Jokes ${title} tidak di temukan`, [
        {text: 'OK'},
      ]);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress();
        getDataJoke(title, 2, 'tab');
      }}
      style={styles.item}>
      <View style={styles.bodyItem}>
        <View style={styles.bodyTitle}>
          <Text style={styles.titleNumber}>{number + 1}.</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.bodyDropdown}>
          {number === 0 ? (
            <TouchableOpacity style={styles.buttonTop}>
              <Text>Top</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonOnTop}>
              <Text style={styles.titleGoTop}>Go Top</Text>
            </TouchableOpacity>
          )}
          <Image
            style={styles.iconArrow}
            source={expanded ? IconArrowUp : IconArrowDown}
          />
        </View>
      </View>
      {expanded && dataJoke && dataJoke.length > 0 && (
        <View>
          {dataJoke.map((item: any, index: any) => {
            return (
              <View key={index} style={styles.itemJoke}>
                <Text>{item.joke}</Text>
              </View>
            );
          })}
          {dataJoke.length < 6 && (
            <TouchableOpacity
              onPress={() => {
                if (dataJoke.length <= 6) {
                  if (dataJoke.length === 4) {
                    getDataJoke(title, 6, 'add more');
                  } else if (dataJoke.length === 2) {
                    getDataJoke(title, 4, 'add more');
                  }
                }
              }}
              style={styles.dataJokeMore}>
              <Text style={styles.addMore}>Add More Data</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ListItemJoke;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleNumber: {
    fontSize: 16,
    paddingRight: 20,
  },
  item: {
    borderWidth: 1.5,
    backgroundColor: '#DCDCDC',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  bodyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonTop: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FFFF',
    borderWidth: 1,
    marginRight: 40,
  },
  buttonOnTop: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC143C',
    borderWidth: 1,
    marginRight: 30,
  },
  bodyTitle: {
    flexDirection: 'row',
  },
  titleGoTop: {
    color: '#FFFFFF',
  },
  addMore: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconArrow: {
    width: 20,
    height: 20,
  },
  bodyDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemJoke: {
    borderWidth: 1,
    padding: 6,
  },
  dataJokeMore: {
    borderWidth: 1,
    padding: 6,
    backgroundColor: '#00FFFF',
  },
});
