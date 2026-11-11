import { useState } from 'react';
import { Button, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { BottomSheet } from '@expo/ui/community/bottom-sheet';

// Run on the iPhone Duo simulator (Xcode 27.1), folded. Its side rail is a
// right safe-area inset of about 84pt. Open the sheet: the sheet runs edge to
// edge, but its full-width content stops short of the rail side.

export default function App() {
  const [open, setOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.screen}>
      <Button title="Open sheet" onPress={() => setOpen(true)} />
      <BottomSheet index={open ? 0 : -1} enablePanDownToClose onDismiss={() => setOpen(false)}>
        <View style={styles.content} onLayout={event => setContentWidth(event.nativeEvent.layout.width)}>
          <Text style={styles.label}>Window width: {Math.round(width)}pt</Text>
          <Text style={styles.label}>Content width: {contentWidth === null ? '…' : `${Math.round(contentWidth)}pt`}</Text>
          <Text style={styles.label}>This red view should fill the sheet&apos;s width.</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  content: { height: 200, backgroundColor: 'tomato', padding: 16, gap: 8 },
  label: { color: '#fff', fontSize: 16 },
});
