import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  const theme = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: theme.surfaceContainerHighest }
              ]}
            >
              <Text style={[styles.title, { color: theme.onSurface }]}>
                {title}
              </Text>
              <Text style={[styles.message, { color: theme.onSurfaceVariant }]}>
                {message}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.surfaceVariant }
                  ]}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.buttonText, { color: theme.onSurface }]}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.errorContainer }
                  ]}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: theme.onErrorContainer }
                    ]}
                  >
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24
  },
  modalContainer: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 12
  },
  message: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginBottom: 28,
    lineHeight: 24
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 90,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold"
  }
});
