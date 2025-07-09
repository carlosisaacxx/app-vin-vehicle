import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from '../components/CustomButton';
import { VIN_LENGTH, isValidVin, cleanVin } from '../utils/vinValidator';
import { fetchVinData } from '../api/vinApi';
import { colors } from '../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'VinInput'>;

export default function VinInputScreen({ navigation }: Props) {
  const [vin, setVin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Usar cleanVin para asegurar solo caracteres válidos y máximo 17
  const handleChange = (text: string) => {
    const cleaned = cleanVin(text);
    setVin(cleaned);
    if (error) setError('');
  };

  const handleSend = async () => {
    Keyboard.dismiss();
    if (!isValidVin(vin)) {
      setError(
        `El VIN debe tener exactamente ${VIN_LENGTH} caracteres válidos (solo mayúsculas y números, sin I, O, Q).`
      );
      return;
    }
    setLoading(true);
    try {
      const data = await fetchVinData(vin);
      navigation.navigate('VinResult', { vin, data });
      setVin('');
    } catch {
      setError('No se pudo consultar el VIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.container}>
        <Icon name="car-search" color={colors.primary} size={56} style={{ marginBottom: 10 }} />
        <Text style={styles.title}>Consulta de VIN</Text>
        <Text style={styles.label}>
          Ingresa el VIN (17 caracteres, solo mayúsculas y números, sin I, O, Q):
        </Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={vin}
          onChangeText={handleChange}
          placeholder="Ejemplo: 1J4FY29P4VP461340"
          autoCapitalize="characters"
          maxLength={VIN_LENGTH}
          editable={!loading}
        />
        {vin.length > 0 && vin.length < VIN_LENGTH && (
          <Text style={styles.helperText}>
            Faltan {VIN_LENGTH - vin.length} caracteres válidos (sin I, O, Q)
          </Text>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <CustomButton
          title="Consultar"
          icon="magnify"
          onPress={handleSend}
          disabled={!isValidVin(vin) || loading}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 23, fontWeight: 'bold', color: colors.text, marginBottom: 14 },
  label: { fontSize: 15, marginBottom: 10, color: colors.muted },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12,
    fontSize: 17, width: 270, backgroundColor: '#fff', marginBottom: 5, letterSpacing: 2,
  },
  inputError: { borderColor: colors.error },
  errorText: { color: colors.error, marginBottom: 8, fontSize: 13 },
  helperText: { color: colors.muted, fontSize: 12, marginBottom: 8 },
});