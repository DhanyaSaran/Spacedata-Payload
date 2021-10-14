import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar,
  SafeAreaView,
  Platform,
  TextInput
} from "react-native";
import { Card } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      isModalVisible: false,
      selectedData: [],
     
    };
  }

  getData = () => {
    fetch("https://api.spacexdata.com/v3/history")
      .then((result) => result.json())
      .then((data) =>
        this.setState({
          history: data,
        })
      )
      .catch((error) => console.log(error));
  };

  

  showModal = () => {
    console.log(this.state.selectedData)
    try {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <Text>Modal</Text>
          <View style={styles.modalContainer}>
            <ScrollView style={{ width: "100%" }}>
              <Text style={styles.modalTitle}>Details</Text>

              <Card>
                <Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Title :</Text>
                    <Text> {this.state.selectedData.title || "Nil"}</Text>
                  </Card>

                  <Card>
                    <Text style={{ fontWeight: "bold" }}> Details : </Text>
                    <Text>
                      
                     {this.state.selectedData.details || "Nil"}
                    </Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Flight Number :</Text>
                    <Text>
                      {this.state.selectedData.flight_number || "Nil"}
                    </Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}> Date(YYYY/MM/DD) :</Text>
                    <Text>
                      
                      {this.state.selectedData.event_date_utc.slice(0,10) || "Nil"}
                    </Text>
                  </Card>
                </Card>
                <Card>
                  <Text style={{ fontWeight: "bold" }}>Links</Text>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Article :</Text>
                    <Text>
                      {this.state.selectedData.links.article || "Nil"}
                    </Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Reddit :</Text>
                    <Text>{this.state.selectedData.links.reddit || "Nil"}</Text>
                  </Card>
                  <Card>
                    <Text style={{ fontWeight: "bold" }}>Wikipedia :</Text>
                    <Text>
                      {this.state.selectedData.links.wikipedia || "Nil"}
                    </Text>
                  </Card>
                </Card>
              </Card>

              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ isModalVisible: false })}>
                  <Text style={{ color: "#ff5722" }}>OK</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={{flex: 1,}}>
        <ScrollView>
          <SafeAreaView style={styles.droidSafeArea} />
          {this.showModal()}
          
          {this.state.history.map((data,i) => (
            <TouchableOpacity key={i}
              style={styles.list}
              onPress={() =>
                this.setState({ isModalVisible: true, selectedData: data })
              }
            >
              <Text>{data.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

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
    flex: 1.5,
    width:RFValue(300),
    borderRadius: 3,
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
});
