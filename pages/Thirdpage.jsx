import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Modal
} from "react-native";
import React, { useState , useContext} from "react";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { userContext } from "../context/userContext";
import { btn, btnContainer, btnOuterContainer, disabledBtn, topPadding } from "../utils/globalStyles";
import CustomCard from "../components/CustomCard";

const Thirdpage = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);


  const {formData, updateFormData } = useContext(userContext)
  const items = [
    { label: "+1", value: "+1" },
    { label: "+91", value: "+91" },
  ];
  const toggleCheckbox = () => updateFormData("checked", !formData.checked);

  const backHandler = () => {
    navigation.navigate("SecondPage");
  };

  const saveHandler = () => {
    // select country code
    if (formData.countryCode === null) return Alert.alert("Please select country code");
    // mobile number validation
    const isValidMobile = /^\d{10}$/.test(formData.mobile);
    if (!isValidMobile)
      return Alert.alert(
        "Invalid Mobile No",
        "Mobile Number should contain exactly 10 digits"
      );
    // terms and condition should be checked
    if (formData.checked === false)
      return Alert.alert("Please accept term and conditions.");

    // Alert.alert("form submitted successfully!");
    setModalVisible(true)
  };

  return (
    <View style={topPadding}>
    <CustomCard>
    <RNPickerSelect
        onValueChange={(value) => updateFormData("countryCode",value)}
        items={items}
        value={formData.countryCode}
        style={styles.pickerSelectStyles}
        placeholder={{
          label: "Select Country Code",
          value: null,
        }}
      />
      <TextInput
        onChangeText={(mobile) => updateFormData("mobile",mobile)}
        style={styles.input}
        placeholder="Phone Number*"
        keyboardType="numeric"
        value={formData.mobile}
      />
      <CheckBox
        size={32}
        checked={formData.checked}
        onPress={toggleCheckbox}
        title={"accept terms and condition."}
      />

      {/* BUTTONS  */}

      <View style={btnOuterContainer}>
        <View style={btnContainer}>
          <Pressable android_ripple={{ color: "purple" }} onPress={backHandler}>
            <Text style={btn}>Back</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "purple" }}
            onPress={saveHandler}
            disabled={false}
          >
            <Text style={btn}>Save</Text>
          </Pressable>
          <Pressable disabled>
            <Text style={disabledBtn}>Save and Next</Text>
          </Pressable>
        </View>
      </View>
    </CustomCard>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Email : {formData.email}</Text>
            <Text style={styles.modalText}>Password : {formData.password}</Text>
            <Text style={styles.modalText}>First Name : {formData.firstName}</Text>
            <Text style={styles.modalText}>Last Name : {formData.lastName}</Text>
            <Text style={styles.modalText}>Address : {formData.address}</Text>
            <Text style={styles.modalText}>Address : {formData.address}</Text>
            <Text style={styles.modalText}>Country Code : {formData.countryCode}</Text>
            <Text style={styles.modalText}>Mobile : {formData.mobile}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Thirdpage;
