
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput , SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { stylesFazenda, stylesTalhao, stylesListagem } from './styles'
import { Picker } from '@react-native-picker/picker'
import { ThisContext } from '../../context'
import { addFazenda } from '../../services/database/controllers/Fazenda'
import { addTalhao } from '../../services/database/controllers/Talhao'

//Icon
import MapIcon from '../../assets/Icons/map-fill'
import TrashIcon from '../../assets/Icons/trash3-fill'
import EditIcon from '../../assets/Icons/pencil-square'
import SearchIcon from '../../assets/Icons/search'
//buttons
import { CheckButton, CancelButton, AddButton, NextButton } from '../../components/Button'

const Fazenda = ({route}) => {
  const navigation = useNavigation();

  const { database, dataResult, setResult } = useContext(ThisContext)
  const [fazenda, setFazenda] = useState('')
  const [cep, setCep] = useState('')
/*    cep = cep.replace('-', '')
 */
  const [uf, setUf] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')

 

/* const teste = route.params?.coord[0]
  const [coord,setCoord] = useState ({})
console.log('teste',teste)
useEffect(() => {
  if(teste!==undefined) 
  setCoord(teste)
},[teste])
console.log('coord',coord)
 */

/*useEffect(()=>{
  if (coordenada===undefined){
    coordenada= {}
    console.log('teste if',coordenada)

  }
  else{
    setCoord(coordenada)
    console.log('teste else',coord)
  }

 },[coordenada])  */
/*  const { coord } = route.params
 */ 
/* const [lat,setLat]=useState()
 console.log('é a rota',setLat(route.params?.coord.latitude) ) */

 
 const { item } = route.params






  async function searchCEP(cep) {
     fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res =>res.json())
    .then(res =>{
      console.log(res)
      setUf(res.uf)
      setMunicipio(res.localidade)
      setLogradouro(res.logradouro)
      setBairro(res.bairro)
    }).catch(err =>{console.log(err)})

    }

  return (
      <SafeAreaView style={stylesFazenda.container}>
        <ScrollView>
          <View style={stylesFazenda.body}>
            <View style={stylesFazenda.bodyColumn}>
              <Text style={stylesFazenda.bodyTitle}>Nome da Fazenda</Text>
              <TextInput style={stylesFazenda.bodyInputBox} placeholder="Inserir nome..." keyboardType="default"
              onChangeText={nome =>setFazenda(nome)} value={fazenda}></TextInput>
            </View>

            <View style={stylesFazenda.bodyRowCEP}>
              <View style={stylesFazenda.bodyColumn}>
                <Text style={stylesFazenda.bodyTitle}>CEP</Text>
                <TextInput style={stylesFazenda.bodyInputBox} maxlength={8} placeholder="00000-000" keyboardType="numeric"
                onChangeText={texto => setCep(texto)} value={cep}>
                </TextInput>
              </View>
            </View>

            <View style={stylesFazenda.bodyRowCEP}>

             <View style={stylesFazenda.bodyColumn}>
                <TouchableOpacity style={stylesFazenda.bodyButton}
                onPress={()=> searchCEP(cep)}>
                  <SearchIcon size={28} />
                  <Text style={stylesFazenda.bodyTitleSearch}>Pesquisar CEP</Text>
                </TouchableOpacity>
              </View>

              <Text style={stylesFazenda.bodyTitle}>Ou</Text>

              <View style={stylesFazenda.bodyColumn}>
                <TouchableOpacity style={stylesFazenda.bodyButton}
                  onPress={() => { navigation.navigate('Mapa')
                }}>
                  <MapIcon size={28} fill="#343434" />
                  <Text style={stylesFazenda.bodyTitleSearch}>Obter localização atual</Text>
                </TouchableOpacity>
              </View>
            </View>
{/*             {setCoord( route.params?.coord[0] ?? {})}
 */}{/*                   {route.params?.coord.map((lat,index)=> <Text value={lat} key={index}>{[lat.latitude, lat.longitude]}</Text>)
                  }                
                   */}
{/*                   {console.log('teste apenas coord do params',route.params?.coord)}
 */}



            {/*       {console.log('teste latitude', route.params?.coord.map((lat,index)=> [lat.latitude]))}
                  {console.log('teste longitude', route.params?.coord.map((lat,index)=> [lat.longitude]))}
  */}

            <Text>{item}</Text>
            <View style={stylesFazenda.bodyColumn}>
              <Text style={stylesFazenda.bodyTitle}>Estado</Text>
              <Text style={stylesFazenda.bodyInputBoxEstado}>{uf}</Text>
            </View>
            <View style={stylesFazenda.bodyColumn}>
              <Text style={stylesFazenda.bodyTitle}>Municipio</Text>
              <Text style={stylesFazenda.bodyInputBox}>{municipio}</Text>
            </View>
            <View style={stylesFazenda.bodyColumn}>
              <Text style={stylesFazenda.bodyTitle}>Logradouro</Text>
              <Text style={stylesFazenda.bodyInputBox}>{logradouro}</Text>
            </View>
            <View style={stylesFazenda.bodyColumn}>
              <Text style={stylesFazenda.bodyTitle}>Bairro</Text>
              <Text style={stylesFazenda.bodyInputBox}>{bairro}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={stylesFazenda.footer}>
          <View style={stylesFazenda.footerRow}>
            <View style={stylesFazenda.footerButtonCenter}>
              <View style={stylesFazenda.footerButtonCancel}>
                <CancelButton size={48} 
                onPress={() => {
                  setFazenda('')
                  setCep('')
                  setUf('')
                  setMunicipio('')
                  setLogradouro('')
                  setBairro('')
                }}
                />
              </View>
              <View style={stylesFazenda.footerButtonCheck}>
                <CheckButton size={48}
                onPress={()=>{
                  try{
                    addFazenda(database,{
                      prd_id:1,
                      fzd_nome:fazenda,
                      fzd_cep:cep,
                      fzd_estado:uf,
                      fzd_municipio:municipio
                    },setResult)
                  }catch(e){console.log(e)}
              }}
                />
              </View>
            </View>
            <View style={stylesFazenda.footerButtonRight}>
              <View style={stylesFazenda.footerButtonNext}>
                <NextButton size={48}
                onPress={()=>{navigation.navigate('Talhão')
                }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

const Talhao = ({talhao_name}) => {
  const navigation = useNavigation()

  const[saudeTalhao] = useState(['Doente', 'Saudável'])
  const[saudeSelecionada,setSaudeSelecionada] = useState([])

  const [coord,setCoord] = useState ();
  const { database, dataResult, setResult } = useContext(ThisContext)

  const [apelido, setApelido] = useState(talhao_name)

//Picker
  const [saude, setSaude]= useState(['Saudável', 'Doente'])
  const [selectedSaude,setSelectedSaude]= useState([])
  
  return (
      <SafeAreaView style={stylesTalhao.container}>
        <ScrollView>
          <View style={stylesTalhao.body}>
            <View style={stylesTalhao.bodyRow}>
              <Text style={stylesTalhao.bodyTitle}>Apelido do Talhão</Text>
              <TextInput style={stylesTalhao.bodyInputBox} placeholder="Inserir nome..."
              onChangeText={nome => setApelido(nome)} value={apelido}></TextInput>
            </View>
            <View style={stylesTalhao.bodyRow}>
                <Text style={stylesTalhao.bodyTitle}>Saúde atual do Talhão</Text>

                <Picker
                style={{flex:1, flexWrap:'nowrap'}}
                  selectedValue={selectedSaude}
                  onValueChange={(itemValue,index)=>
                    setSelectedSaude(itemValue,index)
                }>
                {
                  saude.map((sd,index) => {
                    return(
                    <Picker style={{flex:1}} label={sd} value={sd} key={index} />
                    )
                  }) 
                }
                </Picker>
                <View style={{borderBottomWidth: 1}}/>
            </View>
            <View style={stylesTalhao.bodyRow}>
              <Text style={stylesTalhao.bodyTitle}>Selecionar área</Text>
                <TouchableOpacity style={stylesTalhao.bodyRowMap}
                 onPress={() => {navigation.setOptions()
                   navigation.navigate('Mapa', {coord})}}>

                  <View style={stylesTalhao.bodyMap}>
                    <MapIcon size={50} fill='#343434' />
                    <Text style={stylesTalhao.bodyTextMap}>Abrir Mapa</Text>
                  </View>
                </TouchableOpacity>
              <View style={stylesTalhao.bodyLine} />
            </View>
          </View>
        </ScrollView>

        <View style={stylesTalhao.footer}>
          <View style={stylesTalhao.footerRow}>
            <View style={stylesTalhao.footerButtonCenter}>

              <View style={stylesTalhao.footerButtonCancel}>
                <CancelButton size={48}
                    onPress={() => {
                      setCoord('')
                      setApelido('')
                      setSaude('')
                     }}
                />
              </View>
              <View style={stylesTalhao.footerButtonCheck}>
                <CheckButton size={48}
                    onPress={()=>{
                      try{
                        addTalhao(database,{
                          fzd_id:1,
                          tlh_apelido:apelido,
                          tlh_saude:saude,
                          tlh_media_producao:0,
                          latitude:coord?.latitude,
                          longitude:coord?.longitude
                        },setResult)
                      }catch(e){console.log(e)}
                  }}
                  />
              </View>
           </View>
           <View style={stylesTalhao.footerButtonRight}>

              <View style={stylesTalhao.footerButtonNext}>
                <NextButton size={48}
                  onPress={()=>{navigation.navigate('Listagem')
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

const Listagem = () => {
  const navigation = useNavigation();
  return (
      <SafeAreaView style={stylesListagem.container}>
        <ScrollView>
          <View style={stylesListagem.body}>
            <View style={stylesListagem.bodyList}>
              <View style={stylesListagem.bodyRow}>
                <Text style={stylesListagem.bodyTitle}>Talhão: </Text>
                <Text style={stylesListagem.bodyTitle}>Leste</Text>
              </View>
              <View style={stylesListagem.bodyButtons}>
                <Text style={stylesListagem.bodyTitle}>Saudável</Text>
              <View style={stylesListagem.bodySubRow}>
                <TouchableOpacity style={stylesListagem.bodyIcon}>
                  <EditIcon size={30} fill='#343434' />
                </TouchableOpacity>
                <TouchableOpacity style={stylesListagem.bodyIcon}>
                  <TrashIcon size={30} fill='#343434' />
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={stylesListagem.footer}>
          <View style={stylesListagem.footerRow}>
            <View style={stylesListagem.footerButtonCenter}>
              <View style={stylesListagem.footerButtonCancel}>
                <CancelButton size={48}
                  onPress={() => {
                    setCoord('')
                    setApelido('')
                    setSaude('')
                    }}
                />
              </View>
              <View style={stylesListagem.footerButtonCheck}>
                <CheckButton size={48}

                  />
              </View>
            </View>
            <View style={stylesListagem.footerButtonRight}>

              <View style={stylesListagem.footerButtonAdd}>
                <AddButton size={48}
                  onPress={()=>{navigation.navigate('Talhão')
                }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
}

export { Fazenda, Talhao, Listagem }