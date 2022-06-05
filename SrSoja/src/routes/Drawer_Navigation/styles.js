import React, {useContext} from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import {ThisContext} from '../../context'
//Icons
import LogoutIcon   from '../../assets/Icons/box-arrow-right'

import getContext from '../../hooks'
import { useNavigation } from '@react-navigation/native'

const CustomDrawer = (props) => {
    const navigation = useNavigation()
    const {logOut}=useContext(ThisContext)
    return(
        <SafeAreaView style={{flex:1,backgroundColor: '#F7BB26'}}>
            <DrawerContentScrollView {...props}>
                <View style={{flex:1,backgroundColor: '#F7BB26', paddingTop:5}}>
                    <View style={{flexDirection: 'row', marginTop:-5, marginRight:8,alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/Logotype/SrSoja_Body.png')} style={{height:56, width:50}} />
                        <Image source={require('../../assets/Logotype/SrSoja_Name.png')} style={{height:55, width:68}} />
                    </View>
                <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            
            <View style ={{padding: 10, paddingLeft: 18, borderTopWidth:1, borderTopColor:'#CCCCC'}}>
                
                <TouchableOpacity  onPress={()=> logOut().then(()=> navigation.navigate('Login'))} style={{paddingVertical:15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <LogoutIcon size={24} fill='#343434' />
                        <Text style={{fontSize:16, fontWeight: 'bold', marginLeft:8}}>Sair</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default CustomDrawer