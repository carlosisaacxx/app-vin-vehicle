import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from '../components/CustomButton';
import { VinInfoList } from '../components/VinInfoList';
import { colors } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'VinResult'>;

export default function VinResultScreen({ route, navigation }: Props) {
  const { vin, data } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="clipboard-list-outline" color={colors.primary} size={48} style={{ marginBottom: 12 }} />
        <Text style={styles.title}>Resultado del VIN</Text>
        <Text style={styles.vinCode}>{vin}</Text>
        <VinInfoList data={data.Results} />
        <CustomButton
          title="Regresar"
          icon="arrow-left"
          color={colors.accent}
          onPress={() => navigation.popToTop()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 21, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
  vinCode: { fontSize: 15, fontFamily: 'monospace', color: colors.primary, marginBottom: 14 },
});