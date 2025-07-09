import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  color?: string;
};

export const CustomButton: React.FC<Props> = ({ title, onPress, disabled, loading, icon, style, color }) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled || loading ? styles.buttonDisabled : { backgroundColor: color || colors.primary },
      style,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.85}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <>
        {icon ? <Icon name={icon} size={22} color="#fff" style={{ marginRight: 8 }} /> : null}
        <Text style={styles.buttonText}>{title}</Text>
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
    elevation: 2,
    shadowColor: "#1976d2",
    shadowOpacity: 0.13,
    shadowRadius: 4,
    marginVertical: 5,
  },
  buttonDisabled: { backgroundColor: colors.border },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});