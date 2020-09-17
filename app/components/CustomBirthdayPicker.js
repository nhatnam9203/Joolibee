import moment from 'moment';
import React from 'react';
import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DATE_FORMAT = 'DD/MM/YYYY';

const CustomBirthdayPicker = ({ renderBase, onChangeDate, defaultValue }) => {
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const showPicker = () => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const hidePicker = () => {
    setVisible(false);
  };

  const handleConfirm = (selectDate) => {
    setDate(selectDate);

    if (typeof onChangeDate === 'function') {
      onChangeDate(moment(selectDate).format(DATE_FORMAT));
    }

    hidePicker();
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={showPicker} accessible={false}>
        <View pointerEvents="box-only">{RenderBase(renderBase)}</View>
      </TouchableWithoutFeedback>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
        value={defaultValue ?? date}
      />
    </View>
  );
};

const RenderBase = (renderBase) => {
  if (typeof renderBase === 'function') {
    return renderBase();
  }

  return null;
};

export default CustomBirthdayPicker;
