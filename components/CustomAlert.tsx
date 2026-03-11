import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive' | 'success';
};

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message?: string;
  icon?: 'checkmark-circle' | 'alert-circle' | 'warning' | 'information-circle';
  buttons?: AlertButton[];
  onDismiss?: () => void;
};

export function CustomAlert({ visible, title, message, icon = 'information-circle', buttons = [{ text: 'OK' }], onDismiss }: CustomAlertProps) {
  const getIconColor = () => {
    const hasDestructive = buttons.some(b => b.style === 'destructive');
    const hasSuccess = buttons.some(b => b.style === 'success');
    if (hasSuccess && !hasDestructive) return '#4CAF50';
    if (hasDestructive) return '#FF1E1E';
    return '#FFB74D';
  };

  const handlePress = (btn: AlertButton) => {
    btn.onPress?.();
    onDismiss?.();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
          <View style={styles.iconWrap}>
            <Ionicons name={icon} size={48} color={getIconColor()} />
          </View>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.btnRow}>
            {buttons.map((btn, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.btn,
                  btn.style === 'destructive' && styles.btnDestructive,
                  btn.style === 'success' && styles.btnSuccess,
                  btn.style === 'cancel' && styles.btnCancel,
                ]}
                onPress={() => handlePress(btn)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.btnText,
                    (btn.style === 'destructive' || btn.style === 'success') && styles.btnTextWhite,
                  ]}
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  iconWrap: {
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
  },
  btnDestructive: {
    backgroundColor: '#FF1E1E',
  },
  btnSuccess: {
    backgroundColor: '#4CAF50',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  btnTextWhite: {
    color: '#fff',
  },
});
