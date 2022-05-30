import React, { useState } from 'react'
import { View, Text, TextInput, Dimensions } from 'react-native'
import styles from './styles'
import moment from 'moment'
import axios from 'axios'

export default function Previsao_Tempo() {

    const [cityName, setCityName] = useState('')

    // const getApiData = async function() {
    //     return await axios.get("http://servicos.cptec.inpe.br/XML/capitais/condicoesAtuais.xml")
    // }

    return (
        <View style={styles.container}>

            <View style={{justifyContent: 'center'}}>
                <TextInput 
                    placeholder='Pesquise sua cidade'
                    value={cityName}
                    onChangeText={setCityName}
                    style={{textAlign: "center"}}
                />
            </View>

            <View>
                <Text style={{textAlign: "center"}}>
                    {moment().format("DD/MM/YYYY")}
                </Text>
            </View>

        </View>
    );
}
