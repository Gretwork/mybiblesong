import { RadioButton } from 'react-native-paper';
import { View } from 'react-native';
import {globalstyles} from '../styles/GlobalStyles';
function BtnRadioBtn({labelTitle,labelLanguage,labelStatus, ...rest}) {
    return <>
          <View style={globalstyles.FilterRadiolbl} {...rest}>
          <RadioButton.Item color='red' uncheckedColor='#333'  label={labelTitle} value={labelLanguage}  status={labelStatus} />
          </View>
    </>
  }

  export default BtnRadioBtn;