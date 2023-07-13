import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { SendIcon, MicIcon } from '../../assets/svg'

import Colors from '../helpers/Colors'
import Network from '../helpers/Network'

import ChatComponent from './ChatComponent'

import { useKeyboard } from '@react-native-community/hooks'

const { width, height } = Dimensions.get('screen')

const AskComponent = ({ route }) => {

    const { id } = route?.params //museumId

    const keyboard = useKeyboard()

    const [data, setData] = useState([])
    const [question, setQuestion] = useState('')

    const [messagesId, setMessagesId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [focus, setFocus] = useState(false)
    const [margin, setMargin] = useState(0)

    const mountData = async () => {
        if (messagesId !== null) {
            const response = await Network.get(`messages/${messagesId}/message/${id}`)
            setData([...data, ...response])
        }
    }

    useEffect(() => {
        mountData()
    }, [messagesId])

    useEffect(() => {
        Platform.OS === 'ios' ? setMargin(focus ? keyboard.keyboardHeight === 0 ? 255 : 255 : 0) : setMargin(0)
    }, [focus])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await Network.put('messages/message/new', { content: question, role: 'user', museumId: id })
                .then((response) => {
                    setMessagesId(response?.messageId)
                    setQuestion('')
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 8 }}>
                <View style={styles.firstMessageContainer}>
                    <Text style={styles.firstMessageText}>Size nasıl yardımcı olabilirim?</Text>
                </View>
                {
                    data.map((item, index) => (
                        <ChatComponent
                            question={item.content}
                            key={index}
                            role={item.role}
                        />
                    ))
                }
            </ScrollView>

            <View style={{ marginTop: 'auto', marginBottom: margin }}>
                <TextInput
                    style={styles.input}
                    placeholder='Soru sor...'
                    value={question}
                    onChangeText={(text) => setQuestion(text)}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                />
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={[styles.icon, { backgroundColor: loading ? '#bdbdbd' : Colors.primary }]}
                        activeOpacity={0.7}
                        onPress={() => { handleSubmit() }}
                        disabled={loading}
                    >
                        {
                            loading ? <ActivityIndicator size={'small'} /> : <SendIcon color='#fff' />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AskComponent

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    input: {
        backgroundColor: Colors.white,
        padding: 16,
        paddingRight: 60
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row'
    },
    icon: {
        padding: 12
    },
    firstMessageContainer: {
        backgroundColor: '#fff',
        width: width * 0.7,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 4
    },
    firstMessageText: {
        color: Colors.textMain,
        fontSize: 16,
        fontFamily: 'Lato-Regular'
    }
})