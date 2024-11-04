import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';

import routes from '../../navigation/routes';

import auth from '@react-native-firebase/auth';

import { useDispatch } from 'react-redux';

import { login } from '../../redux/slice';

const SingUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);
 
  const dispatch = useDispatch()

  const goLogin = () => {
    navigation.goBack(routes.LOGIN);
  };

  const onPressRegister = async () => {
    if (email == '') {
      //Messajlar gösterilcek
      return;
    } else if (password !== rePassword) {
      //Messajlar gösterilcek
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      await dispatch(login())
      //Messajlar gösterilcek
      console.log('üyelik olusturuldu')

      navigation.navigate(routes.APP_NAVIGATOR);
    } catch (error) {
      //Messajlar gösterilcek
      console.log('HATAAA') , error
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SingUp</Text>
      </View>
      <CustomInput value={email} onChangeText={setEmail} placeholder="E-mail" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        isSecure
      />
      <CustomInput
        value={rePassword}
        onChangeText={setRepassword}
        placeholder="RePassword"
        isSecure
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Go Back" onPress={goLogin} />
        <CustomButton
          title="SingUp"
          onPress={onPressRegister}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a5acd',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
