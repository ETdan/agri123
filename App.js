import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios";

const image = {
  uri: "https://t3.ftcdn.net/jpg/00/34/61/76/360_F_34617669_p9r4GrR83TBEXCZrRny6AaigqPUEPFp5.jpg",
};

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://agrihub-55664-default-rtdb.firebaseio.com/days.json")
      .then((response) => {
        const newDataList = [];
        console.log(response.data);

        for (const [dayKey, dayValue] of Object.entries(response.data)) {
          for (const [timeKey, timeValue] of Object.entries(dayValue)) {
            const timeData = Object.entries(timeValue).map(
              ([property, value], index) => ({
                key: `${dayKey}_${timeKey}_${index + 1}`,
                name: dayKey,
                title: property,
                value: value,
              })
            );

            newDataList.push(...timeData);
          }
        }

        setDataList(newDataList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>AGRI-URBAN HUB</Text>
      <Image style={styles.main_img} source={image} />
      <FlatList
        data={dataList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.card_namee}>Day: {item.name}</Text>
            <Text style={styles.card_title}>{item.title}</Text>
            <Text style={styles.card_value}>{item.value}</Text>
          </View>
        )}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        numColumns={2}
        keyExtractor={(item) => item.key}
        // contentContainerStyle={styles.card_wrapper}
        // initialScrollIndex={dataList.length} // Scroll to the bottom initially
        // inverted={true} // Start rendering from the bottom
        // contentContainerStyle={{
        //   flexGrow: 1,
        // }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  main_img: {
    width: "100%",
    height: 340,
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    marginTop: "10%",
    borderRadius: 10,
    backgroundColor: "#5C972A", // Change the background color to white or any other color
    height: 200, // Set the height as needed
  },
  card_title: {
    fontSize: 20,
    color: "white",
  },
  card_namee: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    fontSize: 15,
    // paddingBottom: 30,
    paddingLeft: 10,
    color: "white",
  },
  card_value: {
    color: "white",
    fontSize: 35,
  },
  card_wrapper: {
    padding: 10,
    justifyContent: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
  text: {
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
});

export default App;
