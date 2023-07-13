import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import CardComponent from './CardComponent'

const { width } = Dimensions.get('screen')

const CarouselComponent = ({ data, title }) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(_, index) => index}
                horizontal
                pagingEnabled
                snapToInterval={width * 0.90}
                contentContainerStyle={{
                    paddingHorizontal: 16
                }}
                renderItem={({ item }) => {
                    return (
                        <CardComponent
                            id={item.id}
                            name={item?.name}
                            location={item?.city}
                            image={item?.files[0]?.location}
                        />
                    )
                }}
            />
        </View>
    )
}

export default CarouselComponent

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 12,
        marginTop: 20
    }
})