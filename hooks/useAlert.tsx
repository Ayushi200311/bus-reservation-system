import React, { createContext, useCallback, useContext, useState } from 'react';
import { CustomAlert, AlertButton } from '../components/CustomAlert';

type AlertOptions = {
  title: string;
  message?: string;
  icon?: 'checkmark-circle' | 'alert-circle' | 'warning' | 'information-circle';
  buttons?: AlertButton[];
};

type AlertContextType = {
  alert: (opts: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState<AlertOptions & { buttonsWithClose?: AlertButton[] }>({ title: '', buttons: [{ text: 'OK' }] });

  const alert = useCallback((options: AlertOptions) => {
    const rawButtons = options.buttons ?? [{ text: 'OK' }];
    const buttonsWithClose: AlertButton[] = rawButtons.map(b => ({
      ...b,
      onPress: b.onPress
        ? () => {
            b.onPress!();
            setVisible(false);
          }
        : () => setVisible(false),
    }));
    setOpts({
      title: options.title,
      message: options.message,
      icon: options.icon ?? 'information-circle',
      buttons: buttonsWithClose,
    });
    setVisible(true);
  }, []);

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <CustomAlert
        visible={visible}
        title={opts.title}
        message={opts.message}
        icon={opts.icon}
        buttons={opts.buttons}
        onDismiss={() => setVisible(false)}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    return {
      alert: (opts: AlertOptions) => {
        if (typeof require !== 'undefined') {
          try {
            const { Alert } = require('react-native');
            Alert.alert(opts.title, opts.message, opts.buttons);
          } catch (_) {}
        }
      },
    };
  }
  return ctx;
}
