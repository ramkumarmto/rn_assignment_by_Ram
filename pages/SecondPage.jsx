import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext} from "react";
import { userContext } from "../context/userContext";
import { btn, btnContainer, btnOuterContainer, topPadding } from "../utils/globalStyles";
import CustomCard from "../components/CustomCard";

const SecondPage = ({ navigation }) => {

  const { formData, updateFormData} = useContext(userContext);
  const backHandler = () => {
    navigation.navigate("FirstPage");
  };

  function checkValidation(cb) {
    // atlest 3 char and atmost 50
    const isValidFirstName = /^[a-zA-Z]{3,50}$/.test(formData.firstName);
    if (!isValidFirstName)
      return Alert.alert(
        "First Name should have atleat 3 character long and atmost 50 character"
      );
    // only string or empty string
    const isValidLastName = /^[a-zA-Z]*$/.test(formData.lastName) || formData.lastName === "";
    if (!isValidLastName)
      return Alert.alert("Last Name should have characters only or optional");

    // address validation
    const isValidAddress = /^.{10,}$/.test(formData.address);
    if (!isValidAddress)
      return Alert.alert("Address atleast should have length 10");

    cb();
  }
  const saveHandler = () => {
    checkValidation(() => {
      Alert.alert("saved!");
    });
  };
  const saveAndNextHandler = () => {
    checkValidation(() => {
      navigation.navigate("Thirdpage");
    });
  };
  return (
    <View style={topPadding}>
     <CustomCard>
     <View>
        <TextInput
          style={styles.input}
          placeholder="First Name*"
          onChangeText={(fname) => updateFormData("firstName" , fname)}
          value={formData.firstName}
        />
      </View>
      <View>
        <TextInput
          onChangeText={(lname) => updateFormData("lastName", lname)}
          style={styles.input}
          placeholder="Last name"
          value={formData.lastName}
        />
        <TextInput
          onChangeText={(add) => updateFormData("address",add)}
          style={styles.addressinput}
          placeholder="Address*"
          value={formData.address}
        />
      </View>

      {/* Buttons  */}
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
          <Pressable android_ripple={{ color: "purple" }}>
            <Text style={btn} onPress={saveAndNextHandler}>
              Save and Next
            </Text>
          </Pressable>
        </View>
      </View>
     </CustomCard>
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
  addressinput : {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SecondPage;
