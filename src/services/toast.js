import {ToastAndroid} from 'react-native';

const showToast = (message) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

export default showToast;
