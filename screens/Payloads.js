import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  SafeAreaView,
  Platform,Alert,ToastAndroid
} from "react-native";
import { Card } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import Modal from "react-native-modal";

const Payload = () => {
  const [payload, setPayload] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = () => {
    fetch("https://api.spacexdata.com/v3/payloads")
      .then((result) => result.json())
      .then((data) => setPayload(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  });

   const showModal = () => {
   return (
      <View>
        <Modal visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <ScrollView style={{ width: "100%" }}>
              <Text style={styles.modalTitle}>Details</Text>

              <Card>
                <Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Payload ID :</Text>
                    <Text> {selectedData.payload_id || "Nil"}</Text>
                  </Card>

                  <Card>
                    <Text style={{ fontWeight: "bold" }}> Mass (kg) :</Text>
                    <Text>{selectedData.payload_mass_kg || "Nil"}</Text>
                  </Card>

                  <Card>
                    <Text style={{ fontWeight: "bold" }}> Payload Type :</Text>
                    <Text>{selectedData.payload_type || "Nil"}</Text>
                  </Card>

                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Reused : </Text>
                    <Text>{selectedData.reused || "Nil"}</Text>
                  </Card>
                </Card>

                <Card>
                  <Text style={{ fontWeight: "bold" }}>Others </Text>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Manufacturer :</Text>
                    <Text>{selectedData.manufacturer || "Nil"}</Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Nationality :</Text>
                    <Text>{selectedData.nationality || "Nil"}</Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Orbit :</Text>
                    <Text>{selectedData.orbit || "Nil"}</Text>
                  </Card>
                </Card>
              </Card>

              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "#ff5722" }}>OK</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }; 

  const searchdata = () => {
    {
      payload.map((data, i) =>
        ((data.payload_id).toLowerCase()) == (search.toLowerCase())
          ? (setSelectedData(data), setModalVisible(true), showModal())
          : ((setSearch(''))
          )
      );
    }
  };



  if (!isModalVisible) {
    return (
      <View>
        <ScrollView>
          <SafeAreaView style={styles.droidSafeArea} />

          <TextInput
            style={styles.bar}
            placeholder="Enter a valid Id"
            onChangeText={(text) => {setSearch(text), setSelectedData(text); }}
            value={search}/>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => { searchdata(); }} >
            <Text>Search</Text>
          </TouchableOpacity>

          {payload.map((data, i) => (
            <TouchableOpacity
              key={i}
              style={styles.list}
              onPress={() => {
                setSelectedData(data), setModalVisible(true), showModal()
              }}
            >
              <Text>{data.payload_id}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
      return(
    showModal())
  }
};

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    width: RFValue(300),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2f345d",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 80,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  list: {
    borderWidth: 1,
    borderBottomColor: "pink",
    borderColor: "white",
    height: RFValue(55),
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
    marginTop:10,
    marginLeft:10
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    marginTop:15,
    marginBottom:15,
    marginLeft:15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ee8249",
  },
});

export default Payload;
