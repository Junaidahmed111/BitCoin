import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const jsonData = await response.json();
      const records = Object.entries(jsonData.bpi).map(([key, value]) => ({
        currency: value.code,
        rate: value.rate,
        description: value.description,
        symbol: value.symbol,
      }));
      setData(records);
      {console.log(data);}
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>
        {item.currency} - {item.symbol} {item.rate} - {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 220,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
