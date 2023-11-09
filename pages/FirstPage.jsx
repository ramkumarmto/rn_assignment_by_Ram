import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext} from "react";
import { userContext } from "../context/userContext";
import { topPadding, btnContainer, btn, disabledBtn, btnOuterContainer } from "../utils/globalStyles";
import CustomCard from "../components/CustomCard";

const FirstPage = ({ navigation }) => {

  const {formData, updateFormData} = useContext(userContext) 

  function checkValidation(callback) {
    // email validation (Must be a valid email ID)
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValidEmail = emailPattern.test(formData.email);
    if (!isValidEmail) return Alert.alert("Invalid Email!");

    // password validation (Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.)
    const isPasswordValid =
      /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2}).{8,}$/.test(
        formData.password
      );

    if (!isPasswordValid)
      return Alert.alert(
        "Invalid Passowrd!",
        "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters."
      );
    callback();
  }

  const saveHandler = async () => {
    checkValidation(() => {
      Alert.alert("Saved!");
    });
  };
  const saveAndNextHandler = () => {
    checkValidation(() => {
      navigation.navigate("SecondPage");
    });
  };
  return (
    <View style={topPadding}>
     <CustomCard>
     <View>
        <TextInput
          style={styles.input}
          placeholder="Email*"
          onChangeText={(email) => updateFormData("email" , email)}
          value={formData.email}
        />
      </View>

      <View>
        <TextInput
          onChangeText={(pass) => updateFormData("password", pass)}
          style={styles.input}
          placeholder="Password*"
          value={formData.password}
        />
      </View>
      <View style={btnOuterContainer}>
        <View style={btnContainer}>
          <Pressable disabled>
            <Text style={disabledBtn}>Back</Text>
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

});

export default FirstPage;
