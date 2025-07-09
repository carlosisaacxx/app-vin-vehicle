import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

interface Props {
  data: Array<{ Variable: string; Value: string | null }>;
}

export const VinInfoList: React.FC<Props> = ({ data }) => {
  const fields = data.filter(f => f.Value && f.Value !== 'Not Applicable');
  if (!fields.length) {
    return (
      <View style={styles.emptyBox}>
        <Icon name="alert-circle-outline" color={colors.muted} size={36} />
        <Text style={styles.emptyText}>No se encontraron datos relevantes.</Text>
      </View>
    );
  }
  return (
    <View style={styles.box}>
      {fields.map((f, idx) => (
        <View key={idx} style={styles.row}>
          <Icon name="information-outline" color={colors.primary} size={18} style={styles.icon} />
          <Text style={styles.label}>{f.Variable}:</Text>
          <Text style={styles.value}>{f.Value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
    width: '100%',
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontWeight: 'bold', color: colors.text, flex: 1 },
  value: { color: colors.primary, fontSize: 15, flex: 2, marginLeft: 2 },
  icon: { marginRight: 6 },
  emptyBox: { alignItems: 'center', marginVertical: 20 },
  emptyText: { color: colors.muted, fontSize: 15, marginTop: 8 },
});