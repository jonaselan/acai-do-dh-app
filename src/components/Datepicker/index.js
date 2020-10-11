import React, {useState} from 'react';
import {Button, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function Datepicker({date, onChange}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShowDatePicker(false);
    onChange(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button
        onPress={showDatepicker}
        title={moment(date).format('DD-MM-YYYY')}
      />
    </View>
  );
}
