import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    ImageRequireSource,
} from 'react-native';
import type { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';
import { tinoImg, tinoMoan, stuImg, frankImg, tylerImg, mushImg, mattImg, mcnibbImg, defaultImg, samImg } from '../../assets';

const data = [
    {
        type: 'Lochie Martin',
        imageUri: tinoImg,
        heading: '(AKA Sharpie, Martino, Martini)',
        description: 'Loves betting as much as he loves punching darts. Worst in the group at chess?',
        key: 'first',
        color: '#9dcdfa',
    },
    {
        type: 'Stuart Higham',
        imageUri: stuImg,
        heading: '(AKA Bignutz Bobes)',
        description: 'Unrivalled girth that can only be compared to the Mad Dog',
        key: 'second',
        color: '#db9efa',
    },
    {
        type: 'Matt Percival',
        imageUri: mattImg,
        heading: '(AKA Skipper, PercDaddy, Percy)',
        description:
            'Famous for hooking up with 3 chicks in his first night of clubbing ever',
        key: 'third',
        color: '#999',
    },
    {
        type: 'Liam Mcleod',
        imageUri: mcnibbImg,
        heading: '(AKA The Nibb, McNibb, Cloudy, Macca, "that weird friend of yours"',
        description:
            'Famous for saying "Nibb" every time he does a pull-up',
        key: 'fourth',
        color: '#a1e3a1',
    },
    {
        type: 'Liam Frank',
        imageUri: frankImg,
        heading: '(AKA Frank)',
        description:
            'Fuck me! Another Liam in the group?!',
        key: 'fifth',
        color: '#f19ca7',
    },
    {
        type: 'Tyler Best',
        imageUri: tylerImg,
        heading: '(No known aliases)',
        description:
            'Why would I roast myself?',
        key: 'sixth',
        color: '#7cb3e3',
    },
    {
        type: 'Liam Miller',
        imageUri: mushImg,
        heading: '(AKA Da Mush, Mush)',
        description:
            'Once shot his load 10 meters across the room',
        key: 'seventh',
        color: '#333333',
    },
    {
        type: 'Sam Muller',
        imageUri: samImg,
        heading: '(AKA The Weenie)',
        description:
            "Couldn't handle the heat so he left the kitchen",
        key: 'eighth',
        color: '#E7FFAC',
    },
];
const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;
const IMG_SIZE = width * .6

const Circle = ({
    scrollOffsetAnimatedValue,
}: {
    scrollOffsetAnimatedValue: Animated.Value;
}) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
            {data.map(({ color }, index) => {
                const inputRange = [0, 0.5, 0.99];
                const inputRangeOpacity = [0, 0.5, 0.99];
                const scale = scrollOffsetAnimatedValue.interpolate({
                    inputRange,
                    outputRange: [1, 0, 1],
                    extrapolate: 'clamp',
                });

                const opacity = scrollOffsetAnimatedValue.interpolate({
                    inputRange: inputRangeOpacity,
                    outputRange: [0.2, 0, 0.2],
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.circle,
                            {
                                backgroundColor: color,
                                opacity,
                                transform: [{ scale }],
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

const Ticker = ({
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
}: {
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, data.length];
    const translateY = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
    ).interpolate({
        inputRange,
        outputRange: [0, data.length * -TICKER_HEIGHT],
    });
    return (
        <View style={styles.tickerContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map(({ type }, index) => {
                    return (
                        <Text key={index} style={styles.tickerText}>
                            {type}
                        </Text>
                    );
                })}
            </Animated.View>
        </View>
    );
};

const Item = ({
    imageUri,
    heading,
    description,
    scrollOffsetAnimatedValue,
}: {
    imageUri: ImageRequireSource;
    description: string;
    heading: string;
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, 0.5, 0.99];
    const inputRangeOpacity = [0, 0.5, 0.99];
    const scale = scrollOffsetAnimatedValue.interpolate({
        inputRange,
        outputRange: [1, 0, 1],
    });

    const opacity = scrollOffsetAnimatedValue.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [1, 0, 1],
    });

    return (
        <View style={styles.itemStyle}>
            <Animated.Image
                source={imageUri}
                style={[
                    styles.imageStyle,
                    {
                        transform: [{ scale }],
                    },
                ]}
            />
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.heading,
                        {
                            opacity,
                        },
                    ]}
                >
                    {heading}
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity,
                            marginTop: 10, // Adjust the margin-top to move the description text closer to the image
                        },
                    ]}
                >
                    {description}
                </Animated.Text>
            </View>
        </View>
    );
};


const Pagination = ({
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
}: {
    scrollOffsetAnimatedValue: Animated.Value;
    positionAnimatedValue: Animated.Value;
}) => {
    const inputRange = [0, data.length];
    const translateX = Animated.add(
        scrollOffsetAnimatedValue,
        positionAnimatedValue
    ).interpolate({
        inputRange,
        outputRange: [0, data.length * DOT_SIZE],
    });

    return (
        <View style={[styles.pagination]}>
            <Animated.View
                style={[
                    styles.paginationIndicator,
                    {
                        position: 'absolute',
                        transform: [{ translateX: translateX }],
                    },
                ]}
            />
            {data.map((item) => {
                return (
                    <View key={item.key} style={styles.paginationDotContainer}>
                        <View
                            style={[styles.paginationDot, { backgroundColor: item.color }]}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function theCrew() {
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            {/* <Circle scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} /> */}
            <AnimatedPagerView
                initialPage={0}
                style={{ width: '100%', height: '100%' }}
                onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
                    [
                        {
                            nativeEvent: {
                                offset: scrollOffsetAnimatedValue,
                                position: positionAnimatedValue,
                            },
                        },
                    ],
                    {
                        listener: ({ nativeEvent: { offset, position } }) => {
                        },
                        useNativeDriver: true,
                    }
                )}
            >
                {data.map((item, index) => (
                    <View collapsable={false} key={index}>
                        <Item
                            {...item}
                            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                            positionAnimatedValue={positionAnimatedValue}
                        />
                    </View>
                ))}
            </AnimatedPagerView>
            <Pagination
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
            />
            <Ticker
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 120,
        // borderRadius: 30,
        // backgroundColor: 'red'
    },
    imageStyle: {
        width: IMG_SIZE,
        height: IMG_SIZE,
        resizeMode: 'cover',
        borderRadius: IMG_SIZE / 1.8,
        flex: 1,
        paddingVertical: 0,
    },
    textContainer: {
        marginTop: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: .9,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        paddingHorizontal: 8
        // marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
        paddingHorizontal: 8

    },
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tickerContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '800',
    },

    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE*1.2,
        height: CIRCLE_SIZE*1.2,
        borderRadius: CIRCLE_SIZE*1.2 / 2,
        position: 'absolute',
        top: '15%',
    },
});