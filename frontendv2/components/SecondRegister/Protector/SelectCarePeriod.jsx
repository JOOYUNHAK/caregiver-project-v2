/* 케어 기간 날짜 고르기 */
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarList, LocaleConfig } from 'react-native-calendars'
import StatusBarComponent from "../../StatusBarComponent";
import Icon from "../../Icon";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useEffect } from "react";
import { TouchableHighlight } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { saveEndPeriod, saveStartPeriod, saveTotalPeriod } from "../../../redux/action/register/patientInfoAction";

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

export default function SelectCarePeriod({ navigation }) {
    const [today, setToday] = useState(getToday());
    const [minDate, setMinDate] = useState(getMinDate());
    const [maxDate, setMaxDate] = useState(getMaxDate());
    const [start, setStart] = useState('');
    const [userStart, setUserStart] = useState('');
    const [end, setEnd] = useState('');
    const [userEnd, setUserEnd] = useState('');
    const [period, setPeriod] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => pressCompleteDate()}
                    disabled={start.length ? false : true}
                >
                    <Text style={{
                        color: start.length ? '#6d95da' : 'silver',
                        fontSize: 16
                    }}>
                        완료
                    </Text>
                </TouchableHighlight>
            )
        })
    }, [start, end])

    const pressCompleteDate = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'secondRegisterPage',
                params: {
                    period: end ?
                        start + '~' + end + ' (총 ' + period + '일)'
                        :
                        start + ' (총 ' + period + '일)'
                }
            })
        )

        dispatch(
            saveStartPeriod(
                start
            ),
        );
        dispatch(
            saveEndPeriod(
                !!end ? end : start
            ),
        );
        dispatch(saveTotalPeriod(period));
    }

    const pressDay = (day) => {
        //시작 날짜가 있으면
        if (!!start) {
            //종료 날짜가 있으면
            if (!!end) {
                //늦게 고른 날짜가 시작 날짜보다 앞인경우
                if (new Date(day) - new Date(start) < 0) {
                    setStart(day);
                    setUserStart(convertDay(day));
                    setUserEnd('');
                    setEnd('');
                    setPeriod(1);
                    return;
                }
                //늦게 고른 날짜가 종료 날짜랑 같은 경우
                if (day === end) {
                    setStart(day);
                    setUserStart(convertDay(day));
                    setUserEnd('');
                    setEnd('');
                    setPeriod(1);
                    return;
                }
                //늦게 고른 날짜가 시작 날짜하고 같은경우
                if (day === start) {
                    setEnd('');
                    setUserEnd('');
                    setPeriod(1);
                    return;
                }
                //늦게 고른 날짜가 시작 날짜보다 큰경우
                setEnd(day);
                setUserEnd(convertDay(day));
                setPeriod(
                    (new Date(day) - new Date(start))
                    / (1000 * 3600 * 24) + 1
                )

                return;
            }
            //종료 날짜가 없는 경우
            //시작 날짜보다 앞인 경우
            if (new Date(day) - new Date(start) < 0) {
                setStart(day);
                setUserStart(convertDay(day));
                setPeriod(1);
                return;
            }
            //시작날짜와 같은 경우
            if (start === day)
                return;

            setEnd(day);
            setUserEnd(convertDay(day));
            setPeriod(
                (new Date(day) - new Date(start))
                / (1000 * 3600 * 24) + 1
            )
            return;
        }
        setStart(day);
        setUserStart(convertDay(day));
        setPeriod(1);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <StatusBarComponent />
            <CalendarList
                theme={{
                    'stylesheet.calendar.header': {
                        dayTextAtIndex0: {
                            color: 'red'
                        },
                        dayTextAtIndex1: {
                            color: 'black'
                        },
                        dayTextAtIndex2: {
                            color: 'black'
                        },
                        dayTextAtIndex3: {
                            color: 'black'
                        },
                        dayTextAtIndex4: {
                            color: 'black'
                        },
                        dayTextAtIndex5: {
                            color: 'black'
                        },
                        dayTextAtIndex6: {
                            color: 'blue'
                        }
                    }
                }}
                renderArrow={
                    (direction) =>
                        direction === 'left' ?
                            <Icon props={['material', 'chevron-left', 30, '#94c6ad']} />
                            :
                            <Icon props={['material', 'chevron-right', 30, '#94c6ad']} />
                }
                markingType={'period'}
                minDate={minDate}
                maxDate={maxDate}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
                hideArrows={false}
                onDayPress={(day) => pressDay(day.dateString)}
                monthFormat={'yyyy년 M월'}
                style={{ alignSelf: 'center' }}
                horizontal={true}
                pagingEnabled={true}
            />

            <View style={styles.dateInfo}>
                <Text style={styles.eachInfo}>
                    오늘 날짜는 {today}이에요
                </Text>
                {
                    userStart ?
                        <Text style={styles.eachInfo}>
                            간병 시작 날짜는 {userStart}이에요
                        </Text>
                        : null
                }
                {
                    userEnd ?
                        <Text style={styles.eachInfo}>
                            간병 종료 날짜는 {userEnd}이에요
                        </Text> : null
                }
                {
                    period ?
                        <Text style={styles.eachInfo}>
                            총 간병 진행 기간은 {period}일이에요
                        </Text>
                        : null
                }

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    dateInfo: {
        paddingLeft: 30,
        marginTop: 25
    },

    eachInfo: {
        marginTop: 30,
        color: '#6d95da',
        fontSize: 20,
        fontWeight: '300'
    }
})

function getMinDate() {
    const today = new Date().toLocaleDateString(
        'Asia', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    );
    const date = today.split('/');
    return '20' + date[2] + '-' + date[0] + '-' + date[1];
}

function getToday() {
    const today = new Date().toLocaleDateString(
        'Asia', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    );
    const date = today.split('/');
    return '20' + date[2] + '년 ' + date[0] + '월 ' + date[1] + '일';
}

function getMaxDate() {
    const today = new Date().toLocaleDateString(
        'Asia', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    );
    const date = today.split('/');
    const year = Number(date[2]) + 1;

    return '20' + year + '-' + date[0] + '-' + date[1];
}

function convertDay(day) {
    const date = day.split('-');
    return date[0] + '년 ' + date[1] + '월 ' + date[2] + '일'
}

