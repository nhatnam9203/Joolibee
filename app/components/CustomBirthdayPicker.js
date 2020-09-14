import moment from 'moment';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DATE_FORMAT = 'DD/MM/YYYY';

const CustomBirthdayPicker = ({ renderBase, onChangeDate }) => {
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const showPicker = () => {
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
      <TouchableWithoutFeedback onPress={showPicker}>
        <View pointerEvents="box-only">{RenderBase(renderBase)}</View>
      </TouchableWithoutFeedback>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
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
