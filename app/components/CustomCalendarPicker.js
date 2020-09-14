import React from 'react';
import moment from 'moment';
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const DATE_FORMAT = 'MM/DD/YYYY';

const CustomCalendarPicker = ({ renderBase, onDaySelected }) => {
  const calendarRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const showPicker = () => {
    setVisible(true);
  };

  const hidePicker = () => {
    setVisible(false);
  };

  const onDayPress = (day) => {
    setSelected(day.dateString);
    if (typeof onDaySelected === 'function') {
      onDaySelected(moment(day.dateString).format(DATE_FORMAT));
    }
    hidePicker();
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={showPicker}>
        <View pointerEvents="box-only">{RenderBase(renderBase)}</View>
      </TouchableWithoutFeedback>

      <Modal
        visible={visible}
        onRequestClose={hidePicker}
        style={{ backgroundColor: 'red' }}
        transparent={true}>
        <View style={[styles.container, styles.shadowP]}>
          <Calendar
            ref={calendarRef}
            style={{ marginBottom: 10 }}
            theme={{
              textSectionTitleDisabledColor: '#d9e1e8',

              // month
              textMonthFontSize: 16,
              textMonthFontWeight: 'bold',
              monthTextColor: '#0764B0',

              // arrow
              arrowColor: '#0764B0',
              disabledArrowColor: '#d9e1e8',
              arrowStyle: { padding: 0 },

              // day selected
              selectedDayTextColor: 'white',
              selectedDayBackgroundColor: '#0764B0',

              //day name
              textSectionTitleColor: '#0764B0',
              textDayHeaderFontSize: 15,
              textDayHeaderFontWeight: 'normal',
            }}
            current={moment().format(DATE_FORMAT)}
            minDate={moment().subtract(100, 'year').format(DATE_FORMAT)}
            maxDate={moment().format(DATE_FORMAT)}
            showWeekNumbers={false}
            firstDay={1}
            onDayPress={onDayPress}
            // onMonthChange={onMonthChange}
            markingType={'period'}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                startingDay: true,
                endingDay: true,
                color: '#0764B0',
              },
            }}
            disableAllTouchEventsForDisabledDays
            hideExtraDays={true}
          />
          <TouchableOpacity onPress={hidePicker}>
            <View style={styles.btnClose}>
              <Text style={styles.txtClose}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const RenderBase = (renderBase) => {
  if (typeof renderBase === 'function') {
    return renderBase();
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 10,
  },
  calendarHeader: {
    height: 50,
    width: '100%',
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClose: {
    width: '100%',
    height: 45,
    backgroundColor: '#0764B0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  txtClose: {
    color: '#fff',
    fontSize: 17,
  },
  shadowP: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0,0.3)',
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 1,
      },

      android: {
        elevation: 2,
      },
    }),
  },
});

export default CustomCalendarPicker;
